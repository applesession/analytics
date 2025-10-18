import { IDialogMessages, IMessageLite } from '@/shared/types/message.type';
import { Batch as OpenAIBatch } from 'openai/resources/batches';
import { IBatchRequest } from '@/shared/types';
import { dialogMetricSchema, PROMPT } from '@/shared/config';
import { prisma } from '@/shared/api';

class BatchService {
  private PROMPT = PROMPT;

  async create(batch: OpenAIBatch) {
    return prisma.batch.create({
      data: {
        id: batch.id,
        status: batch.status,
        errorFileId: batch.error_file_id,
        inputFileId: batch.input_file_id,
        outputFileId: batch.output_file_id,
      },
    });
  }

  async update(batch: OpenAIBatch) {
    return prisma.batch.update({
      where: { id: batch.id },
      data: {
        status: batch.status,
        errorFileId: batch.error_file_id,
        inputFileId: batch.input_file_id,
        outputFileId: batch.output_file_id,
      },
    });
  }

  async findPending() {
    return prisma.batch.findMany({
      where: { status: { in: ['validating', 'in_progress', 'finalizing'] } },
    });
  }

  prepareBatch(grouped: IDialogMessages): IBatchRequest[] {
    return Object.entries(grouped).map(([id, messages]) => ({
      custom_id: id,
      method: 'POST',
      url: '/v1/chat/completions',
      body: {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: this.PROMPT },
          ...messages.map((message) => ({
            role: this.normalizeRole(message.role),
            content: message.message,
          })),
        ],
        response_format: {
          type: 'json_schema',
          json_schema: { name: 'schema', schema: dialogMetricSchema },
        },
      } as IBatchRequest['body'],
    }));
  }

  private normalizeRole(role: IMessageLite['role']) {
    if (role === 'human') return 'user';
    if (role === 'bot') return 'assistant';
    return 'bot';
  }
}

export const batchService = new BatchService();
