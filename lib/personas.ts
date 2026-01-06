/**
 * Persona Routing System
 * Maps user intents to internal personas without exposing labels
 */

import { Intent, Depth, PersonaType } from './logging';

/**
 * Intent options shown to users (Step 1)
 */
export const INTENT_OPTIONS: { id: Intent; label: string; icon: string }[] = [
    { id: 'explore_projects', label: 'Explore projects', icon: '🔍' },
    { id: 'role_fit', label: 'Check role fit / strengths', icon: '✓' },
    { id: 'technical_dive', label: 'Technical deep dive', icon: '🔧' },
    { id: 'recreate_project', label: 'Recreate a project', icon: '📚' },
    { id: 'testing', label: 'Testing / report issue', icon: '🧪' },
    { id: 'consulting', label: 'Discuss consulting', icon: '💼' },
    { id: 'resume_contact', label: 'Resume / contact', icon: '📄' },
];

export const CREATIVE_INTENT_OPTIONS: { id: Intent; label: string; icon: string }[] = [
    { id: 'creative_services', label: 'Services offered', icon: '✨' },
    { id: 'creative_process', label: 'Creative process', icon: '🎨' },
    { id: 'creative_experience', label: 'Past experience', icon: '🏆' },
    { id: 'creative_rates', label: 'Rates & pricing', icon: '💰' },
    { id: 'creative_availability', label: 'Collab / Availability', icon: '📅' },
];

/**
 * Depth options shown to users (Step 2)
 */
export const DEPTH_OPTIONS: { id: Depth; label: string; description: string }[] = [
    { id: 'overview', label: '30-second overview', description: 'Quick summary' },
    { id: 'walkthrough', label: '2-minute walkthrough', description: 'Key details and metrics' },
    { id: 'detailed', label: 'Full technical breakdown', description: 'Methodology and code' },
];

/**
 * Map intent to internal persona (hidden from user)
 */
export function getPersonaFromIntent(intent: Intent): PersonaType {
    const mapping: Record<Intent, PersonaType> = {
        explore_projects: 'general_visitor',
        role_fit: 'recruiter',
        technical_dive: 'technical_interviewer',
        recreate_project: 'project_recreator',
        testing: 'qa_tester',
        consulting: 'potential_client',
        resume_contact: 'recruiter',

        // Creative Personas
        creative_experience: 'creative_director',
        creative_rates: 'studio_producer',
        creative_process: 'brand_manager',
        creative_services: 'marketing_lead',
        creative_availability: 'small_business_owner',
    };
    return mapping[intent];
}

/**
 * Response style configuration per persona
 */
export interface ResponseStyle {
    tone: string;
    maxLength: 'short' | 'medium' | 'detailed';
    prioritizeCTAs: string[];
    includeMetrics: boolean;
    includeMethodology: boolean;
    includeCode: boolean;
}

