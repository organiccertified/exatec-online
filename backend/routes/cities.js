import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/cities - Get all chapters
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        chapter.id,
        chapter.name,
        chapter.slug,
        chapter.city,
        chapter.state,
        chapter.country,
        chapter.timezone,
        chapter.is_active,
        chapter.created_at,
        chapter.updated_at,
        COUNT(chapter_membership.user_id)::int AS member_count
      FROM chapter
      LEFT JOIN chapter_membership
        ON chapter_membership.chapter_id = chapter.id
        AND chapter_membership.left_at IS NULL
      WHERE chapter.is_active = true
      GROUP BY chapter.id
      ORDER BY chapter.name ASC
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

// GET /api/cities/:citySlug - Get chapter details by slug
router.get('/:citySlug', async (req, res) => {
  try {
    const { citySlug } = req.params;

    const result = await pool.query(`
      SELECT
        chapter.id,
        chapter.name,
        chapter.slug,
        chapter.city,
        chapter.state,
        chapter.country,
        chapter.timezone,
        chapter.is_active,
        chapter.created_at,
        chapter.updated_at,
        COUNT(chapter_membership.user_id)::int AS member_count
      FROM chapter
      LEFT JOIN chapter_membership
        ON chapter_membership.chapter_id = chapter.id
        AND chapter_membership.left_at IS NULL
      WHERE chapter.slug = $1
      GROUP BY chapter.id
    `, [citySlug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Chapter not found'
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
