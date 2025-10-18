import { IBatchResponse, TDialogMetric } from '../../shared/types';
import { Prisma } from '../../generated/prisma';
import { prisma } from '../../shared/api';
import { batchTypeguard } from '../typeguards';

class BatchRequestService {
  async createMany(
    requests: Prisma.BatchRequestCreateManyInput[],
    dialogMetrics: Prisma.DialogMetricCreateManyInput[]
  ) {
    await prisma.$transaction(async (client) => {
      await client.batchRequest.createMany({ data: requests });
      await client.dialogMetric.createMany({ data: dialogMetrics });
    });
  }

  parse(json: IBatchResponse, batchId: string) {
    const content = json?.response?.body.choices[0].message.content?.trim();
    const response = json?.response;
    if (!content || !response) return null;

    try {
      const metrics: TDialogMetric = JSON.parse(content);

      if (!batchTypeguard.isDialogMetric(metrics)) return null;

      const request: Prisma.BatchRequestCreateManyInput = {
        id: json.id,
        batchId,
        model: response.body.model,
        statusCode: response.status_code,
        error: json.error,
      };

      const dialogMetric: Prisma.DialogMetricCreateManyInput = {
        id: response?.request_id,
        conversationId: json.custom_id,
        batchRequestId: json.id,
        ...metrics,
      };

      return { request, dialogMetric };
    } catch (error) {
      console.warn('Failed to parse content for', error);
      return null;
    }
  }
}

export const batchRequestService = new BatchRequestService();
