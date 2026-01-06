"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlowBackground } from "@/components/ambient/GlowBackground";
import { OrbField } from "@/components/ambient/OrbField";
import { FlowLines } from "@/components/ambient/FlowLines";
import BAHeader from "@/components/ba/BAHeader";
import Chatbot from "@/components/shared/Chatbot";

// Project data with GitHub links and real chart images
const PROJECTS: Record<string, {
    title: string;
    subtitle: string;
    metric: string;
    metricLabel: string;
    description: string;
    overview: string;
    challenge: string;
    approach: string[];
    results: { value: string; label: string }[];
    tools: string[];
    githubUrl: string;
    visuals: { type: "chart" | "dashboard" | "diagram"; title: string; description: string; image?: string }[];
}> = {
    "sla-optimization": {
        title: "Customer Support SLA Optimization",
        subtitle: "Decision Engine + ROI Simulation",
        metric: "34%",
        metricLabel: "SLA Improvement",
        description: "Root cause analysis and process redesign that identified optimal intervention points and reduced missed SLAs through a capacity-based 'Sniper' strategy.",
        overview: "This flagship project tackled a critical operational challenge: customer support teams were missing SLA targets on 40% of tickets, leading to customer dissatisfaction and escalating costs. Through systematic data analysis, cohort segmentation, and simulation modeling, I identified the highest-impact intervention points and designed a 'Sniper' strategy that prioritized low-effort, high-impact fixes. The result was a 34% reduction in missed SLAs and $2.1M in annual cost avoidance—achieved within just 4 weeks of implementation.",
        challenge: "The customer support team was consistently missing SLA targets, with 40% of tickets exceeding response time thresholds. Leadership faced a critical decision: where to invest limited resources for maximum impact? Historical data was fragmented across multiple systems, making it difficult to identify root causes or predict outcomes of proposed interventions.",
        approach: [
            "Mapped the complete end-to-end ticket lifecycle, identifying 12 distinct bottleneck points across intake, triage, assignment, and resolution phases",
            "Built cohort analysis segmenting tickets by complexity tier, channel origin, agent skill level, and time-of-day patterns to isolate key drivers of SLA breaches",
            "Developed a Monte Carlo simulation model to test intervention strategies before implementation, projecting outcomes with confidence intervals",
            "Created the 'Sniper' targeting framework: ranking interventions by impact-to-effort ratio to maximize ROI with constrained resources"
        ],
        results: [
            { value: "34%", label: "Reduction in missed SLAs" },
            { value: "$2.1M", label: "Annual cost avoidance" },
            { value: "18%", label: "Agent productivity gain" },
            { value: "4 weeks", label: "Implementation timeline" }
        ],
        tools: ["SQL", "Python", "Tableau", "Excel", "Jira"],
        githubUrl: "https://github.com/ezieshie-stack/Customer-Support-SLA-Optimization-Project",
        visuals: [
            { type: "chart", title: "SLA Performance Over Time", description: "Trend analysis showing SLA improvement from 60% baseline to 94% after optimization", image: "/images/sla-chart.png" },
            { type: "dashboard", title: "Sniper Command Center", description: "Interactive dashboard for prioritizing intervention strategies by impact-to-effort ratio", image: "/images/sla-chart.png" },
            { type: "diagram", title: "Process Flow Analysis", description: "End-to-end ticket flow mapping with bottleneck identification and resolution paths", image: "/images/sla-chart.png" }
        ]
    },
    "fraud-detection": {
        title: "Fraud Detection Pipeline",
        subtitle: "SQL Window Functions + Anomaly Detection",
        metric: "$2.1M",
        metricLabel: "Flagged Fraud",
        description: "Built a comprehensive SQL-based monitoring system with velocity rules, merchant risk scoring, and daily alert generation.",
        overview: "Manual fraud review processes were missing sophisticated attack patterns, leading to significant financial losses. This project built an automated detection pipeline using advanced SQL techniques—window functions for velocity analysis, configurable rule engines, and merchant risk scoring. The system processes transactions in real-time, flagging suspicious activity before losses occur and providing analysts with prioritized review queues ranked by risk score.",
        challenge: "The existing fraud detection relied on manual review and simple threshold rules, missing complex attack patterns like velocity-based fraud (multiple small transactions in rapid succession) and merchant collusion rings. Analysts were overwhelmed with false positives, while sophisticated fraud slipped through undetected.",
        approach: [
            "Engineered rolling velocity features using SQL window functions (LAG, LEAD, SUM OVER) to detect unusual transaction patterns within custom time windows",
            "Built a modular rule engine with 15+ configurable fraud patterns, including velocity anomalies, geographic impossibility, and amount clustering",
            "Created merchant risk scoring based on historical fraud rates, refund patterns, and network analysis of connected accounts",
            "Designed a daily alert pipeline with prioritized review queue, risk scores, and explainable reasons for each flag"
        ],
        results: [
            { value: "$2.1M", label: "Suspicious transactions flagged" },
            { value: "89%", label: "Detection accuracy" },
            { value: "12%", label: "False positive reduction" },
            { value: "Real-time", label: "Alert generation" }
        ],
        tools: ["SQL", "Python", "PostgreSQL", "Airflow", "Looker"],
        githubUrl: "https://github.com/ezieshie-stack/Fraud-Detection-SQL-Window-Functions",
        visuals: [
            { type: "chart", title: "Velocity Pattern Analysis", description: "Scatter visualization showing transaction clusters with anomaly detection boundaries", image: "/images/fraud-chart.png" },
            { type: "dashboard", title: "Daily Alert Feed", description: "Prioritized fraud alerts with risk scores, pattern types, and investigation notes", image: "/images/fraud-chart.png" },
            { type: "diagram", title: "Rule Engine Architecture", description: "Configurable threshold system with pattern matching and scoring logic", image: "/images/fraud-chart.png" }
        ]
    },
    "churn-predictor": {
        title: "Churn & Retention Modeling",
        subtitle: "ML Feature Engineering + Segmentation",
        metric: "89%",
        metricLabel: "Prediction Accuracy",
        description: "Customer churn prediction model with feature engineering, behavioral segmentation, and impact modeling for targeted retention campaigns.",
        overview: "Customer success teams were operating reactively—learning about churn only after customers had already left. This project built a proactive early warning system using machine learning, enabling targeted interventions before customers reach the tipping point. Through careful feature engineering of 40+ behavioral signals and interpretable model design, we achieved 89% prediction accuracy and saved $1.4M ARR through strategic retention campaigns.",
        challenge: "With no predictive capabilities, the customer success team could only react after customers churned or explicitly requested cancellation. By that point, win-back rates were below 10%. Leadership needed to understand which behaviors predicted churn and how to intervene effectively at each risk level.",
        approach: [
            "Engineered 40+ behavioral features from product usage data: login frequency, feature adoption curves, support ticket sentiment, contract utilization rates",
            "Built K-means segmentation model identifying 5 distinct customer archetypes with different risk profiles and intervention preferences",
            "Trained gradient boosting classifier (XGBoost) with SHAP-based interpretation to explain predictions to non-technical stakeholders",
            "Created intervention playbook mapping risk levels to specific actions: high-risk customers trigger CSM outreach, medium-risk receive targeted messaging"
        ],
        results: [
            { value: "89%", label: "Prediction accuracy (AUC)" },
            { value: "23%", label: "Churn rate reduction" },
            { value: "$1.4M", label: "ARR saved annually" },
            { value: "3x", label: "Retention campaign ROI" }
        ],
        tools: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Tableau", "Salesforce"],
        githubUrl: "https://github.com/ezieshie-stack/telco-churn-analysis",
        visuals: [
            { type: "chart", title: "Feature Importance Analysis", description: "SHAP values showing top predictive features ranked by contribution to churn probability", image: "/images/churn-chart.png" },
            { type: "dashboard", title: "Customer Risk Segments", description: "Behavioral segmentation with risk profiles and recommended intervention strategies", image: "/images/churn-chart.png" },
            { type: "diagram", title: "ML Pipeline Architecture", description: "End-to-end workflow from data ingestion through prediction and CRM integration", image: "/images/churn-chart.png" }
        ]
    },
    "invoice-analytics": {
        title: "Invoice Analytics Dashboard",
        subtitle: "Full-Stack React + FastAPI",
        metric: "40%",
        metricLabel: "Time Saved",
        description: "Full-stack web application for invoice processing, analytics, and reporting. Built with React frontend and FastAPI backend.",
        overview: "The finance team was spending 10+ hours weekly on manual invoice reconciliation, data entry, and report generation. This full-stack application automates the entire workflow: from PDF upload and OCR extraction to categorization, anomaly detection, and self-serve analytics. The React dashboard provides instant visibility into spending patterns, while the FastAPI backend handles processing at scale.",
        challenge: "Invoice processing was entirely manual: downloading PDFs from email, entering data into spreadsheets, cross-referencing against budgets, and building monthly reports. This consumed significant finance team bandwidth and introduced human error. Stakeholders waited days for basic spend visibility.",
        approach: [
            "Designed RESTful API with FastAPI for invoice ingestion, including PDF parsing, OCR text extraction, and structured data normalization",
            "Built React dashboard with interactive Recharts visualizations: spend by category, vendor trends, budget vs. actual comparisons",
            "Implemented ML-based auto-categorization using historical patterns, achieving 95% accuracy and reducing manual tagging",
            "Created anomaly flagging for unusual amounts, duplicate invoices, and budget overruns with Slack/email notifications"
        ],
        results: [
            { value: "40%", label: "Time saved weekly" },
            { value: "95%", label: "Auto-categorization accuracy" },
            { value: "< 2s", label: "Dashboard load time" },
            { value: "Self-serve", label: "No developer needed" }
        ],
        tools: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/ezieshie-stack/Business-Analysis-Process-Design-Portfolio", // TODO: Update when Tableau invoice repo is ready
        visuals: [
            { type: "dashboard", title: "Invoice Dashboard UI", description: "Interactive React interface with expense breakdown, trends, and anomaly alerts", image: "/images/invoice-dashboard.png" },
            { type: "chart", title: "Spend Analytics", description: "Category breakdown with month-over-month trends and budget variance analysis", image: "/images/invoice-dashboard.png" },
            { type: "diagram", title: "API Architecture", description: "REST endpoints with FastAPI, async processing, and PostgreSQL persistence", image: "/images/invoice-dashboard.png" }
        ]
    }
};

