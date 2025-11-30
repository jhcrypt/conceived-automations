import { useState } from 'react';
import { AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OperationalScanSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'problem' | 'solution'>('overview');

  return (
    <section className="section relative overflow-hidden" id="operational-scan">
      {/* Gradient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm text-violet-400 uppercase tracking-wider mb-4">SYSTEM DIAGNOSTICS</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Operational Scan & Optimization Report
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-slate-800/50 border border-violet-500/30">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? 'rounded-xl border-2 border-blue-500 bg-blue-500/10 text-white hover:bg-blue-500/20' : 'rounded-xl text-slate-400 hover:text-white'}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === 'problem' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('problem')}
              className={activeTab === 'problem' ? 'rounded-xl border-2 border-red-500 bg-red-500/10 text-white hover:bg-red-500/20' : 'rounded-xl text-slate-400 hover:text-white'}
            >
              Problem Detected
            </Button>
            <Button
              variant={activeTab === 'solution' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('solution')}
              className={activeTab === 'solution' ? 'rounded-xl border-2 border-green-500 bg-green-500/10 text-white hover:bg-green-500/20' : 'rounded-xl text-slate-400 hover:text-white'}
            >
              Solution Deployed
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="p-8 md:p-12 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:scale-105 transition-all duration-300">
                <h3 className="text-3xl font-bold mb-4">Comprehensive System Overview</h3>
                <p className="text-lg text-foreground/70 mb-8">
                  Our detailed analysis shows areas of inefficiency and potential for exponential growth through strategic automation.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Inefficiency Hotspots */}
                  <div className="p-6 rounded-xl bg-slate-900/40 border-2 border-violet-500/40">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                      <h4 className="text-xl font-bold">Inefficiency Hotspots</h4>
                    </div>
                    <p className="text-foreground/70">
                      Identified manual data transfers, repetitive customer service, and report generation as primary time sinks.
                    </p>
                  </div>

                  {/* Growth Potential */}
                  <div className="p-6 rounded-xl bg-slate-900/40 border-2 border-violet-500/40">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                      <h4 className="text-xl font-bold">Growth Potential</h4>
                    </div>
                    <p className="text-foreground/70">
                      Automating these processes can free up 20-30% of employee time, leading to higher productivity and innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Problem Detected Tab */}
          {activeTab === 'problem' && (
            <div className="space-y-6">
              <div className="p-8 md:p-12 rounded-2xl bg-slate-800/50 border border-violet-500/40 relative overflow-hidden hover:scale-105 transition-all duration-300">
                {/* Warning icon watermark */}
                <div className="absolute top-8 right-8 opacity-5 pointer-events-none">
                  <AlertTriangle className="w-48 h-48 text-red-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      Status: <span className="text-red-400">Degraded Performance</span>
                    </h3>
                  </div>

                  <p className="text-lg text-foreground/70 mb-8">
                    Manual processes lead to operational bottlenecks, increased costs, and employee dissatisfaction, hindering scalable growth.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-red-950/10 border-2 border-violet-500/40 font-mono text-sm">
                      <span className="text-red-400">[!]</span> <span className="text-foreground/90">Data Inconsistencies: High risk of errors</span>
                    </div>
                    <div className="p-4 rounded-lg bg-red-950/10 border-2 border-violet-500/40 font-mono text-sm">
                      <span className="text-red-400">[!]</span> <span className="text-foreground/90">Resource Drain: Manual tasks consume 30% of time</span>
                    </div>
                    <div className="p-4 rounded-lg bg-red-950/10 border-2 border-violet-500/40 font-mono text-sm">
                      <span className="text-red-400">[!]</span> <span className="text-foreground/90">Delayed Responses: Impacting customer satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Solution Deployed Tab */}
          {activeTab === 'solution' && (
            <div className="space-y-6">
              <div className="p-8 md:p-12 rounded-2xl bg-slate-800/50 border border-violet-500/40 relative overflow-hidden hover:scale-105 transition-all duration-300">
                {/* Activity icon watermark */}
                <div className="absolute top-8 right-8 opacity-5 pointer-events-none">
                  <Activity className="w-48 h-48 text-green-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      Status: <span className="text-cyan-400">Optimized Operations</span>
                    </h3>
                  </div>

                  <p className="text-lg text-foreground/70 mb-8">
                    Intelligent automation streamlines workflows, ensures data accuracy, and empowers your team to focus on strategic initiatives.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-950/10 border-2 border-violet-500/40 font-mono text-sm">
                      <span className="text-green-400">[OK]</span> <span className="text-foreground/90">Data Integrity: Automated validation (100% reliable)</span>
                    </div>
                    <div className="p-4 rounded-lg bg-green-950/10 border-2 border-violet-500/40 font-mono text-sm">
                      <span className="text-green-400">[OK]</span> <span className="text-foreground/90">Efficiency Gains: Time savings up to 80%</span>
                    </div>
                    <div className="p-4 rounded-lg bg-green-950/10 border-2 border-violet-500/40 font-mono text-sm">
                      <span className="text-green-400">[OK]</span> <span className="text-foreground/90">Customer Experience: Instant, personalized interactions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
