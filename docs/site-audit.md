# Site Audit: Homepage Repositioning (Automation Agency → AI Lead Qualification + Voice Agent Platform)
## 1) Homepage entry file(s)
- `client/src/main.tsx` mounts React app.
- `client/src/App.tsx` defines router and maps `/` to `Home`.
- `client/src/pages/Home.tsx` assembles homepage sections in render order.

## 2) Hero component location
- `client/src/components/sections/HeroSection.tsx`

## 3) Navigation component location
- `client/src/components/Navigation.tsx`

## 4) Homepage section hierarchy in order
From `client/src/pages/Home.tsx`:
1. Fixed under-development banner
2. `Navigation`
3. `HeroSection`
4. `ProblemSolutionSection`
5. `ServicesSection`
6. `HowItWorksSection`
7. `ValueBasedROICalculator`
8. `WorkflowQuestionnaireSection`
9. `PricingSection`
10. `TechnologyStackSection`
11. `UseCasesSection`
12. `BenefitsSection`
13. `TestimonialsSection`
14. `AboutSection`
15. `FAQSection`
16. `OperationalScanSection`
17. `CTASection`
18. `Footer`

## 5) Reusable UI components
Primary reusable UI primitives live in `client/src/components/ui/`:
- Inputs/forms: `input.tsx`, `textarea.tsx`, `checkbox.tsx`, `label.tsx`, `form.tsx`, `select.tsx`
- Action/display: `button.tsx`, `card.tsx`, `badge.tsx`, `dialog.tsx`, `accordion.tsx`, `tabs.tsx`, `tooltip.tsx`
- Layout/navigation/system: `sheet.tsx`, `sidebar.tsx`, `navigation-menu.tsx`, `table.tsx`, `skeleton.tsx`, `sonner.tsx`
Other reusable cross-section components:
- `client/src/components/Navigation.tsx`
- `client/src/components/Footer.tsx`
- `client/src/components/ROIChart.tsx`

## 6) Pricing section location
- `client/src/components/sections/PricingSection.tsx`

## 7) Testimonials section location
- `client/src/components/sections/TestimonialsSection.tsx`

## 8) Contact/workflow form location
- Primary contact form: `client/src/components/sections/CTASection.tsx` (`id="contact"`)
- Multi-step workflow qualification form: `client/src/components/sections/WorkflowQuestionnaireSection.tsx` (`id="workflow-questionnaire"`)
- ROI pre-qualification calculator feeding workflow context: `client/src/components/sections/ValueBasedROICalculator.tsx` (`id="roi-calculator"`)

## 9) Technology stack section location
- `client/src/components/sections/TechnologyStackSection.tsx` (`id="technology"`)

## 10) Components that should remain
Keep with minimal structural changes:
- `Navigation`, `HeroSection` (keep visual quality/animation shell, update messaging)
- `HowItWorksSection` (clear process storytelling)
- `WorkflowQuestionnaireSection` (core lead qualification engine)
- `ValueBasedROICalculator` (high-intent qualification + value framing)
- `PricingSection` (supports conversion if repositioned around lead/voice outcomes)
- `CTASection` and `Footer` (primary conversion and trust endpoints)
- `UseCasesSection` (already includes Voice Agents use case; strong fit)

## 11) Components that should be reworked
Highest-priority messaging rework:
- `HeroSection`: currently generic automation positioning (“We Automate the Boring Stuff”); should become AI lead qualification + voice agent promise.
- `ServicesSection`: currently broad service menu; should focus on lead capture, qualification logic, voice agent workflows, CRM handoff.
- `TechnologyStackSection`: currently broad integration catalog; should shift toward lead funnel + call orchestration + CRM + reporting stack framing.
- `TestimonialsSection`: currently placeholder-heavy; should become proof/results-oriented (or reframed as pilot outcomes while social proof matures).
- `FAQSection`: currently n8n-centric; should answer lead quality, call compliance, handoff logic, escalation, and deployment concerns.
- `CTASection`: copy should center “book demo / launch voice qualification pilot” rather than generic automation consultation.
- `AboutSection`: tighten narrative around lead qualification specialization instead of general automation consultancy.

## 12) Components that should be moved lower or hidden
Recommended to move lower:
- `OperationalScanSection` (currently late-stage diagnostic framing; better as optional deeper-detail section near bottom)
- `AboutSection` (keep below proof + offer sections)
- `TechnologyStackSection` (buyers care about outcomes first, stack second)
Candidate to hide or collapse in first pass:
- One of `ProblemSolutionSection` or `OperationalScanSection` (both communicate similar pain/solution framing)
- Tool-logo band in `TestimonialsSection` (if social proof remains sparse, avoid visual noise)

## 13) Sections that feel redundant
- `ProblemSolutionSection` and `OperationalScanSection` overlap in “manual inefficiency → automated improvement” narrative.
- `BenefitsSection` and portions of `ServicesSection` overlap on value statements without enough differentiation.
- `CTASection` and `WorkflowQuestionnaireSection` are both conversion pathways; both can remain, but intent split should be explicit (quick consult vs guided qualification).

## 14) Recommendations for repositioning to AI lead qualification + voice agent platform
Recommended narrative flow:
1. Hero: “AI voice + workflow agents qualify leads instantly, 24/7.”
2. Proof/value: show qualification speed, conversion lift, no-show reduction, cost per qualified lead improvements.
3. Productized process: ingest lead → qualify via voice/chat → score/routings → CRM handoff → human escalation.
4. Vertical use cases with measurable outcomes.
5. Qualification tools (ROI calculator + workflow questionnaire).
6. Pricing/packages mapped to lead volume + channels.
7. Final CTA and trust/footer.

Specific repositioning guidance:
- Lead with business outcomes (qualified pipeline, response time, close-rate lift), not generic automation claims.
- Reframe “services” into platform-like capabilities:
  - Lead capture orchestration
  - Voice qualification agent
  - Scoring and routing engine
  - CRM + calendar + SMS/email handoff
  - Human-in-the-loop exception handling
- Make Voice Agent use case a first-class section (not just one tile).
- Align all CTA labels to the new intent: “Get a Lead Qualification Demo”, “Launch Voice Agent Pilot”, “See Qualification Flow”.
- Keep existing dark theme, gradients, motion, and layout rhythm while swapping copy hierarchy and section emphasis.

## Notes / uncertainty
- `Navigation` “Process” links to `#process`, while other areas reference `#how-it-works`; anchor consistency should be verified during implementation.
- There is a pre-existing untracked file at repo root (`site-audit.md`) that is separate from this new audit file and was not modified.
