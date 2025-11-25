import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, TrendingUp, Target, DollarSign, ArrowRight, Info, X } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber, type ValueCalculationResult } from '@/lib/valueCalculator';
import { INDUSTRY_BENCHMARKS } from '@/lib/industryBenchmarks';
import ROIChart from '@/components/ROIChart';
import { APP_LOGO, APP_TITLE } from '@/const';

export default function SharedResults() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const shareId = params.shareId;
  
  const [loading, setLoading] = useState(true);
  const [showMath, setShowMath] = useState(false); // Modal State
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    industry: string;
    businessStage: string;
    teamSize: string;
    timeSaved: string;
    results: ValueCalculationResult;
  } | null>(null);

  useEffect(() => {
    async function loadSharedResults() {
      if (!shareId) {
        setError('Invalid share link');
        setLoading(false);
        return;
      }

      try {
        const { trpc } = await import('@/lib/trpc');
        const trpcUtils = trpc.useContext();
        const result = await trpcUtils.client.roi.getSharedResults.query({ shareId });
        
        setData({
          industry: result.industry,
          businessStage: result.businessStage,
          teamSize: result.teamSize,
          timeSaved: result.timeSaved,
          results: JSON.parse(result.results),
        });
      } catch (err) {
        console.error('Failed to load shared results:', err);
        setError('This link is invalid or has expired');
      } finally {
        setLoading(false);
      }
    }

    loadSharedResults();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Link Not Found</h1>
          <p className="text-slate-300 mb-6">{error}</p>
          <Button onClick={() => setLocation('/')}>
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const result = data.results;
  const industryName = INDUSTRY_BENCHMARKS[data.industry]?.name || data.industry;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      
      {/* --- TRANSPARENCY MODAL START --- */}
      {showMath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowMath(false)}>
          <div className="bg-slate-900 border border-violet-500/30 p-6 rounded-xl max-w-2xl w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowMath(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-violet-400" />
              Transparency Report
            </h3>
            
            <div className="space-y-6 text-sm text-slate-300">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="text-white font-semibold mb-2 flex justify-between">
                  <span>1. Productivity Reclaimed (Labor)</span>
                  <span className="text-violet-400">{formatCurrency(result.laborSavings)}</span>
                </h4>
                <div className="font-mono text-xs bg-black/30 p-2 rounded text-slate-400">
                  (Hours Saved × Hourly Rate × 52 Weeks) × 70%
                </div>
                <p className="mt-2 text-xs text-slate-500">We intentionally discount the value by 30% to ensure our projections are safe and achievable.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="text-white font-semibold mb-2 flex justify-between">
                  <span>2. Scalability Capacity (Strategic)</span>
                  <span className="text-yellow-400">{formatCurrency(result.strategicPremium)}</span>
                </h4>
                <p className="mb-2">This represents the "Soft Value" of automation—the ability to handle 2x-10x more volume without hiring.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="text-white font-semibold mb-2 flex justify-between">
                  <span>3. 3-Year Value Projection</span>
                  <span className="text-cyan-400">{formatCurrency(result.threeYearValue)}</span>
                </h4>
                <p className="mb-2">Automation benefits compound over time as your processes stabilize and scale.</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700 flex justify-end">
              <Button onClick={() => setShowMath(false)}>Close Report</Button>
            </div>
          </div>
        </div>
      )}
      {/* --- TRANSPARENCY MODAL END --- */}

      {/* Header with Branding */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8" />}
              <h1 className="text-xl font-bold text-white">{APP_TITLE}</h1>
            </div>
            <Button
              onClick={() => setLocation('/')}
              variant="outline"
            >
              Calculate Your Value
            </Button>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Automation Value Assessment
              </span>
            </h2>
            <p className="text-slate-300 text-lg">
              {industryName} • {data.businessStage} • {data.teamSize} team
            </p>
          </div>

          {/* Total Annual Value */}
          <div className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl p-8 border border-violet-500/30">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">Total Annual Value</div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-3">
                {formatCurrency(result.totalAnnualValue)}
              </div>
              
              {/* THIS IS THE LINK YOU WERE MISSING */}
              <button 
                onClick={() => setShowMath(true)}
                className="text-xs text-slate-500 hover:text-violet-400 transition-colors flex items-center justify-center gap-1 mx-auto mb-4 underline decoration-dotted underline-offset-4"
              >
                <Info className="w-3 h-3" />
                See how this is calculated
              </button>

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
                  <div className="font-semibold mb-1">Productivity Reclaimed</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(result.laborSavings)}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Equivalent to gaining {formatNumber(result.weeklyHoursSaved / 40)} extra employees for free
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    (Based on {formatNumber(result.weeklyHoursSaved)} hours saved/week)
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 p-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-cyan-400 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Faster Speed-to-Lead</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(result.revenueImpact)}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Revenue gained from faster response times & processing
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 p-6">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Cost of Mistakes</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(result.errorReduction)}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Savings from eliminated rework & data entry errors
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 p-6">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Scalability Capacity</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(result.strategicPremium)}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Growth potential without adding new overhead costs
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

          {/* ROI Chart */}
          <ROIChart
            totalAnnualValue={result.totalAnnualValue}
            recommendedInvestmentAvg={result.recommendedInvestmentAvg}
            paybackMonths={result.paybackMonths}
          />

          {/* CTA */}
          <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-xl p-8 border border-violet-500/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Unlock This Value?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Let's build a custom automation workflow tailored to your business needs. 
              Our team will help you achieve these results and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setLocation('/#workflow-questionnaire')}
              >
                Get Your Custom Workflow
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation('/')}
              >
                Calculate Your Own Value
              </Button>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="text-center text-sm text-slate-400 pt-8 border-t border-slate-700">
            <p>Powered by {APP_TITLE}</p>
            <p className="mt-2">
              <a href="/" className="text-violet-400 hover:text-violet-300">
                Calculate your automation value →
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}