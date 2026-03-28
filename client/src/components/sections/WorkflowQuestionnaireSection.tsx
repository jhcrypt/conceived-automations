import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { trpc } from '@/lib/trpc';
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useROI } from '@/contexts/ROIContext';

const BUSINESS_TYPES = [
  'E-commerce',
  'SaaS',
  'Marketing Agency',
  'Consulting',
  'Real Estate',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Other',
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
];

const PROCESS_OPTIONS = [
  'Lead generation and qualification',
  'Customer onboarding',
  'Order processing and fulfillment',
  'Invoice and payment processing',
  'Email marketing campaigns',
  'Social media posting',
  'Data entry and migration',
  'Report generation',
  'Appointment scheduling',
  'Customer support ticketing',
];

const PAIN_POINT_OPTIONS = [
  'Too much manual data entry',
  'Frequent errors and mistakes',
  'Slow response times',
  'Can\'t scale with current process',
  'Team spending too much time on repetitive tasks',
  'Missing follow-ups and deadlines',
  'Data scattered across multiple tools',
  'Inconsistent process execution',
];

const DESIRED_OUTCOME_OPTIONS = [
  'Save 10+ hours per week',
  'Reduce errors by 80%+',
  'Respond to customers instantly',
  'Scale without hiring more staff',
  'Automate repetitive tasks completely',
  'Centralize data in one place',
  'Never miss a follow-up',
  'Improve team productivity',
];

const HOURS_OPTIONS = [
  { value: 5, label: '1-5 hours/week' },
  { value: 10, label: '5-10 hours/week' },
  { value: 20, label: '10-20 hours/week' },
  { value: 30, label: '20-30 hours/week' },
  { value: 40, label: '30+ hours/week' },
];

const COMMON_TOOLS = [
  { id: 'gmail', name: 'Gmail', category: 'Email' },
  { id: 'outlook', name: 'Outlook', category: 'Email' },
  { id: 'slack', name: 'Slack', category: 'Communication' },
  { id: 'teams', name: 'Microsoft Teams', category: 'Communication' },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM' },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM' },
  { id: 'shopify', name: 'Shopify', category: 'E-commerce' },
  { id: 'woocommerce', name: 'WooCommerce', category: 'E-commerce' },
  { id: 'stripe', name: 'Stripe', category: 'Payment' },
  { id: 'paypal', name: 'PayPal', category: 'Payment' },
  { id: 'google-sheets', name: 'Google Sheets', category: 'Spreadsheet' },
  { id: 'excel', name: 'Excel', category: 'Spreadsheet' },
  { id: 'airtable', name: 'Airtable', category: 'Database' },
  { id: 'notion', name: 'Notion', category: 'Database' },
  { id: 'asana', name: 'Asana', category: 'Project Management' },
  { id: 'trello', name: 'Trello', category: 'Project Management' },
  { id: 'zapier', name: 'Zapier', category: 'Automation' },
  { id: 'make', name: 'Make (Integromat)', category: 'Automation' },
];

interface FormData {
  businessType: string;
  industry: string;
  companySize: string;
  processDescription: string;
  painPoints: string;
  currentTools: string[];
  desiredOutcome: string;
  estimatedHoursPerWeek: number;
  email: string;
  name: string;
}

// Helper function to get example text based on industry
const getExampleText = (industry: string | undefined, field: string): string => {
  const examples: Record<string, Record<string, string>> = {
    ecommerce: {
      processDescription: "Order fulfillment from Shopify to shipping carrier, including inventory updates and customer notifications",
      painPoints: "Manual data entry takes 3 hours daily, frequent shipping errors, customers complain about delayed notifications",
      desiredOutcome: "Automatically process orders within 5 minutes, sync inventory in real-time, send tracking info instantly",
    },
    saas: {
      processDescription: "User onboarding sequence from trial signup to product activation and first value moment",
      painPoints: "Low activation rates, manual follow-ups are inconsistent, can't personalize at scale",
      desiredOutcome: "Automated onboarding emails based on user behavior, in-app guidance triggers, 80% activation rate",
    },
    professional_services: {
      processDescription: "Client intake from initial contact through contract signing and project kickoff",
      painPoints: "Takes 2 weeks to onboard a client, documents get lost, too many manual follow-ups",
      desiredOutcome: "Reduce onboarding to 3 days, automated document collection, seamless handoff to delivery team",
    },
    healthcare: {
      processDescription: "Appointment scheduling, insurance verification, and patient intake forms",
      painPoints: "Phone tag with patients, manual insurance checks, incomplete intake forms at appointment time",
      desiredOutcome: "Online self-service scheduling, automatic insurance verification, digital forms completed before visit",
    },
    real_estate: {
      processDescription: "Lead qualification from website inquiries to showing appointments",
      painPoints: "Respond to leads too slowly, miss follow-ups, can't track showing outcomes",
      desiredOutcome: "Instant lead response, automated showing confirmations, centralized lead tracking dashboard",
    },
    finance: {
      processDescription: "Account opening process from application to KYC verification and approval",
      painPoints: "Manual document review takes days, compliance checks are error-prone, customers abandon applications",
      desiredOutcome: "Automated KYC checks, real-time application status, 24-hour approval turnaround",
    },
    manufacturing: {
      processDescription: "Purchase order processing from request to vendor communication and inventory updates",
      painPoints: "Manual PO creation, vendors don't receive orders promptly, inventory levels are inaccurate",
      desiredOutcome: "Auto-generate POs from inventory thresholds, instant vendor notifications, real-time inventory sync",
    },
  };
  
  const industryKey = industry?.toLowerCase().replace(/[^a-z]/g, '') || 'saas';
  return examples[industryKey]?.[field] || examples.saas[field];
};

export default function WorkflowQuestionnaireSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    industry: '',
    companySize: '',
    processDescription: '',
    painPoints: '',
    currentTools: [],
    desiredOutcome: '',
    estimatedHoursPerWeek: 0,
    email: '',
    name: '',
  });
  
  const { results: roiResults, inputs: roiInputs } = useROI();
  const [calculatorResults, setCalculatorResults] = useState<any>(null);
  const [isPrePopulated, setIsPrePopulated] = useState(false);

  // Auto-populate from ROI context whenever inputs change
  useEffect(() => {
    if (!roiInputs || !roiResults) return;

    const industryToBusinessType: Record<string, string> = {
      'ecommerce': 'E-commerce',
      'saas': 'SaaS',
      'professionalServices': 'Consulting',
      'healthcare': 'Healthcare',
      'realEstate': 'Real Estate',
      'marketing': 'Marketing Agency',
      'manufacturing': 'Manufacturing',
      'other': 'Other',
    };

    const teamSizeToCompanySize: Record<string, string> = {
      'solo': '1-10 employees',
      'small': '1-10 employees',
      'department': '11-50 employees',
      'multiple': '51-200 employees',
    };

    const businessType = industryToBusinessType[roiInputs.industry || ''] || 'Other';
    const companySize = teamSizeToCompanySize[roiInputs.teamSize || ''] || '';
    const hoursPerWeek = roiResults.perPersonHoursSaved || 0;
    const closestHours = [5, 10, 20, 30, 40].reduce((prev, curr) =>
      Math.abs(curr - hoursPerWeek) < Math.abs(prev - hoursPerWeek) ? curr : prev, 5);

    setFormData(prev => ({
      ...prev,
      businessType,
      industry: roiInputs.industry || '',
      companySize,
      estimatedHoursPerWeek: closestHours,
    }));

    setCalculatorResults(roiResults);
    setIsPrePopulated(true);
  }, [roiInputs, roiResults]);

  const submitQuestionnaire = trpc.workflows.submitQuestionnaire.useMutation({
    onSuccess: () => {
      setStep(6); // Success step
      toast.success('Workflow preview generated! Check your email for the magic link.');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate workflow preview');
    },
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    // Validation for each step
    if (step === 1 && (!formData.businessType || !formData.companySize)) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (step === 2 && (!formData.processDescription || !formData.painPoints)) {
      toast.error('Please describe your current process and pain points');
      return;
    }
    if (step === 3 && formData.currentTools.length === 0) {
      toast.error('Please select at least one tool you currently use');
      return;
    }
    if (step === 4 && (!formData.desiredOutcome || formData.estimatedHoursPerWeek === 0)) {
      toast.error('Please describe your desired outcome and estimate hours');
      return;
    }
    if (step === 5) {
      if (!formData.email || !formData.name) {
        toast.error('Please provide your name and email');
        return;
      }
      // Submit the form
      submitQuestionnaire.mutate({
        ...formData,
        currentTools: JSON.stringify(formData.currentTools),
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleToolToggle = (toolId: string) => {
    setFormData((prev) => ({
      ...prev,
      currentTools: prev.currentTools.includes(toolId)
        ? prev.currentTools.filter((id) => id !== toolId)
        : [...prev.currentTools, toolId],
    }));
  };

  const groupedTools = COMMON_TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof COMMON_TOOLS>);

  return (
    <section id="workflow-questionnaire" className="section bg-slate-950 relative overflow-hidden">
      {/* Background gradient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-400 font-medium">AI-Powered Workflow Preview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get Your Custom Workflow
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Answer a few questions and we'll generate a personalized automation workflow preview tailored to your business needs
          </p>
        </div>

        {/* Pricing Summary from Calculator */}
        {calculatorResults && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl p-6 border border-violet-500/30">
              <div className="text-center mb-4">
                <div className="text-sm text-slate-400 mb-1">Your Calculated Automation Value</div>
                <div className="text-3xl font-bold text-white">
                  ${calculatorResults.totalAnnualValue?.toLocaleString()}
                  <span className="text-lg text-slate-400 ml-2">/ year</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Recommended Investment</div>
                  <div className="text-sm font-semibold text-white">
                    ${calculatorResults.recommendedInvestmentMin?.toLocaleString()} - ${calculatorResults.recommendedInvestmentMax?.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Payback Period</div>
                  <div className="text-sm font-semibold text-white">{calculatorResults.paybackMonths} months</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Year 1 ROI</div>
                  <div className="text-sm font-semibold text-white">{calculatorResults.yearOneROI}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">3-Year ROI</div>
                  <div className="text-sm font-semibold text-white">{calculatorResults.threeYearROI}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {step <= 5 && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Step {step} of {totalSteps}</span>
              <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-md border border-violet-500/30 rounded-2xl p-8 md:p-12 hover:border-violet-500/60 transition-all duration-300">
            {/* Step 1: Business Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Tell us about your business</h3>
                  <p className="text-slate-400">This helps us understand your industry and scale</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="businessType" className="text-white">Business Type *</Label>
                      {isPrePopulated && formData.businessType && (
                        <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/30">
                          ✓ Auto-filled
                        </span>
                      )}
                    </div>
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="">Select your business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-white mb-2 block">Industry (Optional)</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g., B2B SaaS, Retail, Healthcare"
                      className="bg-slate-900/50 border-white/5 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="companySize" className="text-white mb-2 block">Company Size *</Label>
                    <select
                      id="companySize"
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="">Select company size</option>
                      {COMPANY_SIZES.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Process Description */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Describe your current process</h3>
                  <p className="text-slate-400">What manual tasks are slowing you down?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="processDescription" className="text-white mb-2 block">What process do you want to automate? *</Label>
                    <select
                      id="processDescription"
                      value={formData.processDescription}
                      onChange={(e) => setFormData({ ...formData, processDescription: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="">Select a process</option>
                      {PROCESS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="painPoints" className="text-white mb-2 block">What are your biggest pain points? *</Label>
                    <select
                      id="painPoints"
                      value={formData.painPoints}
                      onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="">Select your main pain point</option>
                      {PAIN_POINT_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Tools Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">What tools do you use?</h3>
                  <p className="text-slate-400">Select all the tools you currently use in your workflow</p>
                </div>

                <div className="space-y-6">
                  {Object.entries(groupedTools).map(([category, tools]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-violet-400 mb-3">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {tools.map((tool) => (
                          <label
                            key={tool.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              formData.currentTools.includes(tool.id)
                                ? 'bg-violet-500/20 border-violet-500/50'
                                : 'bg-slate-900/30 border-white/5 hover:border-violet-500/30'
                            }`}
                          >
                            <Checkbox
                              checked={formData.currentTools.includes(tool.id)}
                              onCheckedChange={() => handleToolToggle(tool.id)}
                            />
                            <span className="text-sm text-white">{tool.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Desired Outcome */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">What's your ideal outcome?</h3>
                  <p className="text-slate-400">Help us understand your goals and time investment</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="desiredOutcome" className="text-white mb-2 block">What would success look like? *</Label>
                    <select
                      id="desiredOutcome"
                      value={formData.desiredOutcome}
                      onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="">Select your desired outcome</option>
                      {DESIRED_OUTCOME_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="estimatedHours" className="text-white mb-2 block">
                      How many hours per week does this process currently take? *
                    </Label>
                    <select
                      id="estimatedHours"
                      value={formData.estimatedHoursPerWeek || ''}
                      onChange={(e) => setFormData({ ...formData, estimatedHoursPerWeek: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                    >
                      <option value="">Select hours per week</option>
                      {HOURS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contact Information */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Almost there!</h3>
                  <p className="text-slate-400">We'll send your custom workflow preview to your email</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="bg-slate-900/50 border-white/5 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="bg-slate-900/50 border-white/5 text-white"
                    />
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mt-6">
                    <p className="text-sm text-slate-300">
                      🔒 We'll send you a secure magic link to view your custom workflow preview. No password required!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Success */}
            {step === 6 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Workflow Preview Generated!</h3>
                <p className="text-lg text-slate-300 mb-6">
                  Check your email for a magic link to view your personalized workflow preview.
                </p>
                <p className="text-sm text-slate-400">
                  The link will expire in 48 hours. Can't find it? Check your spam folder.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            {step <= 5 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                <Button
                  onClick={handleBack}
                  disabled={step === 1}
                  variant="outline"
                  className="border-violet-500/30 hover:border-violet-500/60"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={submitQuestionnaire.isPending}
                >
                  {submitQuestionnaire.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : step === 5 ? (
                    <>
                      Generate Preview
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
