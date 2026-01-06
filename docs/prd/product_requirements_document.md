# Product Requirement Document (PRD)

## 0. Product Definition
**Product Name (Working):** Dual-Context Portfolio Platform
**One-Sentence Pitch:** A role-aware portfolio platform that allows hiring managers and general audiences to intentionally explore either business analysis work or creative work, without distraction or context switching.

## 1. Project Overview
**Vision:** To create a "clean and calm" digital space that respects the user's intent immediately upon arrival.
**Core Concept:** "Hard Gate Profile Selection" - Users must explicitly choose their path before viewing content.

**Refined Value Proposition:**
"Business Analyst focused on optimization, automation, and data-driven decision-making. I turn messy operations into measurable, automated, optimized systems. Strong experience in SQL, Python, statistical analysis, and end-to-end analytics projects (churn, SLA optimization, fraud detection). I specialize in bridging business problems, user needs, and technical execution."

## 2. Goals & Objectives
### Primary Goal (Phase 1)
-   **Objective:** Get hired into a Business Analyst / Data / Ops role.
-   **Target:** Impress technical hiring managers and recruiters.

### Secondary Goal (Phase 2)
-   **Objective:** Build personal brand and showcase creative capability.
-   **Target:** Impress freelance clients and general creative audience.

### 2.1. Non-Goals (Out of Scope for Phase 1)
-   Blogging platform or CMS
-   Social media feed or activity stream
-   Heavy animations on BA path
-   Authentication or user accounts
-   Analytics dashboards for the site itself

## 3. Success Metrics
**Primary Metric:** Hiring managers understand value in **under 60 seconds**.
They must be able to clearly articulate:
1.  What problems you solve.
2.  How you think.
3.  What tools you use.
4.  Why they should interview you.

## 4. Target Audience (Personas)
### Persona 1: Hiring Manager / Recruiter (PRIMARY)
-   **Role Types:** Business Analyst, Data Analyst, Operations Analyst, Product/Strategy specific.
-   **Mental Model:** Understands systems, thinks in tradeoffs, cares about business outcomes. Skims first, dives second.
-   **Immediate Needs:**
    -   "Can this person think?"
    -   "Can this person structure problems?"
    -   "Can this person execute with data?"
    -   "Can this person communicate clearly?"

### Persona 2: Creative Client / General Audience (SECONDARY)
-   **Role Types:** Business Owners, Design Agencies, Peers.
-   **Mental Model:** Visual, appreciative of aesthetics and interaction.
-   **Immediate Needs:** "Is this high quality?", "Is this unique?", "Can they deliver this for me?"

## 5. Entry Experience (The Hard Gate)
**Mechanism:** Mandatory First Screen (Splash/Landing).
**Prompt:** "What would you like to explore?"
**Options:**
1.  **Business Analysis & Optimization** (Leads to BA Portfolio)
2.  **Creative Work** (Leads to Creative Portfolio)

**Rules:**
-   **No content visible** before selection.
-   **Choice determines:** Navigation, Homepage content, Language/Tone, Projects shown.
-   **Switchable:** User can switch context later via a header toggle.
-   **Context Isolation:** This is not a gimmick; it completely changes the detailed presentation to suit the viewer.

## 6. Key Features (Locked)
### 6.1. Flagship BA Projects (The "Big Three")
**Decision:** Display 3 specific flagship projects initially to maximize credibility and depth.
1.  **Churn Analysis:** Focus on business impact + modeling.
2.  **SLA Optimization / Operations Decision Engine:** Focus on operational efficiency.
3.  **Fraud Detection:** Focus on SQL-first logic and monitoring mindset.

**Structure per Project:**
`Problem -> Approach -> Tools -> Solution -> ROI`

**Features:**
-   Interactive elements (sliders for capacity/ROI).
-   Simulation scenarios ("What happens if...").

### 6.2. BA Homepage Priority (Above the Fold)
1.  One-sentence value proposition
2.  Resume CTA
3.  Flagship Projects (Big Three)
4.  "How I Think" framework (scroll)

### 6.3. "How I Think" Framework (Initial Draft)
-   Diagnose the bottleneck
-   Quantify impact
-   Simulate decisions
-   Optimize for ROI, not aesthetics

### 6.4. Navigation & Cross-Linking
**Strategy:** Cross-linked (Option B).
-   Creative and BA paths are distinct but accessible.
-   Creative pages contain subtle links like "Also see my Business Analysis work".
-   BA side remains primary for hiring managers (no distraction).

### 6.5. AI Tour Guide Chatbot ("Dthrills")
-   **Name:** Dthrills
-   **Interface:** Standard floating widget.
-   **Role:** Context-aware guide & **primary conversion interface**.
-   **Behavior:**
    -   **BA Mode:** Focus on ROI, methodologies, tools, problem-solving. Tone: Professional & Analytical.
    -   **Creative Mode:** Focus on design decisions, visual impact. Tone: Playful & Insightful.
    -   **Contact Handling:** The bot handles the "Contact Me" flow (scheduling/email collection) interactively.

### 6.6. Resume Strategy
-   **Format:** Downloadable PDF only.
-   **Location:** Clearly visible call-to-action (CTA) on BA pages.

### 6.7. Tech Stack (Preliminary)
-   **Framework:** Next.js (React).
-   **Rationale:** Enables server-rendered content for clarity and SEO, with client-side interactivity for simulations and tooling.
