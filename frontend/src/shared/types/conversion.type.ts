export interface IConversion {
  counters: IConversionCounters;
  percentages: IConversionPercentages;
}

interface IConversionCounters {
  dialogsStarted: number;
  servicesChosen: number;
  specialistsChosen: number;
  recordsMade: number;
  visitsMade: number;
}

interface IConversionPercentages {
  dropoffPercent: number;
}
