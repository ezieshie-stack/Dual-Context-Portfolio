
import { NextRequest } from 'next/server';
import { strictRateLimiter } from '@/lib/logging/rateLimit';
import { ContactRequestSchema } from '@/lib/schemas';

/**
 * Contact API Route
 * Secure endpoint for form submissions
 */
export async function POST(request: NextRequest) {
    try {
        // Rate limiting (Strict for contact form to prevent spam)
        const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown';

        const rateLimit = await strictRateLimiter.check(clientIP);

        if (!rateLimit.allowed) {
            return new Response(
                JSON.stringify({
                    error: 'Too many requests. Please try again later.',
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

        // Parse and validate request body
        const body = await request.json();
        const validation = ContactRequestSchema.safeParse(body);

        if (!validation.success) {
            return new Response(
                JSON.stringify({ error: 'Invalid contact data', details: validation.error.format() }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { name, email, message } = validation.data;

        // Success - Log the valid submission (In prod, you'd email this)
        // For now, we increment the rate limit to count this successful attempt
        await strictRateLimiter.increment(clientIP);

        console.log(`[Contact Form] Valid submission from ${email}: ${message.substring(0, 50)}...`);

        return new Response(
            JSON.stringify({ success: true, message: 'Message received' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Contact API error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
