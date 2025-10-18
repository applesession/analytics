import type { IQuality } from '../types';

interface IQualityItem {
  type: 'counter' | 'percent';
  name: string;
  value: number;
}

export function transformQualityData(data: IQuality | null): IQualityItem[] {
  if (!data) return [];

  const counters = Object.entries(data.counters).map(([key, value]) => ({
    type: 'counter' as const,
    name: key,
    value,
  }));

  const percentages = Object.entries(data.percentages).map(([key, value]) => ({
    type: 'percent' as const,
    name: key,
    value,
  }));

  return [...counters, ...percentages];
}
