import { conversionMetricController } from '../../modules/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', conversionMetricController.getMetrics);

export default router;
