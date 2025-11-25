import { useMemo } from 'react';
import { formatCurrency } from '@/lib/valueCalculator';

interface ROIChartProps {
  totalAnnualValue: number;
  recommendedInvestmentAvg: number;
  paybackMonths: number;
}

export default function ROIChart({ totalAnnualValue, recommendedInvestmentAvg, paybackMonths }: ROIChartProps) {
  // Generate data points for 36 months
  const chartData = useMemo(() => {
    const months = [];
    const monthlyValue = totalAnnualValue / 12;
    
    for (let month = 0; month <= 36; month++) {
      const cumulativeValue = monthlyValue * month;
      const netValue = cumulativeValue - recommendedInvestmentAvg;
      
      months.push({
        month,
        cumulativeValue,
        netValue,
      });
    }
    
    return months;
  }, [totalAnnualValue, recommendedInvestmentAvg]);

  // Calculate scales
  const maxValue = chartData[chartData.length - 1].cumulativeValue;
  const minValue = -recommendedInvestmentAvg;
  const valueRange = maxValue - minValue;
  
  // SVG dimensions
  const width = 800;
  const height = 350;
  const padding = { top: 40, right: 40, bottom: 60, left: 90 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const xScale = (month: number) => padding.left + (month / 36) * chartWidth;
  const yScale = (value: number) => padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;

  // Generate smooth curve paths
  const cumulativePath = chartData.map((point, i) => {
    const x = xScale(point.month);
    const y = yScale(point.cumulativeValue);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const netValuePath = chartData.map((point, i) => {
    const x = xScale(point.month);
    const y = yScale(point.netValue);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Payback period position
  const paybackX = xScale(paybackMonths);
  const paybackY = yScale(0);

  // Y-axis ticks
  const yTicks = [
    { value: maxValue, label: formatCurrency(maxValue) },
    { value: maxValue * 0.75, label: formatCurrency(maxValue * 0.75) },
    { value: maxValue * 0.5, label: formatCurrency(maxValue * 0.5) },
    { value: maxValue * 0.25, label: formatCurrency(maxValue * 0.25) },
    { value: 0, label: "$0" },
    { value: minValue * 0.5, label: formatCurrency(minValue * 0.5) },
  ];

  // X-axis ticks
  const xTicks = [
    { month: 0, label: "Month 0" },
    { month: 12, label: "Year 1" },
    { month: 24, label: "Year 2" },
    { month: 36, label: "Year 3" },
  ];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">ROI Timeline</h3>
        <p className="text-slate-400">See how your investment pays back over 3 years</p>
      </div>

      {/* Legend */}
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

      {/* Chart */}
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ maxWidth: "800px" }}
        >
          {/* Background grid */}
          {yTicks.map((tick, i) => (
            <line
              key={`grid-${i}`}
              x1={padding.left}
              y1={yScale(tick.value)}
              x2={width - padding.right}
              y2={yScale(tick.value)}
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          ))}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Zero line (break-even) */}
          <line
            x1={padding.left}
            y1={yScale(0)}
            x2={width - padding.right}
            y2={yScale(0)}
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Cumulative value area fill */}
          <path
            d={`${cumulativePath} L ${xScale(36)} ${yScale(0)} L ${xScale(0)} ${yScale(0)} Z`}
            fill="url(#violetGradient)"
            opacity="0.1"
          />

          {/* Cumulative value line */}
          <path
            d={cumulativePath}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Net value line */}
          <path
            d={netValuePath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 4"
            filter="url(#glow)"
          />

          {/* Payback period marker */}
          <line
            x1={paybackX}
            y1={padding.top}
            x2={paybackX}
            y2={height - padding.bottom}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          <circle
            cx={paybackX}
            cy={paybackY}
            r="8"
            fill="#f59e0b"
            stroke="#1e293b"
            strokeWidth="3"
            filter="url(#glow)"
          />
          <rect
            x={paybackX - 50}
            y={paybackY - 40}
            width="100"
            height="28"
            rx="6"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x={paybackX}
            y={paybackY - 20}
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="13"
            fontWeight="bold"
          >
            Payback
          </text>

          {/* Y-axis labels */}
          {yTicks.map((tick, i) => (
            <text
              key={`y-label-${i}`}
              x={padding.left - 12}
              y={yScale(tick.value) + 5}
              textAnchor="end"
              fill="#cbd5e1"
              fontSize="13"
              fontWeight="500"
            >
              {tick.label}
            </text>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <text
              key={`x-label-${i}`}
              x={xScale(tick.month)}
              y={height - padding.bottom + 30}
              textAnchor="middle"
              fill="#cbd5e1"
              fontSize="14"
              fontWeight="600"
            >
              {tick.label}
            </text>
          ))}

          {/* Gradients and filters */}
          <defs>
            <linearGradient id="violetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Summary metrics */}
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
