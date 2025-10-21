import {
  batchService,
  batchRequestService,
  conversionMetricService,
  qualityMetricService,
} from '../modules/services';
import { batchTypeguard } from '../modules/typeguards';
import { batchClient } from '../modules/clients';
import { logger } from '../shared/utils';

export async function processBatch() {
  try {
    const pendings = await batchService.findPending();
    if (!pendings.length) return logger.info('No pending batches found');

    const checked = await Promise.all(pendings.map((batch) => batchClient.check(batch.id)));
    const updated = await Promise.all(checked.map((batch) => batchService.update(batch)));
    const completed = updated.filter(batchTypeguard.isCompleted);
    if (!completed.length) return logger.info('No completed batches found');

    for await (const batch of completed) {
      const result = await batchClient.getContent(batch.outputFileId, batch.id);

      await batchRequestService.createMany(result.requests, result.dialogMetrics);
      await conversionMetricService.calculateAndSave(batch.id);
      await qualityMetricService.calculateAndSave(batch.id);
    }
    logger.info('Finished processing batches');
  } catch (error) {
    logger.error('Failed to process batches', error);
  }
}

if (require.main === module) {
  processBatch();
}
