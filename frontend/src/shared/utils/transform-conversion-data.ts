import type { IConversion } from '../types';

interface IConversionItem {
  stage: string;
  count: number;
}

export function transformConversionData(data: IConversion | null): IConversionItem[] | [] {
  if (!data) return [];

  const counters: IConversionItem[] = Object.entries(data.counters).map(([key, value]) => ({
    stage: key,
    count: value,
  }));

  const percentages: IConversionItem[] = Object.entries(data.percentages).map(([key, value]) => ({
    stage: key,
    count: value,
  }));

  return [...counters, ...percentages];
}
