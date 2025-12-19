
/**
 * Logic: Jackie får kortison varannan dag.
 * Startdatum (Referens): 2025-12-19 (Då fick hon kortison).
 */
export const REFERENCE_DATE = new Date('2025-12-19T00:00:00');

export const isMedicationDay = (targetDate: Date): boolean => {
  const start = new Date(REFERENCE_DATE);
  start.setHours(0, 0, 0, 0);
  
  const current = new Date(targetDate);
  current.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const diffTime = current.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Even difference means it's a medication day (0, 2, 4... or -2, -4...)
  // Using modulo 2 and ensuring positive result for comparison
  return Math.abs(diffDays % 2) === 0;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('sv-SE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
