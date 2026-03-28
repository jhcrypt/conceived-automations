import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, ArrowLeft, TrendingUp, Clock, DollarSign, Target, Share2, Download, Check, Info } from "lucide-react";
import {
  calculateValue,
  formatCurrency,
  formatPercentage,
  formatNumber,
  type ValueCalculatorInputs,
  type ValueCalculationResult,
} from "@/lib/valueCalculator";
import { INDUSTRY_BENCHMARKS } from "@/lib/industryBenchmarks";
import ROIChart from "@/components/ROIChart";
import { useROI } from "@/contexts/ROIContext";

export default function ValueBasedROICalculator() {
  const { setResults } = useROI();
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<Partial<ValueCalculatorInputs>>({});
  const [result, setResult] = useState<ValueCalculationResult | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = 5;

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const calculationResult = calculateValue(inputs as ValueCalculatorInputs);
      setResult(calculationResult);
      setResults({
        totalAnnualValue: calculationResult.totalAnnualValue,
        monthlySavings: calculationResult.monthlySavings,
        hoursSaved: calculationResult.hoursSaved,
        timeReduction: calculationResult.timeReduction,
      });
      setIsCalculating(false);
      setStep(totalSteps + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setInputs({});
    setResult(null);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1: return !!inputs.industry;
      case 2: return !!inputs.businessStage;
      case 3: return !!inputs.teamSize;
      case 4: return !!inputs.salaryRange;
      case 5: return !!inputs.timeSaved;
      default:
        return false;
    }
  };

  return (
    <section id="roi-calculator" className="section bg-slate-900">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Calculate Your <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Automation Value</span>
            </h2>
            <p className="text-xl text-slate-300">
              Discover the true value of automation for your business in under 2 minutes
            </p>
          </div>

          {/* Progress Bar */}
          {step <= totalSteps && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Step {step} of {totalSteps}</span>
                <span className="text-sm text-slate-400">{Math.round((step / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Question Cards */}
          <Card className="bg-slate-800/50 border-violet-500/30 p-8">
            {/* Step 1: Industry */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">What industry are you in?</h3>
                <RadioGroup
                  value={inputs.industry}
                  onValueChange={(value) => setInputs({ ...inputs, industry: value })}
                >
                  {Object.values(INDUSTRY_BENCHMARKS).map((industry) => (
                    <div key={industry.id} className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                      <RadioGroupItem value={industry.id} id={industry.id} />
                      <Label htmlFor={industry.id} className="flex-1 cursor-pointer text-lg">
                        {industry.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Business Stage */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">What stage is your business in?</h3>
                <RadioGroup
                  value={inputs.businessStage}
                  onValueChange={(value) => setInputs({ ...inputs, businessStage: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="startup" id="startup" />
                    <Label htmlFor="startup" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Just getting started</div>
                      <div className="text-sm text-slate-400">0-10 customers</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="growing" id="growing" />
                    <Label htmlFor="growing" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Growing steadily</div>
                      <div className="text-sm text-slate-400">10-100 customers</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="scaling" id="scaling" />
                    <Label htmlFor="scaling" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Scaling fast</div>
                      <div className="text-sm text-slate-400">100-1000 customers</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="established" id="established" />
                    <Label htmlFor="established" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Established</div>
                      <div className="text-sm text-slate-400">1000+ customers</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Team Size */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Who's currently handling this task?</h3>
                  <p className="text-slate-400 text-sm">Your selection affects how we calculate total team hours saved</p>
                </div>
                <RadioGroup
                  value={inputs.teamSize}
                  onValueChange={(value) => setInputs({ ...inputs, teamSize: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="solo" id="solo" />
                    <Label htmlFor="solo" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Just me (solopreneur)</div>
                      <div className="text-sm text-slate-400">1 person - hours saved = your personal time</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Small team (2-5 people)</div>
                      <div className="text-sm text-slate-400">~3 people avg - multiplies time savings across team</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="department" id="department" />
                    <Label htmlFor="department" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Department (6-20 people)</div>
                      <div className="text-sm text-slate-400">~13 people avg - significant aggregate time savings</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="multiple" id="multiple" />
                    <Label htmlFor="multiple" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Multiple departments (20+ people)</div>
                      <div className="text-sm text-slate-400">~30 people avg - enterprise-scale impact</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Salary Range */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">What's the average hourly cost of the people doing this work?</h3>
                  <p className="text-slate-400 text-sm">Include salary, benefits, and overhead</p>
                </div>
                <RadioGroup
                  value={inputs.salaryRange}
                  onValueChange={(value) => setInputs({ ...inputs, salaryRange: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="under25" id="under25" />
                    <Label htmlFor="under25" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Under $25/hr</div>
                      <div className="text-sm text-slate-400">Admin, data entry, support staff</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="25to50" id="25to50" />
                    <Label htmlFor="25to50" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">$25–$50/hr</div>
                      <div className="text-sm text-slate-400">Coordinators, junior staff</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="50to100" id="50to100" />
                    <Label htmlFor="50to100" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">$50–$100/hr</div>
                      <div className="text-sm text-slate-400">Managers, mid-level professionals</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="100to150" id="100to150" />
                    <Label htmlFor="100to150" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">$100–$150/hr</div>
                      <div className="text-sm text-slate-400">Senior staff, specialists</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="over150" id="over150" />
                    <Label htmlFor="over150" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">$150+/hr</div>
                      <div className="text-sm text-slate-400">Executives, high-value professionals</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 5: Time Saved */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">How much time would you get back each week if this was automated?</h3>
                <RadioGroup
                  value={inputs.timeSaved}
                  onValueChange={(value) => setInputs({ ...inputs, timeSaved: value as any })}
                >
                  {[
                    { value: "1-5", label: "1–5 hours" },
                    { value: "5-10", label: "5–10 hours" },
                    { value: "10-20", label: "10–20 hours" },
                    { value: "20-40", label: "20–40 hours" },
                    { value: "40+", label: "40+ hours" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="flex-1 cursor-pointer text-lg">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Results */}
            {step === totalSteps + 1 && result && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">Your Automation Value Assessment</h3>
                  <p className="text-slate-300">Based on your responses, here's the value automation could deliver</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 hover:underline mt-3 transition-all">
                        <Info className="w-4 h-4" />
                        <span>How we calculate these numbers</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-900 border-slate-700">
                      <DialogHeader className="border-b border-slate-700 pb-4">
                        <DialogTitle className="text-2xl font-bold text-white">How We Calculate Your Automation Value</DialogTitle>
                        <p className="text-slate-400 text-sm mt-2">Our calculator uses industry benchmarks and proven methodologies</p>
                      </DialogHeader>
                      <div className="space-y-6 pt-6">
                        <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Clock className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg mb-2">Labor Savings</h4>
                              <p className="text-slate-300 text-sm leading-relaxed">Hours saved per week × 52 weeks × industry-standard hourly rates × 0.7 conservative multiplier</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <TrendingUp className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg mb-2">Revenue Impact</h4>
                              <p className="text-slate-300 text-sm leading-relaxed">Faster processing times, improved service quality, and reduced delays. Varies by business stage (4-10% of inferred revenue)</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Target className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg mb-2">Error Reduction</h4>
                              <p className="text-slate-300 text-sm leading-relaxed">Typically 15% of labor costs go to rework. Savings from eliminating manual errors with industry-specific multipliers</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <DollarSign className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg mb-2">Strategic Premium</h4>
                              <p className="text-slate-300 text-sm leading-relaxed">Additional value from solving growth challenges like scaling operations or improving compliance</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg p-6 border border-violet-500/30">
                          <h4 className="font-semibold text-white text-lg mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-violet-400" />
                            Investment Recommendation
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">We recommend investing 15-30% of your Total Annual Value, adjusted for urgency. This ensures positive ROI within 3-6 months.</p>
                        </div>
                        
                        <p className="text-xs text-slate-500 italic text-center pt-2">All calculations use conservative estimates and industry benchmarks to provide realistic projections.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Total Annual Value */}
                <div className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl p-8 border border-violet-500/30">
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-2">Total Annual Value</div>
                    <div className="text-5xl font-bold text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-2">
                      {formatCurrency(result.totalAnnualValue)}
                    </div>
                    <div className="text-slate-300">
                      3-Year Projected Value: <span className="font-semibold text-white">{formatCurrency(result.threeYearValue)}</span>
                    </div>
                  </div>
                </div>

                {/* Value Breakdown */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-violet-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Labor Savings</div>
                        <div className="text-2xl font-bold text-white">{formatCurrency(result.laborSavings)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          {formatNumber(result.perPersonHoursSaved)} hours/week per person
                        </div>
                        <div className="text-xs text-slate-500">
                          ({formatNumber(result.weeklyHoursSaved)} total team hours/week)
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-cyan-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Revenue Impact</div>
                        <div className="text-2xl font-bold text-white">{formatCurrency(result.revenueImpact)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          Faster processing & better service
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Error Reduction</div>
                        <div className="text-2xl font-bold text-white">{formatCurrency(result.errorReduction)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          Eliminated rework & mistakes
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-yellow-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Strategic Premium</div>
                        <div className="text-2xl font-bold text-white">{formatCurrency(result.strategicPremium)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          Competitive advantage & scaling
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Investment Recommendation */}
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                  <h4 className="text-2xl font-bold mb-4">Recommended Investment</h4>
                  <div className="text-4xl font-bold mb-4">
                    {formatCurrency(result.recommendedInvestmentMin)} - {formatCurrency(result.recommendedInvestmentMax)}
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Payback Period</div>
                      <div className="text-2xl font-semibold">{formatNumber(result.paybackMonths)} months</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Year 1 ROI</div>
                      <div className="text-2xl font-semibold text-white">{formatPercentage(result.yearOneROI)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">3-Year ROI</div>
                      <div className="text-2xl font-semibold text-white">{formatPercentage(result.threeYearROI)}</div>
                    </div>
                  </div>
                </div>

                {/* ROI Visualization Chart */}
                <ROIChart
                  totalAnnualValue={result.totalAnnualValue}
                  recommendedInvestmentAvg={result.recommendedInvestmentAvg}
                  paybackMonths={result.paybackMonths}
                />

                {/* CTA */}
                <div className="text-center space-y-4">
                  <p className="text-lg text-slate-300">
                    Ready to unlock this value for your business?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="border-violet-500/50 text-white"
                      onClick={() => {
                        // Pass data to workflow questionnaire via sessionStorage
                        const calculatorData = {
                          industry: inputs.industry,
                          businessStage: inputs.businessStage,
                          teamSize: inputs.teamSize,
                          salaryRange: inputs.salaryRange,
                          timeSaved: inputs.timeSaved,
                          result: result,
                        };
                        sessionStorage.setItem('valueCalculatorData', JSON.stringify(calculatorData));
                        
                        const element = document.getElementById("workflow-questionnaire");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Get Your Custom Workflow
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border border-violet-500/50"
                      onClick={async () => {
                        setIsSharing(true);
                        try {
                          const { trpc } = await import('@/lib/trpc');
                          const trpcUtils = trpc.useContext();
                          const response = await trpcUtils.client.roi.shareResults.mutate({
                            industry: inputs.industry!,
                            businessStage: inputs.businessStage!,
                            teamSize: inputs.teamSize!,
                            timeSaved: inputs.timeSaved!,
                            delayImpact: inputs.delayImpact!,
                            growthChallenge: inputs.growthChallenge!,
                            urgency: inputs.urgency!,
                            results: JSON.stringify(result),
                          });
                          const url = `${window.location.origin}/shared-results/${response.shareId}`;
                          setShareUrl(url);
                          await navigator.clipboard.writeText(url);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        } catch (error) {
                          console.error('Failed to share results:', error);
                        } finally {
                          setIsSharing(false);
                        }
                      }}
                      disabled={isSharing}
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 w-4 h-4" />
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <Share2 className="mr-2 w-4 h-4" />
                          {isSharing ? 'Generating...' : 'Share Results'}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="border border-violet-500/50"
                      onClick={handleReset}
                    >
                      Start Over
                    </Button>
                  </div>
                  {shareUrl && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <p className="text-sm text-slate-300 mb-2">Share this link with decision-makers:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={shareUrl}
                          readOnly
                          className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-sm text-slate-300"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(shareUrl);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                        >
                          {copied ? <Check className="w-4 h-4" /> : 'Copy'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step <= totalSteps && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isStepComplete() || isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    <>
                      {step === totalSteps ? "Calculate Value" : "Next"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
