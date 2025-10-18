import { dialogMetricService } from '../../modules/services';
import { prisma } from '../../shared/api';

class QualityMetricService {
  async getMetrics(startTime: string, endTime: string) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const { _avg } = await prisma.qualityMetric.aggregate({
      where: { createdAt: { gte: startDate, lte: endDate } },
      _avg: {
        avgMessagesBeforeRecord: true,
        leadingQuestionsPercent: true,
        scriptAdherencePercent: true,
      },
    });

    return {
      counters: {
        avgMessagesBeforeRecord: _avg.avgMessagesBeforeRecord ?? 0,
      },
      percentages: {
        leadingQuestionsPercent: _avg.leadingQuestionsPercent ?? 0,
        scriptAdherencePercent: _avg.scriptAdherencePercent ?? 0,
      },
    };
  }

  async calculateAndSave(batchId: string) {
    const { _avg } = await dialogMetricService.getQualityMetric(batchId);

    const avgMessagesBeforeRecord = _avg.messagesBeforeRecord ?? 0;
    const scriptAdherencePercent = _avg.scriptAdherencePercent ?? 0;
    const leadingQuestionsPercent = _avg.leadingQuestionsPercent ?? 0;

    const qualityMetric = await prisma.qualityMetric.upsert({
      where: { batchId },
      update: { avgMessagesBeforeRecord, scriptAdherencePercent, leadingQuestionsPercent },
      create: { batchId, avgMessagesBeforeRecord, scriptAdherencePercent, leadingQuestionsPercent },
    });

    return qualityMetric;
  }
}

export const qualityMetricService = new QualityMetricService();
