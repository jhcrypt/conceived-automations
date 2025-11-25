/**
 * Value-Based Pricing Calculator - Inference Engine
 * 
 * Calculates Total Annual Value (TAV) based on user responses
 * without asking intrusive questions about revenue or salaries
 */

import {
  INDUSTRY_BENCHMARKS,
  TEAM_SIZE_MULTIPLIERS,
  TIME_IMPACT_HOURS,
  URGENCY_MULTIPLIERS,
  DELAY_IMPACT_MULTIPLIERS,
  GROWTH_CHALLENGE_PREMIUMS,
  type BusinessStage,
  type TimeImpact,
  type TeamSize,
  type Urgency,
  type DelayImpact,
  type GrowthChallenge,
} from "./industryBenchmarks";

export interface ValueCalculatorInputs {
  industry: string;
  businessStage: BusinessStage;
  teamSize: TeamSize;
  timeSaved: TimeImpact;
  delayImpact: DelayImpact;
  growthChallenge: GrowthChallenge;
  urgency: Urgency;
}

export interface ValueCalculationResult {
  // Breakdown
  laborSavings: number;
  revenueImpact: number;
  errorReduction: number;
  strategicPremium: number;
  
  // Totals
  totalAnnualValue: number;
  threeYearValue: number;
  
  // Investment recommendation
  recommendedInvestmentMin: number;
  recommendedInvestmentMax: number;
  recommendedInvestmentAvg: number;
  
  // ROI metrics
  paybackMonths: number;
  yearOneROI: number;
  threeYearROI: number;
  
  // Context for display
  inferredRevenue: number;
  inferredHourlyRate: number;
  weeklyHoursSaved: number;
}

/**
 * Main calculation function
 */
export function calculateValue(inputs: ValueCalculatorInputs): ValueCalculationResult {
  const benchmark = INDUSTRY_BENCHMARKS[inputs.industry] || INDUSTRY_BENCHMARKS.other;
  
  // Infer revenue based on industry and stage
  const revenueRange = benchmark.revenueByStage[inputs.businessStage];
  const inferredRevenue = (revenueRange.min + revenueRange.max) / 2;
  
  // Get hourly rate from benchmark
  const inferredHourlyRate = benchmark.avgHourlyRate;
  
  // Calculate weekly hours saved
  const weeklyHoursSaved = TIME_IMPACT_HOURS[inputs.timeSaved] * TEAM_SIZE_MULTIPLIERS[inputs.teamSize];
  
  // 1. Labor Savings
  const laborSavings = calculateLaborSavings(weeklyHoursSaved, inferredHourlyRate);
  
  // 2. Revenue Impact (based on delay impact and inferred revenue)
  const revenueImpact = calculateRevenueImpact(
    inferredRevenue,
    inputs.delayImpact,
    inputs.businessStage
  );
  
  // 3. Error Reduction Savings
  const errorReduction = calculateErrorReduction(
    laborSavings,
    benchmark.errorCostMultiplier,
    inputs.delayImpact
  );
  
  // 4. Calculate base TAV (before strategic premium)
  const baseTAV = laborSavings + revenueImpact + errorReduction;
  
  // 5. Strategic Premium (based on growth challenge)
  const strategicPremiumRate = GROWTH_CHALLENGE_PREMIUMS[inputs.growthChallenge];
  const strategicPremium = baseTAV * strategicPremiumRate;
  
  // 6. Total Annual Value
  const totalAnnualValue = baseTAV + strategicPremium;
  
  // 7. Apply urgency multiplier to investment recommendation
  const urgencyMultiplier = URGENCY_MULTIPLIERS[inputs.urgency];
  
  // 8. Calculate investment recommendation (15-30% of TAV)
  const baseInvestmentMin = totalAnnualValue * 0.15;
  const baseInvestmentMax = totalAnnualValue * 0.30;
  
  const recommendedInvestmentMin = baseInvestmentMin * urgencyMultiplier;
  const recommendedInvestmentMax = baseInvestmentMax * urgencyMultiplier;
  const recommendedInvestmentAvg = (recommendedInvestmentMin + recommendedInvestmentMax) / 2;
  
  // 9. Calculate 3-year value (compound benefits)
  const threeYearValue = totalAnnualValue * 3.2;
  
  // 10. Calculate ROI metrics
  const paybackMonths = (recommendedInvestmentAvg / totalAnnualValue) * 12;
  const yearOneROI = ((totalAnnualValue - recommendedInvestmentAvg) / recommendedInvestmentAvg) * 100;
  const threeYearROI = ((threeYearValue - recommendedInvestmentAvg) / recommendedInvestmentAvg) * 100;
  
  return {
    laborSavings,
    revenueImpact,
    errorReduction,
    strategicPremium,
    totalAnnualValue,
    threeYearValue,
    recommendedInvestmentMin,
    recommendedInvestmentMax,
    recommendedInvestmentAvg,
    paybackMonths,
    yearOneROI,
    threeYearROI,
    inferredRevenue,
    inferredHourlyRate,
    weeklyHoursSaved,
  };
}

/**
 * Calculate labor savings
 * Formula: Hours saved per week × 52 weeks × Hourly rate × 0.7 (conservative)
 */
function calculateLaborSavings(weeklyHours: number, hourlyRate: number): number {
  return weeklyHours * 52 * hourlyRate * 0.7;
}

/**
 * Calculate revenue impact based on delay impact and business stage
 */
function calculateRevenueImpact(
  inferredRevenue: number,
  delayImpact: DelayImpact,
  businessStage: BusinessStage
): number {
  const impactMultiplier = DELAY_IMPACT_MULTIPLIERS[delayImpact];
  
  // Base revenue impact percentage by stage
  const stageImpactRate: Record<BusinessStage, number> = {
    startup: 0.10, // 10% revenue impact for startups
    growing: 0.08, // 8% for growing
    scaling: 0.06, // 6% for scaling
    established: 0.04, // 4% for established
  };
  
  const baseRate = stageImpactRate[businessStage];
  const adjustedRate = baseRate * (impactMultiplier / 2); // Normalize multiplier
  
  return inferredRevenue * adjustedRate;
}

/**
 * Calculate error reduction savings
 */
function calculateErrorReduction(
  laborSavings: number,
  errorCostMultiplier: number,
  delayImpact: DelayImpact
): number {
  // Base error cost as percentage of labor savings
  const baseErrorCost = laborSavings * 0.15; // 15% of labor cost typically goes to rework
  
  // Apply industry error multiplier
  const industryAdjusted = baseErrorCost * errorCostMultiplier;
  
  // If compliance or quality is a concern, increase error savings
  if (delayImpact === "compliance") {
    return industryAdjusted * 2.0; // Double for compliance issues
  }
  
  return industryAdjusted;
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
}
