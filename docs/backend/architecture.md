# Backend Architecture & Tech Stack

## 1. Technology Stack
**Framework:** **Next.js 14+ (App Router)**.
-   *Why:* Best-in-class SEO, Server-Side Rendering (SSR) for fast initial load, and powerful Routing for the "Dual Context" structure.

**Language:** **TypeScript**.
-   *Why:* Type safety is critical for a "professional" vibe. Prevents runtime errors and engaging to Hiring Managers browsing the repo.

**Styling:** **Tailwind CSS**.
-   *Why:* Rapid development, consistency, and easy implementation of the Design System's utility classes.

**Icons:** **Lucide React**.
-   *Why:* Clean, consistent, lightweight SVG icons.

**Animation:** **Framer Motion**.
-   *Why:* The gold standard for React animations. Smooth layout transitions and complex gesture handling.

## 2. Infrastructure & Hosting
**Hosting:** **Vercel** (Recommended).
-   *Why:* Zero-config Next.js deployment, edge network speed, analytics.

**Analytics:** **Vercel Analytics** or **PostHog**.
-   *Why:* Privacy-focused, simple integration.

## 3. Data Architecture (Content Management)
**Strategy:** "Code-First Content" (MDX).
-   *Decision:* Since this is a dev portfolio, we will store content as **MDX (Markdown + JSX)** files within the repository.
-   *Benefits:*
    1.  **Version Control:** Content history in Git.
    2.  **Performance:** Zero API latency (build-time generation).
    3.  **Flexibility:** Can embed React components (like Charts or Interactive Sliders) directly inside the Markdown content.

**Content Models:**
1.  `projects/ba/*.mdx`: Frontmatter includes `title`, `metrics`, `tools`, `date`.
2.  `projects/creative/*.mdx`: Frontmatter includes `title`, `mediaType`, `coverImage`.

## 4. Component Architecture
**Directory Structure (Proposed):**
```
/app
  /(routes)
    /ba             # Business Analyst Context Routes
    /creative       # Creative Context Routes
  /layout.tsx       # Root Layout
  /page.tsx         # Splash Screen (Hard Gate)

/components
  /ui               # Design System Primitives (Button, Card, Text)
  /ba               # BA-specific components (MetricCard, ProcessDiagram)
  /creative         # Creative-specific components (MasonryGrid)
  /shared           # Shared components (Chatbot, ContextSwitcher)

/lib
  /utils.ts         # Helper functions
  /content.ts       # MDX logic
```

## 5. Security Checklist
-   [ ] **Headers:** Configure `next.config.js` for security headers (HSTS, X-Frame-Options).
-   [ ] **Sanitization:** Ensure MDX content is properly sanitized (though local files are low risk).
-   [ ] **Rate Limiting:** If adding a server-side API for the Chatbot, implement rate limiting (e.g., using `upstash/ratelimit`).
-   [ ] **Dependencies:** Regular `npm audit`.

## 6. Chatbot Architecture ("Dthrills")
-   **Client:** `ChatWidget` component.
-   **State:** Local state (or light global Context) to track conversation history.
-   **Logic:**
    -   *Phase 1 (MVP):* Rule-based logic (Decision tree JSON). Fast, reliable, no external API costs.
    -   *Phase 2 (AI):* Connect to OpenAI API / Vercel AI SDK if "real" intelligence is needed later.
