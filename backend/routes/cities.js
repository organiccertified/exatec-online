import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/cities - Get all cities/chapters
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        slug,
        description,
        member_count,
        created_at,
        updated_at
      FROM cities
      ORDER BY name ASC
    `);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cities',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/cities/:citySlug - Get city details by slug
router.get('/:citySlug', async (req, res) => {
  try {
    const { citySlug } = req.params;

    const result = await pool.query(`
      SELECT 
        id,
        name,
        slug,
        description,
        member_count,
        created_at,
        updated_at
      FROM cities
      WHERE slug = $1
    `, [citySlug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'City not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch city',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;
