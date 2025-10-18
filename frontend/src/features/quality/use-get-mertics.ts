import { qualityService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export function useGetQualityMetrics(startTime: string, endTime: string) {
  const { data = null, isLoading } = useQuery({
    queryKey: ['quality-metric'],
    queryFn: () => qualityService.getMetrics(startTime, endTime),
  });

  return { data, isLoading };
}
