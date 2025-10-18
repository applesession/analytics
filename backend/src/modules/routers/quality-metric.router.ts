import { qualityMetricController } from '../../modules/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', qualityMetricController.getMetrics);

export default router;
