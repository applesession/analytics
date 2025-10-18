import { prisma } from '../../shared/api';

interface IDialogConversionMetric {
  dialogsStarted: number;
  servicesChosen: number;
  specialistsChosen: number;
  recordsMade: number;
  visitsMade: number;
}

class DialogMetricService {
  async getConversionMetric(batchId: string) {
    return await prisma.$queryRaw<IDialogConversionMetric[]>`
      SELECT
        COUNT(CASE WHEN dm.dialog_started THEN 1 END)::int AS "dialogsStarted",
        COUNT(CASE WHEN dm.service_chosen THEN 1 END)::int AS "servicesChosen",
        COUNT(CASE WHEN dm.specialist_chosen THEN 1 END)::int AS "specialistsChosen",
        COUNT(CASE WHEN dm.recorded THEN 1 END)::int AS "recordsMade",
        COUNT(CASE WHEN dm.visited THEN 1 END)::int AS "visitsMade"
      FROM dialog_metric dm
      JOIN batch_request br ON br.id = dm.batch_request_id
      WHERE br.batch_id = ${batchId};`;
  }

  async getQualityMetric(batchId: string) {
    return await prisma.dialogMetric.aggregate({
      where: { batchRequest: { batchId } },
      _avg: {
        messagesBeforeRecord: true,
        scriptAdherencePercent: true,
        leadingQuestionsPercent: true,
      },
    });
  }
}

export const dialogMetricService = new DialogMetricService();
