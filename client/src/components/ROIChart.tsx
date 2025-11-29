import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from '@/lib/valueCalculator';

interface ROIChartProps {
  totalAnnualValue: number;
  recommendedInvestmentAvg: number;
  paybackMonths: number;
}

export default function ROIChart({ totalAnnualValue, recommendedInvestmentAvg, paybackMonths }: ROIChartProps) {
  const chartData = useMemo(() => {
    const months = [];
    const monthlyValue = totalAnnualValue / 12;
    for (let month = 0; month <= 36; month++) {
      const cumulativeValue = monthlyValue * month;
      const netValue = cumulativeValue - recommendedInvestmentAvg;
      months.push({
        month,
        name: `Month ${month}`,
        cumulativeValue,
        netValue,
      });
    }
    return months;
  }, [totalAnnualValue, recommendedInvestmentAvg]);

  const paybackMonthExact = (recommendedInvestmentAvg / (totalAnnualValue / 12));

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-xl">
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">ROI Timeline</h3>
            <p className="text-slate-400">See how your investment pays back over 3 years</p>
        </div>
        <div className="flex flex-wrap gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50"></div>
                <span className="text-slate-300 font-medium">Cumulative Value</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
                <span className="text-slate-300 font-medium">Net Value (After Investment)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-amber-500 shadow-lg shadow-amber-500/50"></div>
                <span className="text-slate-300 font-medium">Payback Period</span>
            </div>
        </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 30,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name"
              tick={{ fill: 'white' }} 
              tickLine={{ stroke: 'white' }}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fill: 'white' }}
              tickLine={{ stroke: 'white' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#4c51bf',
                color: 'white'
              }}
              formatter={(value: number, name: string) => {
                const formattedValue = formatCurrency(value);
                if (name === 'cumulativeValue') {
                  return [formattedValue, 'Cumulative Value'];
                }
                if (name === 'netValue') {
                  return [formattedValue, 'Net Value'];
                }
                return [formattedValue, name];
              }}
            />
            <Area type="monotone" dataKey="cumulativeValue" stroke="#8884d8" fillOpacity={1} fill="url(#colorCumulative)" />
            <Area type="monotone" dataKey="netValue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNet)" />
            <ReferenceLine y={0} stroke="white" strokeDasharray="3 3" />
            <ReferenceLine x={paybackMonthExact} stroke="red" strokeDasharray="3 3" label={{ value: `Payback (${paybackMonths.toFixed(1)} months)`, fill: 'white' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-400 mb-2">Initial Investment</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(recommendedInvestmentAvg)}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-400 mb-2">Break Even</div>
            <div className="text-2xl font-bold text-white">{paybackMonths.toFixed(1)} months</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-sm text-slate-400 mb-2">3-Year Net Value</div>
            <div className="text-2xl font-bold text-white">
                {formatCurrency((totalAnnualValue * 3) - recommendedInvestmentAvg)}
            </div>
        </div>
      </div>
    </div>
  );
}

