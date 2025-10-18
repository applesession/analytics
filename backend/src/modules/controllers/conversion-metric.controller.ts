import { conversionMetricService } from '../../modules/services';
import { Request, Response } from 'express';

class ConversionMetricController {
  async getMetrics(req: Request, res: Response) {
    try {
      const startTime = req.query.startTime as string;
      const endTime = req.query.endTime as string;

      if (!startTime || !endTime)
        return res.status(400).json({ error: 'startTime and endTime are required' });

      const result = await conversionMetricService.getMetrics(startTime, endTime);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

export const conversionMetricController = new ConversionMetricController();
