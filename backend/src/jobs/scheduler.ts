import { createBatch } from './create-batch';
import { processBatch } from './process-batch';
import cron from 'node-cron';

cron.schedule('0 0 0 * * *', createBatch);
cron.schedule('0 0 */2 * * *', processBatch);