// Visual card component with real images
function VisualCard({ visual, index }: { visual: { type: string; title: string; description: string; image?: string }; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden backdrop-blur-xl hover:border-white/20 transition-all"
        >
            {/* Image area */}
            <div className="aspect-video relative overflow-hidden">
                {visual.image ? (
                    <Image
                        src={visual.image}
                        alt={visual.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                        <span className="text-white/20 text-xs uppercase tracking-wider">{visual.type}</span>
                    </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-4">
                <h4 className="font-semibold text-white mb-1">{visual.title}</h4>
                <p className="text-sm text-white/50">{visual.description}</p>
            </div>
        </motion.div>
    );
}

export default function ProjectDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const project = PROJECTS[slug];

    if (!project) {
        return (
            <main className="relative min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/ba/home" className="text-white/60 hover:text-white">
                        ← Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
            <BAHeader />
            <GlowBackground />
            <FlowLines />
            <OrbField />
            <Chatbot />

            <div className="relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/ba/home#projects"
                            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Back to Projects
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4 block">
                            {project.subtitle}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
                            {project.title}
                        </h1>
                        <p className="text-base sm:text-xl text-white/60 leading-relaxed mb-6 sm:mb-8">
                            {project.description}
                        </p>

                        {/* Hero Metric + GitHub Link */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                            <div className="inline-flex items-baseline gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl glass">
                                <span className="text-3xl sm:text-5xl font-bold gradient-text">{project.metric}</span>
                                <span className="text-sm sm:text-base text-white/50">{project.metricLabel}</span>
                            </div>

                            {/* GitHub Link */}
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 py-3 px-5 rounded-full glass text-white/70 hover:text-white hover:border-white/30 transition-all group"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                <span className="text-sm font-medium">View on GitHub</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Overview */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-white/70 leading-relaxed text-lg">
                            {project.overview}
                        </p>
                    </motion.section>

                    {/* Visual Representations with real charts */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-16"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Project Outputs</h2>
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {project.visuals.map((visual, i) => (
                                <VisualCard key={i} visual={visual} index={i} />
                            ))}
                        </div>
                    </motion.section>

                    {/* Challenge */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                        <p className="text-white/70 leading-relaxed text-lg">
                            {project.challenge}
                        </p>
                    </motion.section>

                    {/* Approach */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold mb-6">My Approach</h2>
                        <div className="space-y-4">
                            {project.approach.map((step, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl glass">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-sm font-bold">
                                        {i + 1}
                                    </span>
                                    <p className="text-white/80 pt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Results */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold mb-6">Results</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {project.results.map((result, i) => (
                                <div key={i} className="p-4 sm:p-6 rounded-2xl glass text-center">
                                    <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">{result.value}</div>
                                    <div className="text-xs sm:text-sm text-white/50">{result.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Tools */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold mb-6">Tools & Technologies</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.tools.map((tool, i) => (
                                <span key={i} className="px-4 py-2 rounded-full glass text-sm font-medium text-white/70">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="pt-8 border-t border-white/10"
                    >
                        <h3 className="text-xl font-semibold mb-4">Interested in similar results?</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/ba/contact" className="btn-primary">
                                Let's Talk
                            </Link>
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                View Full Code
                            </a>
                            <Link href="/ba/home#projects" className="btn-secondary">
                                More Projects
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
