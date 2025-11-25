import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ROIResults {
  totalAnnualValue: number;
  monthlySavings: number;
  hoursSaved: number;
  timeReduction: number;
}

interface ROIContextType {
  results: ROIResults | null;
  setResults: (results: ROIResults) => void;
}

const ROIContext = createContext<ROIContextType | undefined>(undefined);

export function ROIProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<ROIResults | null>(null);

  return (
    <ROIContext.Provider value={{ results, setResults }}>
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
