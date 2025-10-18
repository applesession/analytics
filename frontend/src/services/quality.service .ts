import { instance } from '@/shared/api/instance';
import type { IQuality } from '@/shared/types';

class QualityService {
  private readonly base = 'quality';

  async getMetrics(startTime: string, endTime: string) {
    const response = await instance.get<IQuality>(this.base, { params: { startTime, endTime } });
    return response.data;
  }
}

export const qualityService = new QualityService();
