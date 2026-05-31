import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  PhoneMissed,
  CalendarCheck,
  DollarSign,
  Users,
  RefreshCw,
  ShieldCheck,
  Info,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Inputs = {
  monthlyLeads: number;
  missedLeadRate: number;
  recoveryRate: number;
  appointmentRate: number;
  closeRate: number;
  averageCustomerValue: number;
};

const industryPresets = {
  insurance: {
    label: 'Insurance',
    monthlyLeads: 100,
    missedLeadRate: 25,
    recoveryRate: 70,
    appointmentRate: 45,
    closeRate: 25,
    averageCustomerValue: 1500,
  },
  realEstate: {
    label: 'Real Estate',
    monthlyLeads: 80,
    missedLeadRate: 25,
    recoveryRate: 60,
    appointmentRate: 35,
    closeRate: 20,
    averageCustomerValue: 5000,
  },
  homeServices: {
    label: 'Home Services',
    monthlyLeads: 150,
    missedLeadRate: 30,
    recoveryRate: 75,
    appointmentRate: 55,
    closeRate: 35,
    averageCustomerValue: 2500,
  },
  legal: {
    label: 'Legal',
    monthlyLeads: 60,
    missedLeadRate: 25,
    recoveryRate: 65,
    appointmentRate: 40,
    closeRate: 30,
    averageCustomerValue: 7500,
  },
  medSpa: {
    label: 'Med Spa',
    monthlyLeads: 120,
    missedLeadRate: 20,
    recoveryRate: 70,
    appointmentRate: 50,
    closeRate: 40,
    averageCustomerValue: 900,
  },
  other: {
    label: 'Other',
    monthlyLeads: 100,
    missedLeadRate: 25,
    recoveryRate: 70,
    appointmentRate: 35,
    closeRate: 25,
    averageCustomerValue: 1500,
  },
} as const;

const money = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);

const num = (n: number) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  }).format(n);

