import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './config/db.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.put('/api/journey-steps/:stepId/complete', async (req, res) => {
  const stepId = Number(req.params.stepId);
  const { isCompleted } = req.body;

  if (!Number.isInteger(stepId) || stepId < 1) {
    return res.status(400).json({ error: 'stepId must be a positive integer.' });
  }

  if (typeof isCompleted !== 'boolean') {
    return res.status(400).json({ error: 'isCompleted must be a boolean.' });
  }

  try {
    const result = await query(
      `
      UPDATE journey_steps
      SET is_completed = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE step_id = $2
      RETURNING step_id, user_id, category, task_name, is_completed, updated_at
      `,
      [isCompleted, stepId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Journey step not found.' });
    }

    return res.json({ updatedStep: result.rows[0] });
  } catch (error) {
    console.error('Failed to update journey step:', error);
    return res.status(500).json({ error: 'Database update failed.' });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});