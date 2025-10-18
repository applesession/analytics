import { ChatCompletionCreateParams } from 'openai/resources/index';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { ChatCompletion } from 'openai/resources/index';
import { FromSchema } from 'json-schema-to-ts';
import { dialogMetricSchema } from '../config';

export interface IBatchRequest {
  custom_id: string;
  method: 'POST';
  url: '/v1/chat/completions';
  body: ChatCompletionCreateParams;
}

export interface IBatchResponse {
  id: string;
  custom_id: string;
  response: {
    status_code: number;
    request_id: string;
    body: ChatCompletion;
  } | null;
  error: InputJsonValue | undefined;
}

export type TDialogMetric = FromSchema<typeof dialogMetricSchema>;
