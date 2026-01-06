# Design Document

## 1. Design Philosophy
**Core Vibe:** "Hybrid: Editorial + Product."
Combines the readability and authority of an editorial layout (like The New York Times or Stripe Docs) with the interactivity and utility of a product dashboard (like Linear or Notion). This reinforces the "Business Analyst" persona—someone who can communicate complexity clearly.

## 2. Visual Identity System
### 2.1. Color Palette
**Base (Global):**
-   **Background:** `white` (#ffffff) or `off-white` (#fbfbfb).
-   **Text (Primary):** `Deep Charcoal` (#1a1a1a) - High contrast, compliant.
-   **Text (Secondary):** `Slate Gray` (#64748b) - For metadata.
-   **Border/Divider:** `Mist` (#e2e8f0) - Subtle structure.
-   **Accent (Interactive):** `Ethereal Blue` (#2563eb) - Used for primary actions (Buttons, Links).
-   **Simulator Background:** `Soft Gray` (#f8fafc) - Distinguishes the "Product" blocks from the "Editorial" flow.

**Context Tweaks:**
-   **BA Mode:** High contrast, crisp lines, "Paper" feel.
-   **Creative Mode:** Slightly warmer/softer, potentially dark mode options.

### 2.2. Typography
**Primary Font (Headings):** *Geist Sans* (or *Inter*).
-   Weights: 600 (SemiBold) for headers.
-   Tracking: Tight (-0.02em) for a modern, technical feel.

**Secondary Font (Body):** *Geist Sans*.
-   Weights: 400 (Regular).
-   Line Height: 1.6 (Editorial standard).

**Monospace (Code/Data):** *Geist Mono*.
-   Usage: Metric numbers, code snippets, graph axes, simulator outputs.

## 3. Component Guidelines
### 3.1. Layout & Grid
-   **System:** 12-column grid.
-   **Container:** Max-width 1200px.
-   **Spacing:** 8px baseline grid. (e.g., `p-4` = 16px, `m-8` = 32px).

### 3.2. Cards (The "Hybrid" Look)
-   **Style:** Clean white background, 1px subtle border (#e2e8f0).
-   **Shadow:** None by default. Small shadow (`shadow-sm`) on hover.
-   **Interaction:** Whole card clickable.
-   **Internal Layout:** Use Grid inside cards for alignment.

### 3.3. Simulators (The "Modular Blocks")
-   **Look:** Distinct "Product" aesthetic. Slightly inset or boxed.
-   **Background:** `bg-slate-50` or `bg-gray-50`.
-   **Border:** `border border-gray-200` to separate from editorial text.
-   **Controls:** Native-feeling sliders and toggles with direct numeric feedback.
-   **Placement:** Must be distinct modules, not inline with text.

## 4. Motion System (As defined in PDD)
-   **Global Speed:** Fast. 200ms - 300ms.
-   **Easing:** `ease-out`.
-   **Stagger:** 50ms delay between list items.

## 5. Accessibility
-   **Focus States:** Clear blue ring (`ring-2`) on keyboard focus.
-   **Contrast:** All text meets WCAG AA.
-   **ARIA:** Proper labels for all interactive non-text elements (sliders, toggles).
