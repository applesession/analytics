import { conversionService } from '@/services';

import { useQuery } from '@tanstack/react-query';

export function useGetConvesionMetrics(startTime: Date, endTime: Date) {
  const { data = null, isLoading } = useQuery({
    queryKey: ['conversion-metric', startTime, endTime],
    queryFn: () => conversionService.getMetrics(startTime.toISOString(), endTime.toISOString()),
  });

  return { data, isLoading };
}
