import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ROIResults {
  totalAnnualValue: number;
  monthlySavings: number;
  hoursSaved: number;
  timeReduction: number;
  perPersonHoursSaved?: number;
  recommendedInvestmentMin?: number;
  recommendedInvestmentMax?: number;
  paybackMonths?: number;
  yearOneROI?: number;
  threeYearROI?: number;
}

interface ROIInputs {
  industry?: string;
  businessStage?: string;
  teamSize?: string;
  salaryRange?: string;
  timeSaved?: string;
}

interface ROIContextType {
  results: ROIResults | null;
  setResults: (results: ROIResults) => void;
  inputs: ROIInputs | null;
  setInputs: (inputs: ROIInputs) => void;
}

const ROIContext = createContext<ROIContextType | undefined>(undefined);

export function ROIProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<ROIResults | null>(null);
  const [inputs, setInputs] = useState<ROIInputs | null>(null);

  return (
    <ROIContext.Provider value={{ results, setResults, inputs, setInputs }}>
      {children}
    </ROIContext.Provider>
  );
}

export function useROI() {
  const context = useContext(ROIContext);
  if (context === undefined) {
    throw new Error('useROI must be used within an ROIProvider');
  }
  return context;
}
