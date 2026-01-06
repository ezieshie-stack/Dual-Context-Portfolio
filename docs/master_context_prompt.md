# MASTER CONTEXT PROMPT FOR AI AGENT

You are an expert Full-Stack Developer and UI/UX Designer building a "Role-Aware Portfolio Platform" using Next.js 14, Tailwind CSS, and Framer Motion.

## 1. PROJECT VISION & VIBE
**Core Concept:** A Dual-Context Portfolio with a "Hard Gate" entry.
-   **User A (Hiring Manager):** Wants to see a rigorous Business Analyst / Data Optimization portfolio. Needs Trust, ROI, and Systems Thinking.
-   **User B (Creative):** Wants to see design flair, fluid motion, and aesthetic sensibility.
-   **Vibe:** "Hybrid: Editorial + Product".
    -   **Editorial:** For narrative and authority (New York Times style).
    -   **Product:** For interactive simulators and proof (Linear options style).

## 2. APP FLOW (CRITICAL)
1.  **Entry (Splash Screen):** The user MUST choose a path ("Business Analysis" vs "Creative"). No content is revealed before this choice.
2.  **Context Persistence:** Once chosen, the site adapts (Navbar, Layout, Tone). A toggle in the header allows switching.
3.  **Chatbot ("Dthrills"):** A persistent, context-aware floating widget that guides the user and handles contact/scheduling.

## 3. TECH STACK
-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS + Lucide Icons
-   **Animation:** Framer Motion (Subtle `fadeIn`, `stagger`, no scroll-jacking).
-   **Content:** MDX (Markdown + JSX) for project case studies.

## 4. DESIGN SYSTEM (SUMMARY)
-   **Colors:** White/Off-white background. Deep Charcoal (#1a1a1a) text. Ethereal Blue (#0050ff) accents.
-   **Typography:** *Geist Sans* for Headings and Body. *Geist Mono* for code/data.
-   **Layout:** 12-column grid. Generous whitespace.
-   **Simulators:** DISTINCT modular blocks (gray background) inside editorial pages.

## 5. PAGE ANATOMY (BA PROJECTS)
**Strict Sequence:**
1.  **Hero (Editorial):** Title, Role, Metric.
2.  **Context (Editorial):** Problem framing.
3.  **Simulator (Product Block):** "Click to Reveal" CTA. Expands into interactive module.
4.  **Outcome (Editorial):** Hard ROI numbers.
5.  **Reflection (Editorial):** "How I Think".

## 6. DEVELOPMENT ROADMAP
1.  **Setup:** Initialize Next.js app with TypeScript & Tailwind.
2.  **Scaffold:** Create directory structure (`/app/ba`, `/app/creative`, `/components/ui`, `/components/simulators`).
3.  **Core Components:** Build the "Hard Gate" Splash Screen and the "Context Switcher".
4.  **Chatbot:** Implement the "Dthrills" widget structure.
5.  **Pages:** Flesh out the BA Home and Project Templates using the Hybrid layout.

**Review the full documentation in `/docs` for detailed logic.**
