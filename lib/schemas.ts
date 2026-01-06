import { z } from 'zod';

// Chat Request Schema
export const ChatRequestSchema = z.object({
    message: z.string().min(1, "Message cannot be empty").max(1000, "Message too long (max 1000 chars)"),
    sessionId: z.string().uuid("Session ID must be a valid UUID").or(z.string().min(10, "Session ID too short")),
    mode: z.enum(['ba', 'creative']),
    intent: z.string().optional(),
    depth: z.string().optional(),
    conversationHistory: z.array(
        z.object({
            role: z.enum(['user', 'assistant']),
            content: z.string().max(2000)
        })
    ).optional()
}).strict(); // Reject unexpected fields

// Contact Request Schema
export const ContactRequestSchema = z.object({
    name: z.string().min(2, "Name is too short").max(100, "Name is too long").regex(/^[a-zA-Z\s\-\.]+$/, "Name contains invalid characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message is too short").max(2000, "Message is too long"),
    // Optional: Add honeypot field or captcha token later
}).strict();

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ContactRequest = z.infer<typeof ContactRequestSchema>;
