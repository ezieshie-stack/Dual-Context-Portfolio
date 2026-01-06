# Process Design Document (PDD)

## 1. Document Overview
**Purpose:** Defines the structural logic, page inventory, component hierarchy, and interaction rules for the "Dual-Context Portfolio Platform".
**Audience:** Developers, Designers.
**Prerequisite:** Product Requirements Document (PRD) v1.

## 2. Design Principles (Non-Negotiable)
1.  **Clarity beats flair:** Motion must explain hierarchy or feedback, never decorate.
2.  **User intent is sacred:** BA users should never feel "sold to" or distracted.
3.  **Progressive disclosure:** Show signal first, depth on demand.
4.  **Speed of comprehension:** Hiring managers should understand value in under 60 seconds.
5.  **Confidence through restraint:** Minimal color, consistent spacing, disciplined typography.

## 3. Global Layout System
### 2.1 Page Grid
-   **Structure:** Max Width ~1200px content container.
-   **Margins:** Generous white space.

### 2.2 Header (Persistent & Contextual)
**Behavior:** Sticky. **Shrinks on scroll** (height reduces, padding tightens) to maximize reading space.

**Context A: BA Header**
-   **Left:** Logo (Home).
-   **Right:** Projects, About, [Download Resume], [Context Switcher].
-   **Style:** Minimal, Editorial.

**Context B: Creative Header**
-   **Left:** Logo (Home).
-   **Right:** Work, Experiments, About, [Context Switcher].
-   **Style:** Visual, darker or warmer theme.

### 2.3 Footer (Contextual)
**BA Footer:** Name + Role, Socials, Stack Note ("Built with Next.js · SQL · Python"). No newsletter.
**Creative Footer:** Socials, Contact, Cross-link ("Explore BA Work").

## 4. Page Architecture (Authoritative List)
### 4.1 Global Entry (`/`)
-   **Splash / Hard Gate:** No header/footer. Two large choices.

### 4.2 BA Pages (`/ba`)
-   `/ba/home`: Hero, Flagship Grid, "How I Think". No simulators.
-   `/ba/project/[slug]`: Case study + Click-to-Reveal Simulator.
-   `/ba/about`: Narrative, Systems thinking, Resume download.

### 4.3 Creative Pages (`/creative`)
-   `/creative/home`: Visual masonry.
-   `/creative/project/[slug]`: Visual narrative.

## 7. Flagship Project Cards
-   **Structure:** Title, One-line problem statement, Primary metric (e.g., "$30k/month saved").
-   **Interaction:** Hover -> Slight elevation + "View Project →" reveal.

## 8. Project Detail View (`/ba/project/[slug]`)
**Layout:** "Hybrid Mode: Editorial + Modular Simulators".

**Anatomy (Strict Sequence):**
1.  **Hero (Editorial):** Title, Role, Metric.
2.  **Context & Problem (Editorial):** Short paragraphs, clear framing.
3.  **Decision Simulator (Modular Product Block):**
    -   **State 1 (Hidden):** Clear CTA button "Simulate [Decision Name]".
    -   **State 2 (Revealed):** Distinct box expands with sliders/toggles.
    -   **Logic:** "What if" scenarios.
4.  **Outcome / ROI (Editorial + Data):** Hard numbers.
5.  **Reflection (Editorial):** "How I Think".

**Interactive Rule:** Interactivity is explicit. Users *choose* to engage, preserving the reading flow for pure skimmers.

## 9. "How I Think" Framework
-   **Placement:** Below flagship projects. Scroll-triggered reveal.
-   **Structure:**
    1.  Diagnose bottleneck.
    2.  Quantify impact.
    3.  Simulate decisions.
    4.  Optimize for ROI.
-   **Motion:** Sequential fade-in per step.

## 10. Chatbot ("Dthrills") Design
-   **Role:** Context-aware assistant & primary conversion mechanism.
-   **Behavior:** Idle state (minimal icon). First interaction ("Want a walkthrough or jump to results?").
-   **Tone:** BA Mode (Professional), Creative Mode (Insightful).

## 11. Accessibility & UX Rules
-   Keyboard navigable.
-   High contrast text.
-   Respects `prefers-reduced-motion`.
-   Resume downloadable without friction.
