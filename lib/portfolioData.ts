/**
 * Portfolio Data - Centralized Source of Truth
 * All project facts, skills, and methodology in one place
 * This prevents prompt drift and ensures accuracy
 */

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    metrics: {
        value: string;
        label: string;
    }[];
    tools: string[];
    methodology: string[];
    github?: string;
    timeline?: string;
    businessContext?: string;
}

export interface Skill {
    name: string;
    category: 'language' | 'tool' | 'framework' | 'methodology';
    proficiency: 'advanced' | 'intermediate' | 'familiar';
    yearsExperience?: number;
    examples?: string[];
}

export const DAVID_INFO = {
    name: 'David Ezieshi',
    title: 'Business Analyst',
    tagline: 'Turning data into decisions that ship',
    location: 'Toronto, ON',
    email: 'david@example.com', // Replace with actual
    linkedin: 'https://linkedin.com/in/davidezieshi',
    github: 'https://github.com/davidezieshi',
    resumeUrl: '/resume.pdf',
    calendlyUrl: 'https://calendly.com/davidezieshi', // Replace with actual
};

export const PROJECTS: Project[] = [
    {
        slug: 'sla-optimization',
        title: 'Customer Support SLA Optimization',
        tagline: 'Improved SLA compliance by 34% through data-driven process re-engineering',
        description: 'Analyzed customer support ticket data to identify bottlenecks and optimize response workflows. Used cohort analysis and Monte Carlo simulation to model intervention strategies.',
        metrics: [
            { value: '34%', label: 'SLA Improvement' },
            { value: '$2.1M', label: 'Cost Avoidance' },
            { value: '4 weeks', label: 'Implementation Time' },
        ],
        tools: ['SQL', 'Python', 'Pandas', 'Monte Carlo Simulation', 'Tableau'],
        methodology: [
            'System mapping and bottleneck identification',
            'Cohort analysis by ticket category',
            'A/B comparison with statistical validation',
            'Monte Carlo simulation for scenario modeling',
            'Stakeholder-aligned implementation plan',
        ],
        github: 'https://github.com/davidezieshi/sla-optimization',
        timeline: '4 weeks',
        businessContext: 'Customer support team struggling with SLA compliance, impacting customer satisfaction and escalation costs.',
    },
    {
        slug: 'fraud-detection',
        title: 'Fraud Detection Pipeline',
        tagline: 'Built rules-based fraud detection flagging $2.1M in suspicious transactions',
        description: 'Designed and implemented a SQL-based fraud detection system with velocity rules, merchant risk scoring, and daily alerting. Focus on operational interpretability.',
        metrics: [
            { value: '$2.1M', label: 'Flagged Transactions' },
            { value: '15', label: 'Detection Rules' },
            { value: '<5%', label: 'False Positive Rate' },
        ],
        tools: ['SQL', 'PostgreSQL', 'Window Functions', 'CTEs', 'dbt'],
        methodology: [
            'Velocity analysis using SQL window functions',
            'Merchant risk scoring with aggregated metrics',
            'Rules engine with configurable thresholds',
            'Daily alert generation with risk scores',
            'QA checks and validation rules',
        ],
        github: 'https://github.com/davidezieshi/fraud-detection',
        businessContext: 'Financial services company needed interpretable fraud rules for regulatory compliance.',
    },
    {
        slug: 'churn-prediction',
        title: 'Customer Churn Prediction',
        tagline: '89% AUC model saving $1.4M in annual recurring revenue',
        description: 'Built an XGBoost churn prediction model with 40+ behavioral features. Integrated with CRM for proactive retention campaigns.',
        metrics: [
            { value: '89%', label: 'AUC Score' },
            { value: '$1.4M', label: 'ARR Saved' },
            { value: '40+', label: 'Behavioral Features' },
        ],
        tools: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SHAP'],
        methodology: [
            'Feature engineering from usage and behavioral data',
            'XGBoost with cross-validation and early stopping',
            'SHAP values for model interpretability',
            'Threshold optimization for business constraints',
            'CRM integration for campaign targeting',
        ],
        github: 'https://github.com/davidezieshi/churn-prediction',
        businessContext: 'SaaS company with high churn needed proactive intervention system.',
    },
    {
        slug: 'invoice-analytics',
        title: 'Invoice Analytics Dashboard',
        tagline: 'Full-stack analytics application with FastAPI backend and React frontend',
        description: 'Built an end-to-end invoice processing and analytics platform. Demonstrates full-stack development alongside analytical skills.',
        metrics: [
            { value: '500+', label: 'Invoices Processed' },
            { value: '3', label: 'Interactive Charts' },
            { value: '<200ms', label: 'API Response Time' },
        ],
        tools: ['Python', 'FastAPI', 'React', 'Vite', 'Tailwind CSS', 'Pandas'],
        methodology: [
            'REST API design with FastAPI',
            'Frontend with React and Tailwind',
            'Data processing with Pandas',
            'Interactive visualizations',
            'Docker containerization',
        ],
        github: 'https://github.com/davidezieshi/invoice-analytics',
        businessContext: 'Portfolio project demonstrating full-stack capability.',
    },
];

