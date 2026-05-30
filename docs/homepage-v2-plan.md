# Homepage V2 Refactor Plan
## Positioning target
Primary message: **“AI agents that turn leads into appointments.”**
This refactor keeps the current visual style (dark theme, gradients, motion, responsive layout) and repositions the homepage from general automation services to lead qualification + voice agent outcomes.

## 1) Current homepage section order
From `client/src/pages/Home.tsx`:
1. Under-construction banner (fixed top)
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

## 2) Proposed homepage section order
1. Under-construction banner (KEEP for now)
2. `Navigation` (reworked labels/anchors)
3. `HeroSection` (new lead-agent headline + CTAs)
4. `UseCasesSection` (move up; lead with outcome examples, prioritize Voice Agents card)
5. `HowItWorksSection` (rework to lead-to-appointment flow)
6. `ServicesSection` (rework into capability blocks: capture, qualify, route, book)
7. `ProblemSolutionSection` (move lower; tighten around lead leakage vs booked appointments)
8. `ValueBasedROICalculator` (keep, copy reframe toward appointment pipeline value)
9. `WorkflowQuestionnaireSection` (keep as qualification/demo intake)
10. `PricingSection` (rework around lead volume + qualification scope)
11. `TestimonialsSection` (rework; keep card structure, replace placeholder narrative)
12. `FAQSection` (rework to lead-agent questions)
13. `CTASection` (rework to “book lead-agent demo”)
14. `TechnologyStackSection` (move lower; keep as trust detail)
15. `AboutSection` (move lower; concise specialization proof)
16. `OperationalScanSection` (hide in V2 initial pass)
17. `BenefitsSection` (hide in V2 initial pass due to overlap)
18. `Footer` (keep; align link anchors/copy)

## 3) KEEP / REWORK / MOVE / HIDE decisions for every section
1. Under-construction banner — **KEEP** (copy optional)
2. Navigation — **REWORK + MOVE (links reflect new section order)**
3. HeroSection — **REWORK**
4. ProblemSolutionSection — **REWORK + MOVE LOWER**
5. ServicesSection — **REWORK**
6. HowItWorksSection — **REWORK**
7. ValueBasedROICalculator — **KEEP + LIGHT REWORK (copy/labels)**
8. WorkflowQuestionnaireSection — **KEEP + LIGHT REWORK (copy/prompts)**
9. PricingSection — **REWORK**
10. TechnologyStackSection — **MOVE LOWER + REWORK**
11. UseCasesSection — **MOVE HIGHER + REWORK (voice-first emphasis)**
12. BenefitsSection — **HIDE** (phase 1)
13. TestimonialsSection — **REWORK**
14. AboutSection — **MOVE LOWER + REWORK**
15. FAQSection — **REWORK**
16. OperationalScanSection — **HIDE** (phase 1)
17. CTASection — **REWORK**
18. Footer — **KEEP + LIGHT REWORK (links/copy consistency)**

## 4) Exact file paths to edit later
Primary composition/order:
- `client/src/pages/Home.tsx`

Navigation + anchor behavior:
- `client/src/components/Navigation.tsx`
- `client/src/components/Footer.tsx`

Core section copy/structure updates:
- `client/src/components/sections/HeroSection.tsx`
- `client/src/components/sections/UseCasesSection.tsx`
- `client/src/components/sections/HowItWorksSection.tsx`
- `client/src/components/sections/ServicesSection.tsx`
- `client/src/components/sections/ProblemSolutionSection.tsx`
- `client/src/components/sections/ValueBasedROICalculator.tsx`
- `client/src/components/sections/WorkflowQuestionnaireSection.tsx`
- `client/src/components/sections/PricingSection.tsx`
- `client/src/components/sections/TestimonialsSection.tsx`
- `client/src/components/sections/FAQSection.tsx`
- `client/src/components/sections/CTASection.tsx`
- `client/src/components/sections/TechnologyStackSection.tsx`
- `client/src/components/sections/AboutSection.tsx`

Sections to remove from render order (not delete files):
- `client/src/components/sections/BenefitsSection.tsx`
- `client/src/components/sections/OperationalScanSection.tsx`

## 5) Anchor/link cleanup plan (#process vs #how-it-works)
Canonical anchor strategy:
- Use **`#how-it-works`** as canonical anchor for process section.
- Keep temporary compatibility by accepting old `#process` links during transition if needed.

Planned changes:
1. Update `HowItWorksSection` root section `id` from `process` to `how-it-works`.
2. Update `Navigation` links:
   - `Process` item → `href: '#how-it-works'`
   - Review other labels to match new IA and hidden sections.
3. Update `HeroSection` secondary CTA to scroll to `#how-it-works` (already points there; verify target exists after id change).
4. Update `Footer` “How It Works” link to `#how-it-works` (currently already this; verify final consistency).
5. After refactor, run a click-through check for all in-page links (`Navigation`, Hero CTAs, Footer links, pricing buttons).

## 6) Risk notes
- **Anchor regressions:** changing section ids can break active-state highlighting and smooth-scroll behavior if not updated everywhere.
- **Section hide side-effects:** removing sections from `Home.tsx` order may leave stale nav/footer links.
- **Content density risk:** moving too many conversion sections high can overwhelm above-the-fold experience on mobile.
- **Conversion ambiguity:** two flows (`ROI calculator` and `contact/demo form`) must have clear intent separation.
- **Data expectation mismatch:** copy updates in calculator/questionnaire must stay aligned with existing calculation logic and backend payload fields.
- **Visual consistency risk:** copy length changes may overflow card layouts; requires responsive QA at multiple breakpoints.

## 7) Testing commands to run after implementation
From repo root:
1. Type check:
   - `npm run check`
2. Unit/integration tests:
   - `npm run test`
3. Production build validation:
   - `npm run build`
4. Manual runtime verification:
   - `npm run dev`
   - Then verify homepage section order, nav/footer anchor behavior, Hero/CTA scroll targets, and hidden-section link removal.
