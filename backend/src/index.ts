import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import journeyRoutes from './routes/journey';
import pool from './db';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/journey', journeyRoutes);

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Homey backend server running on http://localhost:${PORT}`);
});