export const SKILLS: Skill[] = [
    // Languages
    { name: 'SQL', category: 'language', proficiency: 'advanced', yearsExperience: 5, examples: ['Window functions', 'CTEs', 'Query optimization', 'dbt'] },
    { name: 'Python', category: 'language', proficiency: 'advanced', yearsExperience: 4, examples: ['Pandas', 'NumPy', 'Scikit-learn', 'FastAPI'] },
    { name: 'TypeScript', category: 'language', proficiency: 'intermediate', examples: ['React', 'Next.js'] },

    // Tools
    { name: 'Tableau', category: 'tool', proficiency: 'advanced' },
    { name: 'Excel/Google Sheets', category: 'tool', proficiency: 'advanced' },
    { name: 'PostgreSQL', category: 'tool', proficiency: 'advanced' },
    { name: 'Git/GitHub', category: 'tool', proficiency: 'intermediate' },

    // Frameworks
    { name: 'Pandas', category: 'framework', proficiency: 'advanced' },
    { name: 'Scikit-learn', category: 'framework', proficiency: 'intermediate' },
    { name: 'XGBoost', category: 'framework', proficiency: 'intermediate' },
    { name: 'React', category: 'framework', proficiency: 'intermediate' },
    { name: 'Next.js', category: 'framework', proficiency: 'intermediate' },
    { name: 'FastAPI', category: 'framework', proficiency: 'intermediate' },

    // Methodologies
    { name: 'A/B Testing', category: 'methodology', proficiency: 'advanced' },
    { name: 'Cohort Analysis', category: 'methodology', proficiency: 'advanced' },
    { name: 'Statistical Validation', category: 'methodology', proficiency: 'advanced' },
    { name: 'Monte Carlo Simulation', category: 'methodology', proficiency: 'intermediate' },
    { name: 'Feature Engineering', category: 'methodology', proficiency: 'advanced' },
    { name: 'Stakeholder Management', category: 'methodology', proficiency: 'advanced' },
];

// Creative Projects
export const CREATIVE_PROJECTS: Project[] = [
    {
        slug: 'event-photography',
        title: 'Events',
        tagline: 'Capturing moments that tell a story',
        description: 'Professional event photography focusing on candid moments, atmosphere, and brand storytelling.',
        metrics: [
            { value: '50+', label: 'Weddings' },
            { value: '20+', label: 'Corporate Events' },
        ],
        tools: ['Sony A7IV', 'Lightroom', 'Flash'],
        methodology: [
            'Pre-event moodboarding',
            'Candid & Posed coverage',
            'Fast turnaround editing',
            'Emotion-focused composition'
        ],
        timeline: 'Ongoing',
        businessContext: 'Helping clients preserve memories and promote their brands through high-quality imagery.',
    },
    {
        slug: 'lifestyle',
        title: 'Lifestyle',
        tagline: 'Authentic visual narratives',
        description: 'Lifestyle photography that bridges the gap between commercial polish and authentic storytelling.',
        metrics: [
            { value: '15+', label: 'Brand Shoots' },
            { value: '100%', label: 'Client Satisfaction' },
        ],
        tools: ['Natural Light', 'Reflectors', 'Prime Lenses'],
        methodology: [
            'Concept development',
            'Location scouting',
            'Model direction',
            'Style curation'
        ],
        timeline: 'Ongoing',
        businessContext: 'Creating relatable imagery for brands to connect with their audience.',
    },
    {
        slug: 'portrait',
        title: 'Portrait',
        tagline: 'Studio and Environmental Portraits',
        description: 'High-end portraiture for professionals, artists, and individuals looking to stand out.',
        metrics: [
            { value: '100+', label: 'Headsots' },
            { value: '4.9/5', label: 'Rating' },
        ],
        tools: ['Studio Strobes', 'Backdrops', 'Retouching'],
        methodology: [
            'Lighting setup design',
            'Posing guidance',
            'High-end skin retouching',
            'Color grading'
        ],
        timeline: 'Ongoing',
        businessContext: 'Elevating personal branding through professional, high-impact portraits.',
    }
];

export const CREATIVE_SERVICES = [
    {
        title: 'Brand Identity',
        description: 'Logo design, visual systems, and brand guidelines.',
        rate: 'Starting at $5,000'
    },
    {
        title: 'Motion Design',
        description: '2D/3D animation, explainers, and social content.',
        rate: 'Day rate: $800'
    },
    {
        title: 'Web Design',
        description: 'UI/UX design, interactive prototypes, and Framer development.',
        rate: 'Project based'
    }
];

export const CREATIVE_PROCESS = [
    'Discovery: Understanding your brand DNA and goals',
    'Concept: Exploring visual directions and moods',
    'Production: Iterative design and refinement',
    'Delivery: Final assets and implementation support'
];

export const METHODOLOGY = {
    approach: [
        'Clarify the system — understand what you are measuring before measuring',
        'Establish baselines — you cannot improve what you have not measured',
        'Test hypotheses — validate assumptions with data, not gut feel',
        'Ship solutions — deliver insights that teams can actually use',
    ],
    values: [
        'Accuracy over speed (but speed matters)',
        'Stakeholder alignment before deep analysis',
        'Interpretable results over black-box predictions',
        'Documentation for future maintainability',
    ],
};

export function getCreativeProjectsSummary(): string {
    return CREATIVE_PROJECTS.map(p => `- ${p.title}: ${p.tagline}`).join('\n');
}

/**
 * Helper functions for quick data access
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find(p => p.slug === slug);
}

export function getSkillsByCategory(category: Skill['category']): Skill[] {
    return SKILLS.filter(s => s.category === category);
}

export function getAdvancedSkills(): Skill[] {
    return SKILLS.filter(s => s.proficiency === 'advanced');
}

export function getProjectsSummary(): string {
    return PROJECTS.map(p => `- ${p.title}: ${p.tagline}`).join('\n');
}

export function getSkillsSummary(): string {
    const advanced = getAdvancedSkills().map(s => s.name).join(', ');
    return `Advanced: ${advanced}`;
}
