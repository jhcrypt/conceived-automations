Conceived Automations 🤖
AI automation agency — full-stack React/TypeScript SPA with Express backend
🌐 Live: conceived-automations.com

Overview
Production website for an AI automation agency serving e-commerce, real estate, healthcare, and marketing verticals. Features a multi-step ROI Calculator, Vapi AI voice chatbot, interactive questionnaire system, and full Express/tRPC/MySQL backend. Built and optimized to Lighthouse 96.

Tech Stack
LayerTechnologyFront-EndReact, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI, Framer MotionBack-EndExpress.js, tRPC, Node.jsDatabaseMySQL via Drizzle ORMFile StorageAWS S3AI / VoiceVapi AI chatbot, Supabase integrationDevOpsRender.com, GitHub CI/CD, pnpm

Architecture
┌─────────────────────────────────────────────────────────┐
│              conceived-automations.com                   │
│         React + TypeScript + Vite SPA                   │
│   shadcn/ui · Radix UI · Framer Motion · Tailwind       │
└────────────────────┬────────────────────────────────────┘
                     │ tRPC (type-safe API)
        ┌────────────▼────────────────┐
        │      Express.js Server       │
        │      tRPC Router Layer       │
        └──────┬──────────────┬───────┘
               │              │
    ┌──────────▼───┐    ┌─────▼──────┐
    │  MySQL via   │    │   AWS S3   │
    │  Drizzle ORM │    │  Storage   │
    └──────────────┘    └────────────┘
               │
    ┌──────────▼───────────┐
    │  Vapi AI Voice Agent  │
    │  Supabase Integration │
    └──────────────────────┘

Key Features
ROI Calculator

5-step interactive calculator with stage-based projection caps
Salary range inputs, automation savings modeling, free consultation CTA
Built with useState/useEffect — results passed via React Context (ROIContext) into the workflow questionnaire, resolving sessionStorage timing race conditions

Floating AI Chatbot

FloatingChatbot.tsx connected to Vapi voice AI and Supabase
Persistent across navigation, mobile-responsive

Performance Optimization

Vite manualChunks splitting: react-vendor, motion, radix, trpc, charts, icons
WebP hero image: 5.71MB → 165KB (97% compression)
Non-blocking Google Font loading via font-display: swap
Mobile parallax disabled
Lighthouse: 96 desktop

Backend

tRPC provides end-to-end type safety between React frontend and Express server
Drizzle ORM with MySQL — typed schema, migration-ready structure
AWS S3 isolated to server bundle only (debugged and fixed accidental client-bundle inclusion in Vite config)


Folder Structure
conceived-automations/
├── client/          # React + TypeScript frontend
├── server/          # Express + tRPC backend
├── shared/          # Shared types
├── drizzle/         # DB migrations
├── n8n-workflows/   # Automation workflow configs
├── email-templates/ # Transactional email templates
└── drizzle.config.ts

Notable Engineering Decisions

tRPC over REST — full type safety from DB schema to UI component, zero manual API typing
React Context over sessionStorage — fixed race condition where questionnaire loaded before calculator state was available
Server-side AWS SDK isolation — Vite config fix that prevented AWS SDK from bundling into the client, which caused a critical production outage that was diagnosed and resolved


Status
🟢 Live in production — 128 commits, actively maintained

Contact
Arturo Zenon — conceived-automations.com
