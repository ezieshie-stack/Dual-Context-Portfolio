# Security Checklist

## 1. Application Security
-   [ ] **Security Headers:**
    -   Configure `next.config.js` to include:
        -   `X-DNS-Prefetch-Control`
        -   `X-XSS-Protection`
        -   `X-Frame-Options: DENY` (Prevent clickjacking)
        -   `X-Content-Type-Options: nosniff`
        -   `Referrer-Policy`
        -   `Content-Security-Policy` (CSP)
-   [ ] **Dependency Management:**
    -   Run `npm audit` before every deployment.
    -   Use `dependabot` or similar to track vulnerabilities.
-   [ ] **Input Validation:**
    -   Validate all form inputs (if any) using Zod or equivalent on both client and server.

## 2. Content & Data
-   [ ] **Sanitization:**
    -   Ensure `next-mdx-remote` or chosen MDX loader properly sanitizes HTML.
-   [ ] **Secrets Management:**
    -   **NEVER** commit `.env` files. Add `.env*.local` to `.gitignore`.
    -   Store API keys (if using OpenAI later) purely in Vercel Environment Variables.

## 3. Infrastructure (Vercel)
-   [ ] **DDoS Protection:** Vercel provides this out of the box.
-   [ ] **Access Control:**
    -   Enable Vercel Authentication for Deployment Previews (prevent public access to WIP).

## 4. Privacy
-   [ ] **Cookie Consent:** If using Analytics, ensure a simple Banner is present or use a privacy-first analytics tool (PostHog/Vercel Analytics) that doesn't require cookies.
