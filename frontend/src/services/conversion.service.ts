import { instance } from '@/shared/api/instance';
import type { IConversion } from '@/shared/types';

class ConversionService {
  private readonly base = 'conversion';

  async getMetrics(startTime: string, endTime: string) {
    const response = await instance.get<IConversion>(this.base, { params: { startTime, endTime } });
    return response.data;
  }
}

export const conversionService = new ConversionService();