export function getResponseStyle(persona: PersonaType, depth: Depth): ResponseStyle {
    // Base styles per persona
    const personaStyles: Record<PersonaType, Partial<ResponseStyle>> = {
        recruiter: {
            tone: 'concise, scannable, direct',
            maxLength: 'short',
            prioritizeCTAs: ['resume', 'schedule'],
            includeMetrics: true,
            includeMethodology: false,
            includeCode: false,
        },
        hiring_manager: {
            tone: 'structured, analytical, thorough',
            maxLength: 'medium',
            prioritizeCTAs: ['project', 'schedule'],
            includeMetrics: true,
            includeMethodology: true,
            includeCode: false,
        },
        technical_interviewer: {
            tone: 'precise, honest, nuanced',
            maxLength: 'detailed',
            prioritizeCTAs: ['github', 'project'],
            includeMetrics: true,
            includeMethodology: true,
            includeCode: true,
        },
        qa_tester: {
            tone: 'methodical, systematic, detailed',
            maxLength: 'detailed',
            prioritizeCTAs: ['github', 'documentation'],
            includeMetrics: false,
            includeMethodology: true,
            includeCode: true,
        },
        project_recreator: {
            tone: 'encouraging, tutorial-style, step-by-step',
            maxLength: 'detailed',
            prioritizeCTAs: ['github', 'resources'],
            includeMetrics: false,
            includeMethodology: true,
            includeCode: true,
        },
        potential_client: {
            tone: 'professional, outcome-focused, qualifying',
            maxLength: 'medium',
            prioritizeCTAs: ['schedule', 'email'],
            includeMetrics: true,
            includeMethodology: false,
            includeCode: false,
        },
        general_visitor: {
            tone: 'warm, accessible, friendly',
            maxLength: 'short',
            prioritizeCTAs: ['explore', 'connect'],
            includeMetrics: true,
            includeMethodology: false,
            includeCode: false,
        },

        // Creative Personas
        creative_director: {
            tone: 'visionary, visual, portfolio-focused, sophisticated',
            maxLength: 'medium',
            prioritizeCTAs: ['explore', 'schedule'],
            includeMetrics: true,
            includeMethodology: true, // Focus on creative process
            includeCode: false,
        },
        studio_producer: {
            tone: 'efficient, budget-aware, timeline-focused, direct',
            maxLength: 'short',
            prioritizeCTAs: ['schedule', 'email'],
            includeMetrics: true, // ROI focus
            includeMethodology: false,
            includeCode: false,
        },
        brand_manager: {
            tone: 'strategic, brand-aligned, story-driven',
            maxLength: 'medium',
            prioritizeCTAs: ['explore', 'connect'],
            includeMetrics: true, // Engagement metrics
            includeMethodology: true, // Process alignment
            includeCode: false,
        },
        marketing_lead: {
            tone: 'results-oriented, campaign-focused, energetic',
            maxLength: 'short',
            prioritizeCTAs: ['schedule', 'explore'],
            includeMetrics: true, // Conversion rates
            includeMethodology: false,
            includeCode: false,
        },
        small_business_owner: {
            tone: 'collaborative, approachable, clear, supportive',
            maxLength: 'short',
            prioritizeCTAs: ['email', 'schedule'],
            includeMetrics: false,
            includeMethodology: false,
            includeCode: false,
        },
    };

    // Depth overrides
    const depthOverrides: Record<Depth, Partial<ResponseStyle>> = {
        overview: { maxLength: 'short', includeMethodology: false, includeCode: false },
        walkthrough: { maxLength: 'medium', includeMethodology: true, includeCode: false },
        detailed: { maxLength: 'detailed', includeMethodology: true, includeCode: true },
    };

    const baseStyle = personaStyles[persona];
    const depthStyle = depthOverrides[depth];

    return {
        tone: baseStyle.tone || 'helpful, clear',
        maxLength: depthStyle.maxLength || baseStyle.maxLength || 'medium',
        prioritizeCTAs: baseStyle.prioritizeCTAs || [],
        includeMetrics: baseStyle.includeMetrics ?? true,
        includeMethodology: depthStyle.includeMethodology ?? baseStyle.includeMethodology ?? false,
        includeCode: depthStyle.includeCode ?? baseStyle.includeCode ?? false,
    };
}

/**
 * Escalation topics that require human contact
 */
export const ESCALATION_TOPICS = [
    'salary', 'compensation', 'pay', 'rate',
    'visa', 'sponsorship', 'work authorization',
    'availability', 'start date', 'notice period',
    'pricing', 'cost', 'quote', 'contract', 'terms',
    'client names', 'proprietary', 'confidential',
];

export function shouldEscalate(message: string): { escalate: boolean; reason?: string } {
    const lowerMessage = message.toLowerCase();

    for (const topic of ESCALATION_TOPICS) {
        if (lowerMessage.includes(topic)) {
            return { escalate: true, reason: topic };
        }
    }

    return { escalate: false };
}

/**
 * CTA definitions
 */
export const CTAS = {
    resume: { label: 'Download Resume', action: 'download_resume' },
    schedule: { label: 'Schedule a Chat', action: 'open_calendly' },
    email: { label: 'Email David', action: 'open_email' },
    github: { label: 'View on GitHub', action: 'open_github' },
    project: { label: 'Open Project Page', action: 'open_project' },
    explore: { label: 'Explore More', action: 'show_projects' },
    connect: { label: 'Connect on LinkedIn', action: 'open_linkedin' },
    resources: { label: 'Learning Resources', action: 'show_resources' },
    documentation: { label: 'View Documentation', action: 'show_docs' },
};
