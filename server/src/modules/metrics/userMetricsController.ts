// controllers/userController.ts
import { Request, Response } from 'express';
import { getUserMetricsByUserId, updateUserAndCreateMetrics } from './metricsService';

export const submitUserMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await updateUserAndCreateMetrics(req.body);
    res.status(201).json({ message: 'Metrics submitted successfully', metrics });
  } catch (error) {
    console.error('Error submitting metrics:', error);
    res.status(500).json({ error: 'Failed to submit metrics', details: error });
  }
};


export const fetchUserMetrics = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ message: 'Missing userId in query' });
      return 
    }

    const metrics = await getUserMetricsByUserId(userId);

    if (!metrics) {
      res.status(404).json({ message: 'No metrics found for this user' });
      return 
    }

    res.json({
      bmi: metrics.bmi,
      bmiCategory: metrics.bmiCategory,
      date: metrics.date,
    });
  } catch (error) {
    console.error('Error fetching user metrics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

