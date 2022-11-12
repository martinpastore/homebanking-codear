export const riskAnalysisRules = (risk: number, amount: number): boolean => {
  if (risk >= 2 && amount > 100000) return false;
  else if (risk >= 5 && amount > 50000) return false;
  else if (risk >= 8 && amount > 25000) return false;
  else if (risk === 10) return false;

  return true;
};
