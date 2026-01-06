
import { LRUCache } from 'lru-cache';
import { RateLimiter, RateLimitResult } from './types';

interface RateLimitOptions {
    uniqueTokenPerInterval?: number; // Max users to track (default 500)
    interval?: number; // Window size in ms (default 60000)
    max?: number; // Max requests per window
}

/**
 * Memory Rate Limiter
 * Uses LRU cache for efficient in-memory tracking
 * Replaces the slow file-based limiter
 */
export class MemoryRateLimiter implements RateLimiter {
    private tokenCache: LRUCache<string, number[]>;
    private interval: number;
    private max: number;

    constructor(options: RateLimitOptions = {}) {
        this.interval = options.interval || 60000; // 1 minute
        this.max = options.max || 10; // Default limit
        const uniqueTokenPerInterval = options.uniqueTokenPerInterval || 500;

        this.tokenCache = new LRUCache({
            max: uniqueTokenPerInterval,
            ttl: this.interval,
        });
    }

    async check(identifier: string): Promise<RateLimitResult> {
        const now = Date.now();
        const tokenCount = (this.tokenCache.get(identifier) as number[]) || [0];

        const timestamp = tokenCount[0];
        // If timestamp is old, reset
        if (now - timestamp > this.interval) {
            // Let it expire via TTL mostly, but for immediate logic:
            // Actually LRU handles TTL expiration, so getting undefined means new
        }

        const currentUsage = this.tokenCache.get(identifier) as number[] | undefined;

        if (!currentUsage) {
            return {
                allowed: true,
                remaining: this.max,
                resetAt: now + this.interval
            };
        }

        const count = currentUsage.length;
        const remaining = Math.max(0, this.max - count);
        return {
            allowed: remaining > 0,
            remaining,
            resetAt: now + this.interval // Approximate, LRU doesn't expose exact expiry easily without extensive config
        };
    }

    async increment(identifier: string): Promise<void> {
        const currentUsage = (this.tokenCache.get(identifier) as number[]) || [];
        currentUsage.push(Date.now());
        this.tokenCache.set(identifier, currentUsage);
    }
}

// Export distinct limiters for different purposes
export const globalRateLimiter = new MemoryRateLimiter({ max: 20, interval: 60000 }); // 20 req/min for Chat
export const strictRateLimiter = new MemoryRateLimiter({ max: 5, interval: 60000 }); // 5 req/min for Contact form
