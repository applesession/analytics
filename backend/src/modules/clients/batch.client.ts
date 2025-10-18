import { OpenAI } from 'openai';
import { Readable } from 'stream';
import { Prisma } from '@/generated/prisma';
import { readJsonLines } from '@/shared/utils';
import { batchRequestService } from '@/modules/services';
import fs from 'fs';

class BatchClient {
  private client = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] });

  async create(fileObject: OpenAI.Files.FileObject) {
    return this.client.batches.create({
      input_file_id: fileObject.id,
      endpoint: '/v1/chat/completions',
      completion_window: '24h',
    });
  }

  async uploadFile(filePath: string) {
    return this.client.files.create({
      file: fs.createReadStream(filePath),
      purpose: 'batch',
    });
  }

  async check(id: string) {
    return this.client.batches.retrieve(id);
  }

  async getContent(outputFileId: string, batchId: string) {
    const stream = await this.getFileStream(outputFileId);
    const lines = readJsonLines(stream);

    const requests: Prisma.BatchRequestCreateManyInput[] = [];
    const dialogMetrics: Prisma.DialogMetricCreateManyInput[] = [];

    for await (const json of lines) {
      const data = batchRequestService.parse(json, batchId);
      if (!data) continue;

      requests.push(data.request);
      dialogMetrics.push(data.dialogMetric);
    }

    return { requests, dialogMetrics };
  }

  private async getFileStream(fileId: string) {
    const response = await this.client.files.content(fileId);
    return Readable.fromWeb(response.body as any);
  }
}

export const batchClient = new BatchClient();
