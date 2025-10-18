import { batchService, messageService } from '../modules/services';
import { batchClient } from '../modules/clients';
import { saveJsonLines } from '../shared/utils';

export async function createBatch() {
  try {
    const messages = await messageService.getMessages();
    const grouped = messageService.groupAndSortMessages(messages);
    const prepared = batchService.prepareBatch(grouped);

    const filePath = await saveJsonLines(prepared, 'batch-messages');

    const fileObject = await batchClient.uploadFile(filePath);
    const batch = await batchClient.create(fileObject);
    await batchService.create(batch);
  } catch (error) {
    console.log('error', error);
  }
}

if (require.main === module) {
  createBatch();
}
