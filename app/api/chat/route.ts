/**
 * Chat API Route
 * Streaming responses with OpenAI gpt-4o-mini
 * Persona-aware routing with rate limiting
 */

import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { logger, rateLimiter, ChatLog, Intent, Depth, PersonaType } from '@/lib/logging';
import { ChatRequestSchema } from '@/lib/schemas';
import {
    getPersonaFromIntent,
    getResponseStyle,
    shouldEscalate,
    ResponseStyle
} from '@/lib/personas';
import {
    PROJECTS,
    SKILLS,
    METHODOLOGY,
    DAVID_INFO,
    getProjectsSummary,
    getSkillsSummary,
    CREATIVE_SERVICES,
    CREATIVE_PROCESS,
    getCreativeProjectsSummary
} from '@/lib/portfolioData';

// Lazy initialize OpenAI client (prevents build errors when API key not set)
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
    if (!openaiClient) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY environment variable is not set');
        }
        openaiClient = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openaiClient;
}

// Request body type
interface ChatRequest {
    message: string;
    sessionId: string;
    mode: 'ba' | 'creative';
    intent?: Intent;
    depth?: Depth;
    conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
}

/**
 * Build system prompt based on persona and response style
 */
function buildSystemPrompt(
    persona: PersonaType | null,
    style: ResponseStyle,
    mode: 'ba' | 'creative'
): string {
    const basePrompt = `You are Dthrills, David Ezieshi's portfolio assistant. You help visitors learn about David's projects, skills, and experience.

## About David
- Name: ${DAVID_INFO.name}
- Role: ${DAVID_INFO.title}
- Location: ${DAVID_INFO.location}
- Tagline: "${DAVID_INFO.tagline}"

## Projects
${getProjectsSummary()}

## Skills
${getSkillsSummary()}

## Methodology
${METHODOLOGY.approach.map(a => `- ${a}`).join('\n')}

## Response Guidelines
- Tone: ${style.tone}
- Length: ${style.maxLength === 'short' ? '3-5 bullet points or 2-3 sentences' : style.maxLength === 'medium' ? 'Structured paragraph with key metrics' : 'Detailed breakdown with methodology and examples'}
- ${style.includeMetrics ? 'Include specific metrics and numbers when relevant' : 'Focus on qualitative descriptions'}
- ${style.includeMethodology ? 'Explain the methodology and approach' : 'Focus on outcomes, not methodology'}
- ${style.includeCode ? 'Reference code patterns and technical details when helpful' : 'Keep technical details high-level'}

## Critical Rules
1. NEVER mention internal persona categories (recruiter, hiring_manager, etc.)
2. Ask intent-based questions, not identity questions
3. If asked about salary, visa, availability, pricing, or contracts, say: "I can't speak to that specifically—that's something to discuss with David directly. Would you like to send him an email or schedule a quick call?"
4. Always end with 1-2 relevant next steps or CTAs
5. Be honest about limitations—don't make up information
6. If unsure, offer to connect the visitor with David directly

## CTA Options (use contextually)
- Schedule a chat: ${DAVID_INFO.calendlyUrl}
- Download resume: ${DAVID_INFO.resumeUrl}
- Email David: ${DAVID_INFO.email}
- LinkedIn: ${DAVID_INFO.linkedin}
- GitHub: ${DAVID_INFO.github}`;

    // Mode-specific additions
    if (mode === 'creative') {
        const creativeServices = CREATIVE_SERVICES.map(s => `- ${s.title}: ${s.description} (${s.rate})`).join('\n');
        const creativeProcess = CREATIVE_PROCESS.map((p, i) => `${i + 1}. ${p}`).join('\n');

        return basePrompt + `
        
## Mode: Creative
You are acting as **Dthrills Creative Studio Assistant**.
Focus on visual design, branding, and motion graphics.

## Creative Projects
${getCreativeProjectsSummary()}

## Creative Services & Rates
${creativeServices}

## Creative Process
${creativeProcess}

## Tone Override
Maintain a more sophisticated, visual, and studio-like tone. 
Be confident about pricing and value.
`;
    }

    return basePrompt;
}

/**
 * Generate unique log ID
 */
function generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get client IP for rate limiting
 */
function getClientIP(request: NextRequest): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown';
}

export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body with Zod
        const body = await request.json();
        const validation = ChatRequestSchema.safeParse(body);

        if (!validation.success) {
            return new Response(
                JSON.stringify({ error: 'Invalid request data', details: validation.error.format() }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { message, sessionId, mode, intent, depth, conversationHistory = [] } = validation.data;

        // Rate limiting (Memory-based)
        const clientIP = getClientIP(request);
        const rateLimit = await rateLimiter.check(clientIP);

        if (!rateLimit.allowed) {
            return new Response(
                JSON.stringify({
                    error: 'Rate limit exceeded. Please wait a moment.',
                    resetAt: rateLimit.resetAt
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString()
                    }
                }
            );
        }

        // Check for escalation topics
        const escalation = shouldEscalate(message);
        if (escalation.escalate) {
            const escalationResponse = `I can't speak to ${escalation.reason} specifically—that's something to discuss with David directly. Would you like to send him an email or schedule a quick call?`;

            // Log escalated request
            await logger.log({
                id: generateLogId(),
                timestamp: Date.now(),
                sessionId,
                mode,
                intent: (intent as Intent) || null,
                depth: (depth as Depth) || null,
                personaHint: intent ? getPersonaFromIntent(intent as Intent) : null,
                userMessage: message,
                botResponse: escalationResponse,
                confidence: 'high',
                escalated: true,
                escalationReason: escalation.reason,
            });

            // Increment rate limit
            await rateLimiter.increment(clientIP);

            return new Response(
                JSON.stringify({
                    response: escalationResponse,
                    escalated: true,
                    ctas: ['email', 'schedule']
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Determine persona and response style
        const persona = intent ? getPersonaFromIntent(intent as Intent) : null;
        const responseStyle = getResponseStyle(
            persona || 'general_visitor',
            (depth as Depth) || 'walkthrough'
        );

        // Build system prompt
        const systemPrompt = buildSystemPrompt(persona, responseStyle, mode);

        // Build messages array
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
            { role: 'user', content: message },
        ];

        // Create streaming response
        const stream = await getOpenAI().chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            stream: true,
            max_tokens: responseStyle.maxLength === 'short' ? 300 :
                responseStyle.maxLength === 'medium' ? 600 : 1000,
            temperature: 0.7,
        });

        // Create ReadableStream for streaming response
        const encoder = new TextEncoder();
        let fullResponse = '';

        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        if (content) {
                            fullResponse += content;
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                        }
                    }

                    // Send completion signal
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                    controller.close();

                    // Log the completed conversation
                    await logger.log({
                        id: generateLogId(),
                        timestamp: Date.now(),
                        sessionId,
                        mode,
                        intent: (intent as Intent) || null,
                        depth: (depth as Depth) || null,
                        personaHint: persona,
                        userMessage: message,
                        botResponse: fullResponse,
                        confidence: persona ? 'high' : 'medium',
                        escalated: false,
                    });

                    // Increment rate limit
                    await rateLimiter.increment(clientIP);

                } catch (error) {
                    console.error('Streaming error:', error);
                    controller.error(error);
                }
            },
        });

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred processing your request' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
