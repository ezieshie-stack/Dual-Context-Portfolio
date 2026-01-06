# App Flow Document

## 1. High-Level User Journey
The user's journey is defined by the "Hard Gate" decision at the start. The application forks into two distinct experiences (Contexts) that share a common underlying architecture but differ in presentation and content.

### Global Elements
-   **"Dthrills" Chatbot:** Persistent floating widget. Context-aware (knows which path the user is on).
-   **Context Switcher:** Small, unobtrusive toggle in the header to switch between "BA Mode" and "Creative Mode".

---

## 2. The Hard Gate (Entry Point)
**Screen:** `Splash / Landing Page`
**Goal:** Determine user intent immediately.

1.  **User Arrives:** Clean, minimalist screen. No navigation bar yet.
2.  **Prompt:** "What are you looking for?" / "Choose your path."
3.  **Selection:**
    -   **Option A:** "Business Analysis & Optimization" -> Redirects to `/ba/home`
    -   **Option B:** "Creative & Design" -> Redirects to `/creative/home`

---

## 3. Path A: Business Analysis (The Hiring Flow)
**Target:** Hiring Managers.
**Vibe:** Professional, Clean, Data-Driven, "New York Times" Typography.

### 3.1. BA Home (`/ba/home`)
-   **Hero:** Strong Value Proposition (The "Refined Value Prop" from PRD).
-   **Primary CTA:** "Download Resume" (PDF).
-   **Content:**
    -   **Featured Projects Grid:** Displays the "Big Three" (Churn, SLA, Fraud).
    -   **Visuals:** Clean data visualizations, schematic diagrams, no fluff.

### 3.2. Project Detail View (`/ba/project/[id]`)
-   **Structure:** `Problem -> Approach -> Tools -> Solution -> ROI`
-   **Interactive Component:**
    -   *Example:* For Churn Analysis, a slider letting the user change "Churn Rate" to see "Revenue Saved".
-   **Sidebar/Footer:** "Ask Dthrills about this project" prompt.

### 3.3. Contact / Conversion
-   **Trigger:** User clicks "Contact" or engages "Dthrills".
-   **Mechanism:** Chatbot-driven.
    -   *Bot:* "Would you like to schedule a chat or send an email?"
    -   *Action:* Captures email or provides Calendly link within the chat interface.

---

## 4. Path B: Creative (The Vibe Flow)
**Target:** Clients, Agencies, General Public.
**Vibe:** Interactive, Fluid, Motion-Heavy.

### 4.1. Creative Home (`/creative/home`)
-   **Hero:** Visual, perhaps kinetic typography or 3D element.
-   **Content:** Masonry or Horizontal Scroll of creative work.
-   **Interactivity:** Hover effects play video previews.

### 4.2. Creative logic
-   **Focus:** "Show, Don't Tell". Minimal text, maximum visual impact.
-   **Navigation:** Fluid transitions between items.

---

## 5. The "Dthrills" Chatbot Flow
**State:** Persistent across all pages.

### Logic
1.  **Initialization:**
    -   If URL contains `/ba/`: Set Persona = "Professional Assistant".
    -   If URL contains `/creative/`: Set Persona = "Design Guide".
2.  **User Interaction:**
    -   *User:* "Tell me about this project."
    -   *Bot (BA Mode):* Explains technical challenge and ROI.
    -   *Bot (Creative Mode):* Explains inspiration and design tools.
3.  **Conversion (The "Closer"):**
    -   If user asks about availability or rates -> Bot initiates Contact Protocol (Email/Calendly).

---

## 6. Sitemaps
### BA Context
-   `/` (Splash)
-   `/ba/home`
-   `/ba/project/[slug]`
-   `/ba/about` (Optional: Professional Bio)

### Creative Context
-   `/` (Splash)
-   `/creative/home`
-   `/creative/gallery`
-   `/creative/playground` (Optional: Experiments)
