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

  const totalSteps = 7;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calculate value
      const calculationResult = calculateValue(inputs as ValueCalculatorInputs);
      setResult(calculationResult);
      // Update global ROI context for pricing section
      setResults({
        totalAnnualValue: calculationResult.totalAnnualValue,
        monthlySavings: calculationResult.monthlySavings,
        hoursSaved: calculationResult.hoursSaved,
        timeReduction: calculationResult.timeReduction,
      });
      setStep(totalSteps + 1); // Show results
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
      case 1:
        return !!inputs.industry;
      case 2:
        return !!inputs.businessStage;
      case 3:
        return !!inputs.teamSize;
      case 4:
        return !!inputs.timeSaved;
      case 5:
        return !!inputs.delayImpact;
      case 6:
        return !!inputs.growthChallenge;
      case 7:
        return !!inputs.urgency;
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

            {/* Step 4: Time Saved */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">How much time would you get back each week if this was automated?</h3>
                <RadioGroup
                  value={inputs.timeSaved}
                  onValueChange={(value) => setInputs({ ...inputs, timeSaved: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="1-5" id="1-5" />
                    <Label htmlFor="1-5" className="flex-1 cursor-pointer text-lg">
                      1-5 hours
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="5-10" id="5-10" />
                    <Label htmlFor="5-10" className="flex-1 cursor-pointer text-lg">
                      5-10 hours
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="10-20" id="10-20" />
                    <Label htmlFor="10-20" className="flex-1 cursor-pointer text-lg">
                      10-20 hours
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="20-40" id="20-40" />
                    <Label htmlFor="20-40" className="flex-1 cursor-pointer text-lg">
                      20-40 hours
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="40+" id="40+" />
                    <Label htmlFor="40+" className="flex-1 cursor-pointer text-lg">
                      40+ hours
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 5: Delay Impact */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">What happens when this process is delayed or breaks?</h3>
                <RadioGroup
                  value={inputs.delayImpact}
                  onValueChange={(value) => setInputs({ ...inputs, delayImpact: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="lost_sales" id="lost_sales" />
                    <Label htmlFor="lost_sales" className="flex-1 cursor-pointer text-lg">
                      Lost sales opportunities
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="unhappy_customers" id="unhappy_customers" />
                    <Label htmlFor="unhappy_customers" className="flex-1 cursor-pointer text-lg">
                      Unhappy customers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="missed_deadlines" id="missed_deadlines" />
                    <Label htmlFor="missed_deadlines" className="flex-1 cursor-pointer text-lg">
                      Missed deadlines
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="compliance" id="compliance" />
                    <Label htmlFor="compliance" className="flex-1 cursor-pointer text-lg">
                      Compliance issues
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="burnout" id="burnout" />
                    <Label htmlFor="burnout" className="flex-1 cursor-pointer text-lg">
                      Team frustration/burnout
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="not_critical" id="not_critical" />
                    <Label htmlFor="not_critical" className="flex-1 cursor-pointer text-lg">
                      Nothing critical (just inefficient)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 6: Growth Challenge */}
            {step === 6 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">What's your biggest growth challenge right now?</h3>
                <RadioGroup
                  value={inputs.growthChallenge}
                  onValueChange={(value) => setInputs({ ...inputs, growthChallenge: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="demand" id="demand" />
                    <Label htmlFor="demand" className="flex-1 cursor-pointer text-lg">
                      Can't keep up with demand
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="quality" id="quality" />
                    <Label htmlFor="quality" className="flex-1 cursor-pointer text-lg">
                      Inconsistent quality/service
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="manual_work" id="manual_work" />
                    <Label htmlFor="manual_work" className="flex-1 cursor-pointer text-lg">
                      Too much manual work to scale
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="churn" id="churn" />
                    <Label htmlFor="churn" className="flex-1 cursor-pointer text-lg">
                      High customer churn
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="speed" id="speed" />
                    <Label htmlFor="speed" className="flex-1 cursor-pointer text-lg">
                      Can't compete on speed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="hiring" id="hiring" />
                    <Label htmlFor="hiring" className="flex-1 cursor-pointer text-lg">
                      Hiring and training is too slow
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 7: Urgency */}
            {step === 7 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">How quickly do you need this solved?</h3>
                <RadioGroup
                  value={inputs.urgency}
                  onValueChange={(value) => setInputs({ ...inputs, urgency: value as any })}
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Urgent (within 30 days)</div>
                      <div className="text-sm text-slate-400">This is critical for our business</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="soon" id="soon" />
                    <Label htmlFor="soon" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Soon (1-3 months)</div>
                      <div className="text-sm text-slate-400">Important but not urgent</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="planning" id="planning" />
                    <Label htmlFor="planning" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Planning ahead (3-6 months)</div>
                      <div className="text-sm text-slate-400">Part of our roadmap</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-violet-500/30 hover:bg-slate-700/50 transition-colors">
                    <RadioGroupItem value="exploring" id="exploring" />
                    <Label htmlFor="exploring" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Exploring options (6+ months)</div>
                      <div className="text-sm text-slate-400">Just gathering information</div>
                    </Label>
                  </div>
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
                      className="border-violet-500/50"
                      onClick={() => {
                        // Pass data to workflow questionnaire via sessionStorage
                        const calculatorData = {
                          industry: inputs.industry,
                          businessStage: inputs.businessStage,
                          teamSize: inputs.teamSize,
                          timeSaved: inputs.timeSaved,
                          delayImpact: inputs.delayImpact,
                          growthChallenge: inputs.growthChallenge,
                          urgency: inputs.urgency,
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
                  disabled={!isStepComplete()}
                >
                  {step === totalSteps ? "Calculate Value" : "Next"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
