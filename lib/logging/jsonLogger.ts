/**
 * JSON File Logger Implementation
 * Phase 1: Simple file-based logging for development
 * Can be swapped to Vercel KV or Supabase later without changing bot logic
 */

import fs from 'fs/promises';
import path from 'path';
import { ChatLogger, ChatLog, RateLimiter, RateLimitResult } from './types';

const LOG_DIR = path.join(process.cwd(), 'logs');
const CHAT_LOG_PATH = path.join(LOG_DIR, 'chat.json');
const RATE_LIMIT_PATH = path.join(LOG_DIR, 'rate-limits.json');

// Rate limit config
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute

/**
 * Ensure logs directory exists
 */
async function ensureLogDir(): Promise<void> {
    try {
        await fs.mkdir(LOG_DIR, { recursive: true });
    } catch {
        // Directory exists
    }
}

/**
 * Read JSON file safely
 */
async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);
    } catch {
        return defaultValue;
    }
}

/**
 * Write JSON file atomically
 */
async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
    await ensureLogDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Simple PII redaction
 */
function redactPII(text: string): string {
    // Email addresses
    let redacted = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');

    // Phone numbers (various formats)
    redacted = redacted.replace(/(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g, '[PHONE]');

    // Credit card numbers (basic pattern)
    redacted = redacted.replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]');

    // Social security numbers
    redacted = redacted.replace(/\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g, '[SSN]');

    return redacted;
}

/**
 * JSON File Chat Logger
 */
export const jsonLogger: ChatLogger = {
    async log(event: ChatLog): Promise<void> {
        // Redact PII before storing
        const redactedEvent: ChatLog = {
            ...event,
            userMessage: redactPII(event.userMessage),
        };

        const logs = await readJsonFile<ChatLog[]>(CHAT_LOG_PATH, []);
        logs.push(redactedEvent);

        // Keep only last 1000 logs to prevent file bloat
        const trimmedLogs = logs.slice(-1000);
        await writeJsonFile(CHAT_LOG_PATH, trimmedLogs);
    },

    async getRecentLogs(limit = 50): Promise<ChatLog[]> {
        const logs = await readJsonFile<ChatLog[]>(CHAT_LOG_PATH, []);
        return logs.slice(-limit);
    },

    async addFeedback(logId: string, feedback: ChatLog['feedback'], comment?: string): Promise<void> {
        const logs = await readJsonFile<ChatLog[]>(CHAT_LOG_PATH, []);
        const logIndex = logs.findIndex(log => log.id === logId);

        if (logIndex !== -1) {
            logs[logIndex].feedback = feedback;
            if (comment) {
                logs[logIndex].feedbackComment = redactPII(comment);
            }
            await writeJsonFile(CHAT_LOG_PATH, logs);
        }
    },
};

/**
 * Rate limit storage structure
 */
interface RateLimitEntry {
    count: number;
    windowStart: number;
}

/**
 * JSON File Rate Limiter
 */
export const jsonRateLimiter: RateLimiter = {
    async check(identifier: string): Promise<RateLimitResult> {
        const limits = await readJsonFile<Record<string, RateLimitEntry>>(RATE_LIMIT_PATH, {});
        const now = Date.now();
        const entry = limits[identifier];

        // No entry or window expired
        if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
            return {
                allowed: true,
                remaining: RATE_LIMIT_MAX_REQUESTS,
                resetAt: now + RATE_LIMIT_WINDOW_MS,
            };
        }

        // Within window
        const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count);
        return {
            allowed: remaining > 0,
            remaining,
            resetAt: entry.windowStart + RATE_LIMIT_WINDOW_MS,
        };
    },

    async increment(identifier: string): Promise<void> {
        const limits = await readJsonFile<Record<string, RateLimitEntry>>(RATE_LIMIT_PATH, {});
        const now = Date.now();
        const entry = limits[identifier];

        if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
            // New window
            limits[identifier] = { count: 1, windowStart: now };
        } else {
            // Increment existing
            limits[identifier].count++;
        }

        // Clean up old entries (older than 5 minutes)
        const CLEANUP_THRESHOLD = 5 * 60 * 1000;
        for (const key of Object.keys(limits)) {
            if (now - limits[key].windowStart > CLEANUP_THRESHOLD) {
                delete limits[key];
            }
        }

        await writeJsonFile(RATE_LIMIT_PATH, limits);
    },
};
