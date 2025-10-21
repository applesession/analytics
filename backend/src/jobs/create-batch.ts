import { batchService, messageService } from '../modules/services';
import { batchClient } from '../modules/clients';
import { logger, saveJsonLines } from '../shared/utils';

export async function createBatch() {
  try {
    logger.info('Start creating batch');
    const messages = await messageService.getMessages();
    const grouped = messageService.groupAndSortMessages(messages);
    const prepared = batchService.prepareBatch(grouped);

    const filePath = await saveJsonLines(prepared, 'batch-messages');

    const fileObject = await batchClient.uploadFile(filePath);
    const batch = await batchClient.create(fileObject);
    await batchService.create(batch);
    logger.info('Finished creating batch');
  } catch (error) {
    logger.error('Failed to create batch', error);
  }
}

if (require.main === module) {
  createBatch();
}
