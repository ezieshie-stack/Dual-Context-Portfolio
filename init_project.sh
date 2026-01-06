#!/bin/bash

# Vibe Coding Project Initialization Script
# Based on the Master Context Prompt & PDD v1

echo "🚀 Initializing Vibe Coding Project..."

# 1. Check for Node/NPM
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v18+) to proceed."
    exit 1
fi

echo "✅ Node.js found."

# 2. Create Next.js App
echo "📦 Scaffolding Next.js App (TypeScript, Tailwind, App Router)..."
# We use npx here assuming the user has it. If not, they must install globally.
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm \
  --no-git

# 3. Install Dependencies
echo "📚 Installing Design & Motion Dependencies..."
npm install framer-motion lucide-react clsx tailwind-merge

# 4. Create Folder Structure (Contextual Architecture)
echo "🏗️  Creating Directory Structure..."

# Components
mkdir -p src/components/ui
mkdir -p src/components/ba
mkdir -p src/components/creative
mkdir -p src/components/shared
mkdir -p src/components/simulators

# Routes (Route Groups for Contexts)
mkdir -p src/app/\(ba\)/ba/home
mkdir -p src/app/\(ba\)/ba/about
mkdir -p src/app/\(ba\)/ba/project
mkdir -p src/app/\(creative\)/creative/home
mkdir -p src/app/\(creative\)/creative/project

# Libs
mkdir -p src/lib

# 5. Create Placeholder Files (to lock the structure)
touch src/lib/ba-content.ts
touch src/lib/creative-content.ts
touch src/components/shared/Chatbot.tsx
touch src/components/shared/ContextSwitcher.tsx
touch src/components/simulators/SimulatorBlock.tsx

echo "==== PROJECT INITIALIZATION COMPLETE ===="
echo "To start your server:"
echo "  npm run dev"
echo "========================================="
