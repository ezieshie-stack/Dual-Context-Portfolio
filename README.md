# David Ezieshi | Dual-Context Portfolio

A **role-aware portfolio platform** that dynamically adapts based on visitor intent—serving both my **Business Analyst** work and my **Creative/Photography** brand from a single codebase.

🔗 **Live:** [davidezieshi.vercel.app](https://davidezieshi.vercel.app)

---

## 🎯 Goals

1. **Unified Portfolio**: Consolidate two distinct professional identities (Business Analyst + Creative) into one cohesive platform
2. **Modern Stack Mastery**: Build a production-grade Next.js 14+ application with TypeScript, Tailwind CSS, and serverless APIs
3. **AI Integration**: Implement an intelligent chatbot that understands context and responds with persona-aware answers
4. **Premium UX**: Create a visually stunning, responsive experience with smooth animations and glassmorphism effects

---

## 🚧 Challenges Overcome

| Challenge | Solution |
|-----------|----------|
| **Dual Identity Routing** | Created middleware-based smart routing that serves different homepages based on URL path |
| **AI Persona System** | Built intent-to-persona mapping with customizable response styles per visitor type |
| **Performance vs Aesthetics** | Balanced heavy ambient effects (glow, orbs, flow lines) with GPU-accelerated CSS animations |
| **Mobile Responsiveness** | Implemented adaptive layouts and z-index management for mobile menu overlaps |
| **Rate Limiting** | Implemented in-memory LRU cache rate limiter for API protection |

---

## ✨ Key Features

### 🎭 Smart Routing
- `/` → Business Analyst portfolio
- `/Thrillsmotions` → Creative studio portfolio
- Middleware-based routing with case-insensitive URL handling

### 🤖 AI-Powered Chatbot ("Dthrills")
- OpenAI GPT-4o-mini integration with streaming responses
- **BA Mode**: Technical personas (Hiring Manager, Data Analyst, Developer)
- **Creative Mode**: Client personas (Creative Director, Brand Manager, Small Business Owner)
- Intent classification and depth selection for tailored responses

### 🎨 Dual-Themed UI
- **BA Theme**: Professional dark mode with warm gradients and ambient orbs
- **Creative Theme**: Minimal black with violet accents and smooth scroll

### 📱 Responsive Design
- Mobile-first approach with adaptive headers and menus
- Glassmorphism effects with `backdrop-blur`
- Framer Motion animations with scroll-linked effects

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion, CSS Keyframes |
| **AI** | OpenAI API (GPT-4o-mini), Streaming Responses |
| **Backend** | Next.js API Routes, Zod Validation, LRU Rate Limiting |
| **Deployment** | Vercel (Serverless, Middleware, Edge) |
| **Fonts** | Geist Sans, Geist Mono |

---

## 📂 Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page (redirects to /ba/home)
│   ├── ba/                      # Business Analyst section
│   │   ├── home/page.tsx
│   │   ├── project/[slug]/
│   │   ├── about/
│   │   └── contact/
│   ├── creative/                # Creative/Photography section
│   │   ├── home/page.tsx
│   │   ├── portfolio/
│   │   ├── gallery/[category]/
│   │   └── contact/
│   └── api/
│       ├── chat/route.ts        # AI chatbot endpoint
│       └── contact/route.ts     # Contact form handler
├── components/
│   ├── ba/                      # BA-specific components
│   ├── creative/                # Creative-specific components
│   ├── ambient/                 # Glow effects, orbs, flow lines
│   └── shared/                  # Chatbot, common UI
├── lib/
│   ├── personas.ts              # AI persona configuration
│   ├── portfolioData.ts         # Project data for AI context
│   └── logging/                 # Rate limiting, logging
├── middleware.ts                # Smart URL routing
└── data/                        # JSON content files
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dual-context-portfolio.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY

# Run development server
npm run dev
```

---

## 📊 Outcomes

- **Live Production Site**: Deployed on Vercel with automatic CI/CD
- **AI Chatbot**: Functional conversational interface with persona awareness
- **Dual Branding**: Seamless switching between professional identities
- **Performance Optimized**: CSS animations over JS for 60fps on mobile

---

## 📜 License

This project is open source under the MIT License.

---

## 👤 Author

**David Ezieshi**
- 🔗 [LinkedIn](https://linkedin.com/in/david-ezieshi)
- 📧 Ezieshie@gmail.com
- 📸 [@_dthrills](https://instagram.com/_dthrills)
