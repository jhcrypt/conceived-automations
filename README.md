# Conceived Automations

> **AI-powered business automation platform.** A full-stack web app that generates custom n8n workflow automation plans for businesses through a guided two-stage questionnaire — then delivers a shareable, branded proposal.

[![Stack](https://img.shields.io/badge/Stack-React%20%2F%20TypeScript%20%2F%20Express-3178C6?style=flat-square)]()
[![DB](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Drizzle-336791?style=flat-square)]()
[![Automation](https://img.shields.io/badge/Workflows-n8n-EA4B71?style=flat-square)]()
[![Styling](https://img.shields.io/badge/UI-Tailwind%20CSS-38B2AC?style=flat-square)]()

---

## Table of Contents

- [What It Does](#what-it-does)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [n8n Workflows](#n8n-workflows)
- [Database](#database)
- [Roadmap](#roadmap)
- [Contact](#contact)

---

## What It Does

Conceived Automations is a **lead generation and workflow proposal platform** for a business automation agency. 

A prospect visits the site, answers a two-stage questionnaire about their business and pain points, and receives a **custom AI-generated automation workflow proposal** — complete with a shareable link they can forward to their team. The agency receives the lead and can follow up with a magic link to deliver a personalized onboarding.

---

## How It Works

```
1. Prospect lands on the homepage
2. Completes Stage 1 questionnaire — business type, team size, pain points
3. Completes Stage 2 questionnaire — specific tools, processes, goals
4. AI generates a tailored automation workflow plan
5. Proposal renders as a branded, shareable page
6. Lead is captured in the database
7. Agency follows up via magic link email
```

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| **Frontend** | React + TypeScript + Vite | Client lives in `/client` |
| **Backend** | Express.js + TypeScript | Server lives in `/server` |
| **Database** | PostgreSQL | ORM via Drizzle |
| **ORM / Migrations** | Drizzle ORM | Schema in `/drizzle` |
| **Automation Engine** | n8n | Workflow JSON exports in `/n8n-workflows` |
| **Styling** | Tailwind CSS | Dark theme, glassmorphism, animations |
| **Formatting** | Prettier | Config in `.prettierrc` |
| **Package Manager** | pnpm | Use pnpm, not npm or yarn |
| **UI Components** | shadcn/ui | Config in `components.json` |

---

## Project Structure

```
conceived-automations/
│
├── 📁 client/                          # React frontend
│   └── src/
│       ├── _core/hooks/                # Core shared hooks
│       ├── components/                 # Reusable UI components
│       ├── contexts/                   # React context providers
│       ├── hooks/                      # Feature hooks
│       ├── lib/                        # Utility functions
│       ├── pages/                      # Page components (see Pages section)
│       ├── App.tsx                     # Root app + router
│       ├── const.ts                    # Global constants
│       ├── index.css                   # Global styles
│       └── main.tsx                    # Vite entry point
│
├── 📁 server/                          # Express backend
│   ├── _core/                          # Core server utilities
│   ├── db.ts                           # Database connection (Drizzle)
│   ├── emailService.ts                 # Email delivery service
│   ├── index.ts                        # Server entry point
│   ├── promptGenerator.ts              # AI workflow prompt generator
│   ├── routers.ts                      # API route definitions
│   ├── storage.ts                      # Data access layer
│   ├── workflowGenerator.ts            # AI workflow plan generator
│   │
│   └── 📄 Tests
│       ├── auth.logout.test.ts
│       ├── autoPopulation.test.ts
│       ├── dynamicFeatures.test.ts
│       ├── enhancementFeatures.test.ts
│       ├── hoursCalculation.test.ts
│       ├── routers.test.ts
│       ├── twoStageQuestionnaire.test.ts
│       └── workflow-preview.test.ts
│
├── 📁 drizzle/                         # DB migrations and schema
│
├── 📁 email-templates/                 # Transactional email HTML templates
│
├── 📁 n8n-workflows/                   # Exported n8n workflow JSON files
│
├── 📁 patches/                         # Dependency patches
│
├── 📁 shared/                          # Shared types between client + server
│
├── 📄 package.json                     # Workspace root — scripts + dependencies
├── 📄 pnpm-lock.yaml                   # Lockfile — use pnpm
├── 📄 tsconfig.json                    # TypeScript config
├── 📄 components.json                  # shadcn/ui config
├── 📄 .prettierrc                      # Prettier formatting rules
├── 📄 .prettierignore                  # Prettier ignore list
│
├── 📄 README.md                        # This file
├── 📄 NEXT_STEPS.md                    # Roadmap and priority features
├── 📄 WORKFLOW_SYSTEM_STATUS.md        # Current workflow system status
└── 📄 todo.md                          # Development task checklist
```

---

## Pages & Routes

| Page | File | Description |
|---|---|---|
| `/` | `Home.tsx` | Marketing homepage — hero, services, pricing, how it works, FAQ |
| `/dashboard` | `Dashboard.tsx` | Internal lead/submission management dashboard |
| `/workflow-preview` | `WorkflowPreview.tsx` | Generated automation proposal view |
| `/shared/:id` | `SharedResults.tsx` | Public shareable proposal link |
| `/components` | `ComponentShowcase.tsx` | Dev — component library showcase |
| `*` | `NotFound.tsx` | 404 page |

---

## API Overview

All routes defined in `server/routers.ts`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/questionnaire` | Submit Stage 1 + Stage 2 questionnaire responses |
| `POST` | `/api/workflow/generate` | Generate AI workflow proposal from questionnaire data |
| `GET` | `/api/workflow/:id` | Retrieve a generated workflow proposal |
| `GET` | `/api/shared/:shareId` | Get a publicly shared proposal by share ID |
| `POST` | `/api/magic-link` | Send magic link email to prospect |
| `GET` | `/api/submissions` | List all lead submissions (admin) |

> See `server/routers.ts` for full route definitions and middleware.

---

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/conceived_automations

# Email (choose one)
SENDGRID_API_KEY=your_sendgrid_key
# or
AWS_SES_ACCESS_KEY=your_aws_key
AWS_SES_SECRET_KEY=your_aws_secret
AWS_SES_REGION=us-east-1

# AI / LLM (for workflow generation)
OPENAI_API_KEY=your_openai_key
# or configure local model endpoint

# App
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
```

---

## Local Development

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- PostgreSQL (local or hosted)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/jhcrypt/conceived-automations.git
cd conceived-automations

# 2. Install dependencies (use pnpm, not npm)
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Run database migrations
pnpm db:migrate

# 5. Start development server (client + server concurrently)
pnpm dev
```

### Individual processes

```bash
# Frontend only (Vite dev server)
pnpm dev:client

# Backend only (Express)
pnpm dev:server

# Run tests
pnpm test

# Format code
pnpm format

# Build for production
pnpm build
```

---

## n8n Workflows

The `/n8n-workflows` directory contains exportable JSON workflow files for n8n.

### Importing a workflow into n8n

1. Open your n8n instance
2. Go to **Workflows** → **Import from file**
3. Select the `.json` file from `/n8n-workflows`
4. Configure credentials and webhook URLs for your environment
5. Activate the workflow

### Available workflows

| File | Purpose |
|---|---|
| (see `/n8n-workflows` directory) | AI lead processing, magic link delivery, nurture sequences, CRM sync |

---

## Database

Uses **PostgreSQL** with **Drizzle ORM**.

### Key tables

| Table | Purpose |
|---|---|
| `submissions` | Questionnaire responses from prospects |
| `workflows` | Generated automation proposals |
| `shared_links` | Public share tokens for proposals |
| `leads` | Captured prospect contact info |

### Migration commands

```bash
# Generate migration from schema changes
pnpm db:generate

# Run pending migrations
pnpm db:migrate

# Open Drizzle Studio (DB browser)
pnpm db:studio
```

---

## Roadmap

Priority items from `NEXT_STEPS.md`:

### 🔴 Priority 1 — Critical
- [ ] **Email automation system** — SendGrid/SES integration, magic link delivery, nurture sequences (Day 1, 3, 7, 14)
- [ ] **Admin dashboard** — submissions list, lead quality filters, conversion funnel metrics

### 🟡 Priority 2 — Important
- [ ] **Analytics integration** — track questionnaire completion rates, proposal views, conversion
- [ ] **CRM integration** — push leads to HubSpot/Salesforce automatically
- [ ] **Proposal PDF export** — downloadable branded PDF from the workflow preview page

### 🟢 Priority 3 — Nice to Have
- [ ] **A/B testing** — test different questionnaire flows and hero copy
- [ ] **Calendar booking** — embed Calendly/Cal.com on the proposal page
- [ ] **White-label** — allow agency clients to have their own branded portal

---

## Contact

| | |
|---|---|
| **Repo** | https://github.com/jhcrypt/conceived-automations |
| **Built with** | React · TypeScript · Express · Drizzle · PostgreSQL · n8n |

---

<div align="center">
  <strong>Conceived Automations · AI-powered workflow automation for modern businesses</strong>
</div>
