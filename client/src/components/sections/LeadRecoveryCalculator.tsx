import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, PhoneMissed, CalendarCheck, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Inputs = {
  monthlyLeads: number;
  missedLeadRate: number;
  recoveryRate: number;
  appointmentRate: number;
  closeRate: number;
  averageCustomerValue: number;
};

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const num = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(n);

export default function LeadRecoveryCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    monthlyLeads: 100,
    missedLeadRate: 25,
    recoveryRate: 70,
    appointmentRate: 35,
    closeRate: 25,
    averageCustomerValue: 1500,
  });

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

  const update = (key: keyof Inputs, value: number) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const goToStrategy = () => {
    sessionStorage.setItem(
      'valueCalculatorData',
      JSON.stringify({
        type: 'lead-recovery',
        leadRecoveryInputs: inputs,
        leadRecoveryResults: results,
        summary: {
          monthlyLeads: inputs.monthlyLeads,
          missedLeadRate: inputs.missedLeadRate,
          missedLeadsMonthly: results.missedLeads,
          recoveredLeadsMonthly: results.recoveredLeads,
          recoveredAppointmentsMonthly: results.recoveredAppointments,
          recoveredCustomersMonthly: results.recoveredCustomers,
          monthlyRevenueOpportunity: results.monthlyRevenue,
          annualRevenueOpportunity: results.annualRevenue,
        },
      })
    );

    document.getElementById('workflow-questionnaire')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fields = [
    {
      key: 'monthlyLeads' as const,
      label: 'Monthly lead volume',
      help: 'Calls, web forms, ads, referrals, chats, and missed-call opportunities.',
      min: 10,
      max: 1000,
      step: 10,
      valueLabel: `${num(inputs.monthlyLeads)} leads`,
    },
    {
      key: 'missedLeadRate' as const,
      label: 'Missed or delayed lead rate',
      help: 'Leads that are missed, answered late, or not followed up with consistently.',
      min: 5,
      max: 80,
      step: 5,
      valueLabel: `${inputs.missedLeadRate}%`,
    },
    {
      key: 'recoveryRate' as const,
      label: 'Recoverable lead rate',
      help: 'Conservative estimate of missed leads an AI agent could re-engage.',
      min: 20,
      max: 90,
      step: 5,
      valueLabel: `${inputs.recoveryRate}%`,
    },
    {
      key: 'appointmentRate' as const,
      label: 'Recovered lead → appointment rate',
      help: 'Of recovered leads, how many could reasonably book a call or consultation?',
      min: 5,
      max: 80,
      step: 5,
      valueLabel: `${inputs.appointmentRate}%`,
    },
    {
      key: 'closeRate' as const,
      label: 'Appointment → customer close rate',
      help: 'Of booked appointments, how many typically become customers?',
      min: 5,
      max: 80,
      step: 5,
      valueLabel: `${inputs.closeRate}%`,
    },
    {
      key: 'averageCustomerValue' as const,
      label: 'Average customer value',
      help: 'Average commission, case value, project value, or first transaction value.',
      min: 250,
      max: 25000,
      step: 250,
      valueLabel: money(inputs.averageCustomerValue),
    },
  ];

  return (
    <section id="roi-calculator" className="section bg-slate-900">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-sm font-semibold mb-6">
              <Calculator className="w-4 h-4" />
              Lead Recovery Calculator
            </div>
            <h2 className="text-4xl font-bold mb-4">
              How Much Revenue Are <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Missed Leads Costing You?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A transparent estimate based only on the numbers you provide. No hidden “strategic premium,” inflated ROI, or mystery assumptions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="bg-slate-800/50 border-violet-500/30 p-8">
              <div className="space-y-7">
                {fields.map((field) => (
                  <div key={field.key} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <label className="block text-lg font-semibold text-white">{field.label}</label>
                        <p className="text-sm text-slate-400 mt-1">{field.help}</p>
                      </div>
                      <div className="text-cyan-300 font-bold whitespace-nowrap">{field.valueLabel}</div>
                    </div>
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={inputs[field.key]}
                      onChange={(event) => update(field.key, Number(event.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl p-8 border border-violet-500/30">
                <div className="text-sm text-slate-400 mb-2">Estimated annual recovered revenue</div>
                <div className="text-5xl font-bold text-white mb-3">{money(results.annualRevenue)}</div>
                <p className="text-slate-300">
                  Based on {num(results.missedLeads)} missed leads/month and {num(results.recoveredCustomers)} recovered customers/month.
                </p>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-slate-800/40 border-slate-700 p-6">
                  <PhoneMissed className="w-6 h-6 text-violet-400 mb-3" />
                  <div className="text-sm text-slate-400">Missed leads</div>
                  <div className="text-3xl font-bold text-white">{num(results.missedLeads)}</div>
                  <div className="text-xs text-slate-500 mt-1">per month</div>
                </Card>

                <Card className="bg-slate-800/40 border-slate-700 p-6">
                  <Users className="w-6 h-6 text-cyan-400 mb-3" />
                  <div className="text-sm text-slate-400">Recovered leads</div>
                  <div className="text-3xl font-bold text-white">{num(results.recoveredLeads)}</div>
                  <div className="text-xs text-slate-500 mt-1">per month</div>
                </Card>

                <Card className="bg-slate-800/40 border-slate-700 p-6">
                  <CalendarCheck className="w-6 h-6 text-green-400 mb-3" />
                  <div className="text-sm text-slate-400">Recovered appointments</div>
                  <div className="text-3xl font-bold text-white">{num(results.recoveredAppointments)}</div>
                  <div className="text-xs text-slate-500 mt-1">per month</div>
                </Card>

                <Card className="bg-slate-800/40 border-slate-700 p-6">
                  <DollarSign className="w-6 h-6 text-yellow-400 mb-3" />
                  <div className="text-sm text-slate-400">Monthly opportunity</div>
                  <div className="text-3xl font-bold text-white">{money(results.monthlyRevenue)}</div>
                  <div className="text-xs text-slate-500 mt-1">estimated recovered revenue</div>
                </Card>
              </div>

              <Card className="bg-slate-800/40 border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Calculation shown plainly</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>{num(inputs.monthlyLeads)} leads × {inputs.missedLeadRate}% missed = {num(results.missedLeads)} missed leads/month</p>
                  <p>{num(results.missedLeads)} missed × {inputs.recoveryRate}% recoverable = {num(results.recoveredLeads)} recovered leads/month</p>
                  <p>{num(results.recoveredLeads)} recovered × {inputs.appointmentRate}% book = {num(results.recoveredAppointments)} appointments/month</p>
                  <p>{num(results.recoveredAppointments)} appointments × {inputs.closeRate}% close = {num(results.recoveredCustomers)} customers/month</p>
                  <p>{num(results.recoveredCustomers)} customers × {money(inputs.averageCustomerValue)} = {money(results.monthlyRevenue)}/month</p>
                </div>
              </Card>

              <Button size="lg" className="w-full py-6 h-auto text-base font-bold rounded-lg" onClick={goToStrategy}>
                Get Your AI Agent Strategy
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-xs text-slate-500 text-center">
                This is an estimate, not a guarantee. Actual results depend on lead quality, offer, follow-up, market, and close process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
