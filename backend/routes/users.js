import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// POST /api/users/signup - Register a new user and add to chapter as member
router.post('/signup', async (req, res) => {
  const {
    association,
    firstName,
    lastName,
    email,
    phone
  } = req.body || {};

  if (!email || !association) {
    return res.status(400).json({
      success: false,
      error: 'Email and association are required'
    });
  }

  const client = await pool.connect();

  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const associationValue = String(association).trim();

    const chapterResult = await client.query(`
      SELECT id, name, slug
      FROM chapter
      WHERE slug = $1 OR name = $1
      LIMIT 1
    `, [associationValue]);

    if (chapterResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Association not found'
      });
    }

    await client.query('BEGIN');

    const userResult = await client.query(`
      INSERT INTO app_user (email, first_name, last_name, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name, phone, created_at
    `, [
      normalizedEmail,
      firstName ? String(firstName).trim() : null,
      lastName ? String(lastName).trim() : null,
      phone ? String(phone).trim() : null
    ]);

    await client.query(`
      INSERT INTO chapter_membership (chapter_id, user_id, role)
      VALUES ($1, $2, 'member')
      ON CONFLICT (chapter_id, user_id) DO NOTHING
    `, [chapterResult.rows[0].id, userResult.rows[0].id]);

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      data: {
        user: userResult.rows[0],
        chapter: chapterResult.rows[0]
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    const isDuplicate = error && error.code === '23505';
    res.status(isDuplicate ? 409 : 500).json({
      success: false,
      error: isDuplicate ? 'Email already registered' : 'Failed to register user',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  } finally {
    client.release();
  }
});

export default router;
