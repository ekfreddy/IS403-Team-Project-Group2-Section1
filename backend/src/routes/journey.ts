import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET /api/journey/:userId - Get all journey steps for a user
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM journey_steps WHERE user_id = $1 ORDER BY step_id',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching journey steps:', error);
    res.status(500).json({ error: 'Failed to fetch journey steps' });
  }
});

// PUT /api/journey/:stepId/toggle - Toggle a journey step's completion status
router.put('/:stepId/toggle', async (req: Request, res: Response) => {
  try {
    const { stepId } = req.params;

    // Toggle is_completed and update timestamp
    const result = await pool.query(
      `UPDATE journey_steps 
       SET is_completed = NOT is_completed, updated_at = CURRENT_TIMESTAMP 
       WHERE step_id = $1 
       RETURNING *`,
      [stepId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Journey step not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error toggling journey step:', error);
    res.status(500).json({ error: 'Failed to update journey step' });
  }
});

export default router;
