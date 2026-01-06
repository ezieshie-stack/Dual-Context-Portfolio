/**
 * Chatbot Logging Types
 * DB-ready interface with JSON implementation for Phase 1
 */

export interface ChatLog {
    id: string;
    timestamp: number;
    sessionId: string;

    // Routing context
    mode: 'ba' | 'creative';
    intent: Intent | null;
    depth: Depth | null;
    personaHint: PersonaType | null;

    // Conversation
    userMessage: string;      // Will be redacted of PII
    botResponse: string;

    // Metadata
    confidence: 'high' | 'medium' | 'low';
    escalated: boolean;
    escalationReason?: string;

    // Feedback (optional, added later)
    feedback?: 'helpful' | 'not_helpful';
    feedbackComment?: string;
}

export type Intent =
    | 'explore_projects'
    | 'role_fit'
    | 'technical_dive'
    | 'recreate_project'
    | 'testing'
    | 'consulting'
    | 'resume_contact'
    | 'creative_experience'
    | 'creative_rates'
    | 'creative_process'
    | 'creative_services'
    | 'creative_availability';

export type Depth = 'overview' | 'walkthrough' | 'detailed';

export type PersonaType =
    | 'recruiter'
    | 'hiring_manager'
    | 'technical_interviewer'
    | 'qa_tester'
    | 'project_recreator'
    | 'potential_client'
    | 'general_visitor'
    | 'creative_director'
    | 'studio_producer'
    | 'brand_manager'
    | 'marketing_lead'
    | 'small_business_owner';

/**
 * Logger interface - implementations can be swapped without changing bot logic
 */
export interface ChatLogger {
    log(event: ChatLog): Promise<void>;
    getRecentLogs?(limit?: number): Promise<ChatLog[]>;
    addFeedback?(logId: string, feedback: ChatLog['feedback'], comment?: string): Promise<void>;
}

/**
 * Rate limiting types
 */
export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt: number;
}

export interface RateLimiter {
    check(identifier: string): Promise<RateLimitResult>;
    increment(identifier: string): Promise<void>;
}
