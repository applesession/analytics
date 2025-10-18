export interface IQuality {
  counters: IQualityCounters;
  percentages: IQualityPercentages;
}

interface IQualityCounters {
  avgMessagesBeforeRecord: number;
}

interface IQualityPercentages {
  leadingQuestionsPercent: number;
  scriptAdherencePercent: number;
}
