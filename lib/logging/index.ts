/**
 * Logging Module Export
 * Switch implementations here without touching bot logic
 */

import { jsonLogger, jsonRateLimiter } from './jsonLogger';
import type { ChatLogger, RateLimiter, ChatLog, Intent, Depth, PersonaType } from './types';

// Active implementations - change these to swap backends
// Active implementations - change these to swap backends
export const logger: ChatLogger = jsonLogger;
export const rateLimiter: RateLimiter = globalRateLimiter; // Uses MemoryRateLimiter now

import { globalRateLimiter } from './rateLimit';

// Re-export types
export type { ChatLogger, RateLimiter, ChatLog, Intent, Depth, PersonaType };
