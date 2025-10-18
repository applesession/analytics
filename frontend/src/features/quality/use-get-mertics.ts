import { qualityService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export function useGetQualityMetrics(startTime: Date, endTime: Date) {
  const { data = null, isLoading } = useQuery({
    queryKey: ['quality-metric', startTime, endTime],
    queryFn: () => qualityService.getMetrics(startTime.toISOString(), endTime.toISOString()),
  });

  return { data, isLoading };
}
