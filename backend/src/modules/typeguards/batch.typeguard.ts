import { Batch } from '../../generated/prisma';
import { TDialogMetric } from '../../shared/types';

class BatchTypeguard {
  isCompleted = (batch: Batch): batch is Batch & { outputFileId: string } => {
    const hasOutputFile = typeof batch.outputFileId === 'string' && batch.outputFileId.length > 0;
    return batch.status === 'completed' && hasOutputFile;
  };

  // fix: сырой typeguard
  isDialogMetric(obj: any): obj is TDialogMetric {
    if (typeof obj !== 'object' || obj === null) return false;

    const requiredKeys = [
      'dialogStarted',
      'serviceChosen',
      'specialistChosen',
      'recorded',
      'visited',
      'messagesBeforeRecord',
      'scriptAdherencePercent',
      'leadingQuestionsPercent',
    ];

    if ('type' in obj && 'properties' in obj) return false;

    return requiredKeys.every((key) => key in obj);
  }
}

export const batchTypeguard = new BatchTypeguard();
