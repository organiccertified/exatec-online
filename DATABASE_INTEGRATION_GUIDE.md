# Database Integration Guide

## Overview
The application has been prepared for PostgreSQL database integration on Hostinger VPS. The frontend now navigates to event detail pages using the route pattern `/:city/event/:eventId`.

## Changes Made

### Frontend Changes

1. **New Component: `EventDetail.jsx`**
   - Created event detail page component
   - Route: `/:city/event/:eventId`
   - Currently uses placeholder data (ready for API integration)
   - Includes loading and error states

2. **Updated Navigation**
   - "Learn More" buttons now navigate to `/:city/event/:eventId`
   - Featured Event button navigates to `/:selectedOrg/event/:eventId`
   - Next Events carousel buttons navigate to `/:selectedOrg/event/:eventId`

3. **Route Added**
   - Added route in `App.jsx`: `<Route path="/:city/event/:eventId" element={<EventDetail selectedOrg={selectedOrg} />} />`

### Backend Preparation

1. **Database Schema Documentation**
   - Created `backend/DATABASE_SETUP.md` with:
     - PostgreSQL table schemas (Users, Cities, Events)
     - Indexes for performance
     - Sample data
     - API endpoint specifications

## Next Steps for Database Integration

### 1. Install PostgreSQL Dependencies

```bash
cd backend
npm install pg dotenv
```

### 2. Set Up Database Connection

Create `backend/config/database.js`:

```javascript
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;
```

### 3. Create Environment File

Create `backend/.env`:

```env
DB_HOST=your_hostinger_vps_ip
DB_PORT=5432
DB_NAME=amigos_exatec
DB_USER=your_db_user
DB_PASSWORD=your_db_password
PORT=3000
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key
```

### 4. Implement API Endpoints

Create routes in `backend/routes/events.js`:

```javascript
import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/cities/:citySlug/events/:eventId
router.get('/:citySlug/events/:eventId', async (req, res) => {
  try {
    const { citySlug, eventId } = req.params;
    
    const result = await pool.query(`
      SELECT e.*, c.name as city_name, c.slug as city_slug
      FROM events e
      JOIN cities c ON e.city_id = c.id
      WHERE c.slug = $1 AND e.id = $2
    `, [citySlug, eventId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

### 5. Update Frontend to Use API

In `frontend/src/components/EventDetail.jsx`, replace the placeholder fetch:

```javascript
const response = await fetch(`/api/cities/${city}/events/${eventId}`);
const data = await response.json();
setEvent(data);
```

### 6. Set Up CORS

In `backend/server.js`:

```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## Database Tables

### Users
- User accounts and profiles
- Linked to cities via `association_id`

### Cities
- City/association information
- URL-friendly slugs (dallas, new-york, etc.)

### Events
- Event information
- Linked to cities via `city_id`
- Supports featured and past events

## URL Structure

- Event Detail: `/:city/event/:eventId`
  - Example: `/Dallas/event/1`
  - Example: `/New-York/event/5`

The city parameter should match the city slug in the database.

## Testing

1. Test navigation from "Learn More" buttons
2. Verify route parameters are captured correctly
3. Test loading and error states
4. Once API is connected, test data fetching

## Notes

- City names in URLs should match the `slug` field in the `cities` table
- Event IDs come from the database `events.id` field
- The frontend currently uses placeholder data until the API is connected

