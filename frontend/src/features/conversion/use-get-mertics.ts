import { conversionService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export function useGetMetrics(startTime: string, endTime: string) {
  const { data = { counters: [], percentages: [] }, isLoading } = useQuery({
    queryKey: ['conversion-metric'],
    queryFn: () => conversionService.getMetrics(startTime, endTime),
  });

  return { data, isLoading };
}
