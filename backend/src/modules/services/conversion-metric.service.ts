import { dialogMetricService } from '../../modules/services';
import { prisma } from '../../shared/api';

class ConversionMetricService {
  async getMetrics(startTime: string, endTime: string) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const { _sum, _avg } = await prisma.conversionMetric.aggregate({
      where: { createdAt: { gte: startDate, lte: endDate } },
      _sum: {
        dialogsStarted: true,
        servicesChosen: true,
        specialistsChosen: true,
        recordsMade: true,
        visitsMade: true,
      },
      _avg: { dropoffPercent: true },
    });

    return {
      counters: {
        dialogsStarted: _sum.dialogsStarted ?? 0,
        servicesChosen: _sum.servicesChosen ?? 0,
        specialistsChosen: _sum.specialistsChosen ?? 0,
        recordsMade: _sum.recordsMade ?? 0,
        visitsMade: _sum.visitsMade ?? 0,
      },
      percentages: {
        dropoffPercent: _avg.dropoffPercent ?? 0,
      },
    };
  }

  async calculateAndSave(batchId: string) {
    const aggregates = await dialogMetricService.getConversionMetric(batchId);
    const counts = aggregates[0];

    const dropoffPercent = this.calculateDropoffPercent(counts.dialogsStarted, counts.visitsMade);

    await prisma.conversionMetric.upsert({
      where: { batchId },
      update: { ...counts },
      create: { batchId, dropoffPercent, ...counts },
    });
  }

  private calculateDropoffPercent(dialogsStarted: number, visitsMade: number) {
    return ((dialogsStarted - visitsMade) / dialogsStarted) * 100 || null;
  }
}

export const conversionMetricService = new ConversionMetricService();
