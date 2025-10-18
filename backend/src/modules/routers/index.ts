import { Router } from 'express';
import conversionRouter from './conversion-metric.router';
import qualityRouter from './quality-metric.router';

const router = Router();

router.use('/conversion', conversionRouter);
router.use('/quality', qualityRouter);

export default router;
