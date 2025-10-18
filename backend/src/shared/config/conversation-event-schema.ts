import type { JSONSchema } from 'json-schema-to-ts';

export const dialogMetricSchema = {
  type: 'object',
  properties: {
    dialogStarted: { type: 'boolean' },
    serviceChosen: { type: 'boolean' },
    specialistChosen: { type: 'boolean' },
    recorded: { type: 'boolean' },
    visited: { type: 'boolean' },
    messagesBeforeRecord: { type: ['integer', 'null'] },
    scriptAdherencePercent: { type: 'integer', minimum: 0, maximum: 100 },
    leadingQuestionsPercent: { type: 'integer', minimum: 0, maximum: 100 },
  },
  required: [
    'dialogStarted',
    'serviceChosen',
    'specialistChosen',
    'recorded',
    'visited',
    'messagesBeforeRecord',
    'scriptAdherencePercent',
    'leadingQuestionsPercent',
  ],
} as const satisfies JSONSchema;
