import express from 'express';
import { fetchUserMetrics, submitUserMetrics } from '../modules/metrics/userMetricsController';

const router = express.Router();

router.post('/submit-metrics', submitUserMetrics);
router.get('/metrics', fetchUserMetrics);

export default router;