export default function LeadRecoveryCalculator() {
  const [selectedIndustry, setSelectedIndustry] = useState<keyof typeof industryPresets>('insurance');
  const [inputs, setInputs] = useState<Inputs>(industryPresets.insurance);

  const results = useMemo(() => {
    const missedLeads = inputs.monthlyLeads * (inputs.missedLeadRate / 100);
    const recoveredLeads = missedLeads * (inputs.recoveryRate / 100);
    const recoveredAppointments = recoveredLeads * (inputs.appointmentRate / 100);
    const recoveredCustomers = recoveredAppointments * (inputs.closeRate / 100);
    const monthlyRevenue = recoveredCustomers * inputs.averageCustomerValue;
    const annualRevenue = monthlyRevenue * 12;

    return {
      missedLeads,
      recoveredLeads,
      recoveredAppointments,
      recoveredCustomers,
      monthlyRevenue,
      annualRevenue,
    };
  }, [inputs]);

  const applyPreset = (industry: keyof typeof industryPresets) => {
    setSelectedIndustry(industry);
    const { label, ...preset } = industryPresets[industry];
    setInputs(preset);
  };

  const update = (key: keyof Inputs, value: number) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const goToStrategy = () => {
    sessionStorage.setItem(
      'valueCalculatorData',
      JSON.stringify({
        type: 'lead-recovery',
        selectedIndustry,
        leadRecoveryInputs: inputs,
        leadRecoveryResults: results,
      })
    );

    document.getElementById('workflow-questionnaire')?.scrollIntoView({ behavior: 'smooth' });
  };

  const inputRows = [
    {
      icon: Users,
      key: 'monthlyLeads' as const,
      label: 'Monthly lead volume',
      help: 'Calls, web forms, ads, referrals, chats, and inquiries per month.',
      min: 10,
      max: 1000,
      step: 10,
      value: `${num(inputs.monthlyLeads)} leads`,
      minLabel: '10',
      maxLabel: '1,000',
    },
    {
      icon: PhoneMissed,
      key: 'missedLeadRate' as const,
      label: 'Missed or delayed lead rate',
      help: 'Leads that are missed, answered late, or not followed up with.',
      min: 5,
      max: 80,
      step: 5,
      value: `${inputs.missedLeadRate}%`,
      minLabel: '5%',
      maxLabel: '80%',
    },
    {
      icon: RefreshCw,
      key: 'recoveryRate' as const,
      label: 'Recoverable lead rate',
      help: 'Conservative estimate of missed leads an AI agent could re-engage.',
      min: 20,
      max: 90,
      step: 5,
      value: `${inputs.recoveryRate}%`,
      minLabel: '20%',
      maxLabel: '90%',
    },
    {
      icon: CalendarCheck,
      key: 'appointmentRate' as const,
      label: 'Recovered lead → appointment rate',
      help: 'Of recovered leads, how many could reasonably book a call?',
      min: 5,
      max: 80,
      step: 5,
      value: `${inputs.appointmentRate}%`,
      minLabel: '5%',
      maxLabel: '80%',
    },
    {
      icon: Users,
      key: 'closeRate' as const,
      label: 'Appointment → customer close rate',
      help: 'Of booked appointments, how many typically become customers?',
      min: 5,
      max: 80,
      step: 5,
      value: `${inputs.closeRate}%`,
      minLabel: '5%',
      maxLabel: '80%',
    },
    {
      icon: DollarSign,
      key: 'averageCustomerValue' as const,
      label: 'Average customer value',
      help: 'Average commission, case value, project value, or first transaction.',
      min: 250,
      max: 25000,
      step: 250,
      value: money(inputs.averageCustomerValue),
      minLabel: '$250',
      maxLabel: '$25,000',
    },
  ];

  const metricCards = [
    { icon: PhoneMissed, label: 'Missed Leads', value: num(results.missedLeads), sub: 'per month' },
    { icon: RefreshCw, label: 'Recovered Leads', value: num(results.recoveredLeads), sub: 'per month' },
    { icon: CalendarCheck, label: 'Recovered Appointments', value: num(results.recoveredAppointments), sub: 'per month' },
    { icon: Users, label: 'Recovered Customers', value: num(results.recoveredCustomers), sub: 'per month' },
  ];

  const breakdownRows = [
    {
      icon: Users,
      left: `${num(inputs.monthlyLeads)} leads × ${inputs.missedLeadRate}% missed`,
      right: `${num(results.missedLeads)} missed leads/month`,
    },
    {
      icon: RefreshCw,
      left: `${num(results.missedLeads)} missed × ${inputs.recoveryRate}% recoverable`,
      right: `${num(results.recoveredLeads)} recovered leads/month`,
    },
    {
      icon: CalendarCheck,
      left: `${num(results.recoveredLeads)} recovered × ${inputs.appointmentRate}% book rate`,
      right: `${num(results.recoveredAppointments)} appointments/month`,
    },
    {
      icon: Users,
      left: `${num(results.recoveredAppointments)} appointments × ${inputs.closeRate}% close rate`,
      right: `${num(results.recoveredCustomers)} customers/month`,
    },
    {
      icon: DollarSign,
      left: `${num(results.recoveredCustomers)} customers × ${money(inputs.averageCustomerValue)} value`,
      right: `${money(results.monthlyRevenue)} / month\n${money(results.annualRevenue)} / year`,
    },
  ];

  return (
    <section id="roi-calculator" className="py-24 bg-slate-950">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 border border-cyan-500/40 text-white text-sm font-bold tracking-[0.25em] uppercase mb-5">
            <Calculator className="w-4 h-4 text-white" />
            Lead Recovery Calculator
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            See How Much Revenue You’re Leaving on the Table
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto">
            Adjust the inputs based on your business. We’ll show you how an AI voice agent can help you recover missed opportunities.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.15fr_0.9fr_1.05fr] gap-6 items-start">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
            <div className="flex items-start gap-3 mb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white font-bold">1.</span>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Your Business Inputs</h3>
                <p className="text-sm text-slate-400">Start with an industry preset, then adjust the numbers.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {Object.entries(industryPresets).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyPreset(key as keyof typeof industryPresets)}
                  className={`rounded-lg border px-4 py-2 text-sm font-bold transition-all ${
                    selectedIndustry === key
                      ? 'border-cyan-400 bg-cyan-400/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-violet-500/50 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {inputRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.key} className="rounded-xl border border-slate-700/80 bg-slate-950/35 p-4">
                    <div className="grid md:grid-cols-[56px_1fr_240px_90px] gap-4 items-center">
                      <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{row.label}</h4>
                          <Info className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{row.help}</p>
                      </div>

                      <div>
                        <div className="text-right text-cyan-300 font-bold mb-2">{row.value}</div>
                        <input
                          type="range"
                          min={row.min}
                          max={row.max}
                          step={row.step}
                          value={inputs[row.key]}
                          onChange={(event) => update(row.key, Number(event.target.value))}
                          className="w-full accent-cyan-400"
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>{row.minLabel}</span>
                          <span>{row.maxLabel}</span>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-700 bg-slate-950 p-3 text-center text-white font-bold text-lg">
                        {row.value}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-xl border border-slate-700 bg-slate-950/35 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Not sure about your numbers?</h4>
                    <p className="text-sm text-slate-400">Use real data from the last 30–90 days when possible.</p>
                  </div>
                </div>
                <Button variant="outline" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800">
                  See Examples
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
            <div className="flex items-start gap-3 mb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white font-bold">2.</span>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Your Potential Opportunity</h3>
                <p className="text-sm text-slate-400">A simple estimate based on your inputs.</p>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-violet-700 p-8 text-center mb-4">
              <p className="text-sm font-bold uppercase text-white mb-3">Estimated Annual Recovered Revenue</p>
              <div className="text-5xl md:text-6xl font-extrabold text-white">{money(results.annualRevenue)}</div>
              <p className="text-lg text-white/90 mt-3">{money(results.monthlyRevenue)} per month</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metricCards.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="min-h-[150px] rounded-xl border border-slate-700 bg-slate-950/35 p-5 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-white" />
                      <span className="text-sm font-semibold text-white">{metric.label}</span>
                    </div>
                    <div>
                      <div className="text-4xl font-extrabold text-white">{metric.value}</div>
                      <div className="text-sm text-slate-300">{metric.sub}</div>
                    </div>
                  </div>
                );
              })}

              <div className="col-span-2 min-h-[150px] rounded-xl border border-slate-700 bg-slate-950/35 p-5 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-white" />
                  <span className="text-sm font-semibold text-white">Monthly Revenue Opportunity</span>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-white">{money(results.monthlyRevenue)}</div>
                  <div className="text-sm text-slate-300">estimated recovered revenue</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
            <div className="flex items-start gap-3 mb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white font-bold">3.</span>
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Calculation Breakdown</h3>
                <p className="text-sm text-slate-400">The math behind your results.</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {breakdownRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.left} className="rounded-xl border border-slate-700 bg-slate-950/35 p-4 grid grid-cols-[44px_1fr_24px_180px] gap-3 items-center">
                    <Icon className="w-6 h-6 text-white" />
                    <div className="text-sm font-semibold text-white">{row.left}</div>
                    <div className="text-slate-300 font-bold">=</div>
                    <div className="text-right whitespace-pre-line text-white font-bold">{row.right}</div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/35 p-5 flex gap-4 mb-6">
              <ShieldCheck className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">This is an estimate, not a guarantee.</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Actual results depend on lead quality, offer, follow-up, market, and sales process.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-500/40 bg-slate-950/40 p-6">
              <div className="flex gap-4 items-start mb-5">
                <Rocket className="w-10 h-10 text-white flex-shrink-0" />
                <div>
                  <h4 className="text-2xl font-bold text-white leading-tight">Ready to Turn These Opportunities into Revenue?</h4>
                  <p className="text-slate-300 mt-2">Get your custom AI Voice Agent Strategy tailored to your business.</p>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full py-6 h-auto text-base font-bold rounded-lg"
                onClick={goToStrategy}
              >
                Get Your AI Agent Strategy
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mt-4">
                <span>Takes 2 minutes</span>
                <span>|</span>
                <span>No obligation</span>
                <span>|</span>
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/50 p-6">
          <h3 className="text-xl font-bold text-white uppercase mb-5">How to Estimate (Quick Guide)</h3>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              ['Lead volume', 'Total inquiries from all sources in a typical month.'],
              ['Missed rate', 'Check calls, voicemails, or no-shows.'],
              ['Recoverable rate', 'Start conservative: 50%–70%.'],
              ['Appointment rate', 'Based on your current process.'],
              ['Close rate', 'Your typical appointment close percentage.'],
              ['Customer value', 'Average value of a deal, case, or first transaction.'],
            ].map(([title, body]) => (
              <div key={title} className="border-r border-slate-700 last:border-r-0 pr-4">
                <h4 className="font-bold text-white mb-2">{title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
