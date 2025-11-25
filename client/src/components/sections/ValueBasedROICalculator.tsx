import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, TrendingUp, Clock, DollarSign, Target } from "lucide-react";
import {
  calculateValue,
  formatCurrency,
  formatPercentage,
  formatNumber,
  type ValueCalculatorInputs,
  type ValueCalculationResult,
} from "@/lib/valueCalculator";
import { INDUSTRY_BENCHMARKS } from "@/lib/industryBenchmarks";

export default function ValueBasedROICalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<Partial<ValueCalculatorInputs>>({});
  const [result, setResult] = useState<ValueCalculationResult | null>(null);

  const totalSteps = 7;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calculate value
      const calculationResult = calculateValue(inputs as ValueCalculatorInputs);
      setResult(calculationResult);
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
    <section id="roi-calculator" className="py-24 bg-slate-900">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Automation Value</span>
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
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            {/* Step 1: Industry */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">What industry are you in?</h3>
                <RadioGroup
                  value={inputs.industry}
                  onValueChange={(value) => setInputs({ ...inputs, industry: value })}
                >
                  {Object.values(INDUSTRY_BENCHMARKS).map((industry) => (
                    <div key={industry.id} className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.industry === industry.id ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
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
                <h3 className="text-2xl font-semibold">What stage is your business in?</h3>
                <RadioGroup
                  value={inputs.businessStage}
                  onValueChange={(value) => setInputs({ ...inputs, businessStage: value as any })}
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.businessStage === 'startup' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="startup" id="startup" />
                    <Label htmlFor="startup" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Just getting started</div>
                      <div className="text-sm text-slate-400">0-10 customers</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.businessStage === 'growing' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="growing" id="growing" />
                    <Label htmlFor="growing" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Growing steadily</div>
                      <div className="text-sm text-slate-400">10-100 customers</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.businessStage === 'scaling' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="scaling" id="scaling" />
                    <Label htmlFor="scaling" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Scaling fast</div>
                      <div className="text-sm text-slate-400">100-1000 customers</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.businessStage === 'established' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
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
                <h3 className="text-2xl font-semibold">Who's currently handling this task?</h3>
                <RadioGroup
                  value={inputs.teamSize}
                  onValueChange={(value) => setInputs({ ...inputs, teamSize: value as any })}
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.teamSize === 'solo' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="solo" id="solo" />
                    <Label htmlFor="solo" className="flex-1 cursor-pointer text-lg">
                      Just me (solopreneur)
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.teamSize === 'small' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small" className="flex-1 cursor-pointer text-lg">
                      Small team (2-5 people)
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.teamSize === 'department' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="department" id="department" />
                    <Label htmlFor="department" className="flex-1 cursor-pointer text-lg">
                      Department (6-20 people)
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.teamSize === 'multiple' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="multiple" id="multiple" />
                    <Label htmlFor="multiple" className="flex-1 cursor-pointer text-lg">
                      Multiple departments (20+ people)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Time Saved */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">How much time would you get back each week if this was automated?</h3>
                <RadioGroup
                  value={inputs.timeSaved}
                  onValueChange={(value) => setInputs({ ...inputs, timeSaved: value as any })}
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.timeSaved === '1-5' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="1-5" id="1-5" />
                    <Label htmlFor="1-5" className="flex-1 cursor-pointer text-lg">
                      1-5 hours
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.timeSaved === '5-10' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="5-10" id="5-10" />
                    <Label htmlFor="5-10" className="flex-1 cursor-pointer text-lg">
                      5-10 hours
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.timeSaved === '10-20' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="10-20" id="10-20" />
                    <Label htmlFor="10-20" className="flex-1 cursor-pointer text-lg">
                      10-20 hours
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.timeSaved === '20-40' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="20-40" id="20-40" />
                    <Label htmlFor="20-40" className="flex-1 cursor-pointer text-lg">
                      20-40 hours
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.timeSaved === '40+' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
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
                <h3 className="text-2xl font-semibold">What happens when this process is delayed or breaks?</h3>
                <RadioGroup
                  value={inputs.delayImpact}
                  onValueChange={(value) => setInputs({ ...inputs, delayImpact: value as any })}
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.delayImpact === 'lost_sales' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="lost_sales" id="lost_sales" />
                    <Label htmlFor="lost_sales" className="flex-1 cursor-pointer text-lg">
                      Lost sales opportunities
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.delayImpact === 'unhappy_customers' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="unhappy_customers" id="unhappy_customers" />
                    <Label htmlFor="unhappy_customers" className="flex-1 cursor-pointer text-lg">
                      Unhappy customers
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.delayImpact === 'missed_deadlines' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="missed_deadlines" id="missed_deadlines" />
                    <Label htmlFor="missed_deadlines" className="flex-1 cursor-pointer text-lg">
                      Missed deadlines
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.delayImpact === 'compliance' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="compliance" id="compliance" />
                    <Label htmlFor="compliance" className="flex-1 cursor-pointer text-lg">
                      Compliance issues
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.delayImpact === 'burnout' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="burnout" id="burnout" />
                    <Label htmlFor="burnout" className="flex-1 cursor-pointer text-lg">
                      Team frustration/burnout
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.delayImpact === 'not_critical' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
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
                <h3 className="text-2xl font-semibold">What's your biggest growth challenge right now?</h3>
                <RadioGroup
                  value={inputs.growthChallenge}
                  onValueChange={(value) => setInputs({ ...inputs, growthChallenge: value as any })}
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.growthChallenge === 'demand' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="demand" id="demand" />
                    <Label htmlFor="demand" className="flex-1 cursor-pointer text-lg">
                      Can't keep up with demand
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.growthChallenge === 'quality' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="quality" id="quality" />
                    <Label htmlFor="quality" className="flex-1 cursor-pointer text-lg">
                      Inconsistent quality/service
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.growthChallenge === 'manual_work' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="manual_work" id="manual_work" />
                    <Label htmlFor="manual_work" className="flex-1 cursor-pointer text-lg">
                      Too much manual work to scale
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.growthChallenge === 'churn' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="churn" id="churn" />
                    <Label htmlFor="churn" className="flex-1 cursor-pointer text-lg">
                      High customer churn
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.growthChallenge === 'speed' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="speed" id="speed" />
                    <Label htmlFor="speed" className="flex-1 cursor-pointer text-lg">
                      Can't compete on speed
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.growthChallenge === 'hiring' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
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
                <h3 className="text-2xl font-semibold">How quickly do you need this solved?</h3>
                <RadioGroup
                  value={inputs.urgency}
                  onValueChange={(value) => setInputs({ ...inputs, urgency: value as any })}
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.urgency === 'urgent' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Urgent (within 30 days)</div>
                      <div className="text-sm text-slate-400">This is critical for our business</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.urgency === 'soon' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="soon" id="soon" />
                    <Label htmlFor="soon" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Soon (1-3 months)</div>
                      <div className="text-sm text-slate-400">Important but not urgent</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.urgency === 'planning' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
                    <RadioGroupItem value="planning" id="planning" />
                    <Label htmlFor="planning" className="flex-1 cursor-pointer">
                      <div className="text-lg font-medium">Planning ahead (3-6 months)</div>
                      <div className="text-sm text-slate-400">Part of our roadmap</div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      inputs.urgency === 'exploring' ? 'bg-violet-500/20 border border-violet-500/50' : 'hover:bg-slate-700/50'
                    }`}>
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
                </div>

                {/* Total Annual Value */}
                <div className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl p-8 border border-violet-500/30">
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-2">Total Annual Value</div>
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-2">
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
                        <div className="text-2xl font-bold">{formatCurrency(result.laborSavings)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          {formatNumber(result.weeklyHoursSaved)} hours/week saved
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-cyan-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Revenue Impact</div>
                        <div className="text-2xl font-bold">{formatCurrency(result.revenueImpact)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          Faster processing & better service
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-pink-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Error Reduction</div>
                        <div className="text-2xl font-bold">{formatCurrency(result.errorReduction)}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          Eliminated rework & mistakes
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-800/30 border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-purple-400 mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Strategic Premium</div>
                        <div className="text-2xl font-bold">{formatCurrency(result.strategicPremium)}</div>
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
                      <div className="text-2xl font-semibold text-cyan-400">{formatPercentage(result.yearOneROI)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">3-Year ROI</div>
                      <div className="text-2xl font-semibold text-violet-400">{formatPercentage(result.threeYearROI)}</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center space-y-4">
                  <p className="text-lg text-slate-300">
                    Ready to unlock this value for your business?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600"
                      onClick={() => {
                        const element = document.getElementById("workflow-questionnaire");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Get Your Custom Workflow
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleReset}
                    >
                      Start Over
                    </Button>
                  </div>
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
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600"
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
