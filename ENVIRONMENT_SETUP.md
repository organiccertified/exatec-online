# Environment Setup Guide

This project uses separate environments for development and production, with different database connections.

## Overview

- **Development (`npm run dev`)**: Frontend runs locally, connects to **TEST** database on Hostinger VPS
- **Production (`npm run build`)**: Frontend builds for production, connects to **PRODUCTION** database on Hostinger VPS

## Frontend Configuration

### Environment Files

1. **`.env.development`** - Used when running `npm run dev`
   - Frontend runs on `http://localhost:5173`
   - API points to test database endpoint

2. **`.env.production`** - Used when running `npm run build`
   - Frontend builds for deployment
   - API points to production database endpoint

### Setup Steps

1. Copy `.env.example` to `.env.development` and `.env.production`
2. Update the API URLs in both files:
   ```env
   # .env.development
   VITE_API_URL_TEST=https://your-hostinger-vps.com/api
   
   # .env.production
   VITE_API_URL_PROD=https://your-hostinger-vps.com/api
   ```

3. The API configuration is automatically loaded from `frontend/src/config/api.js`

### Usage in Code

```javascript
import { API_BASE_URL, buildApiUrl } from './config/api'

// Use API_BASE_URL for base endpoint
const response = await fetch(`${API_BASE_URL}/cities/${city}/events/${eventId}`)

// Or use buildApiUrl helper
const response = await fetch(buildApiUrl(`/cities/${city}/events/${eventId}`))
```

## Backend Configuration

### Environment Files

1. **`.env.development`** - Used when running `npm run dev`
   - Backend connects to **TEST** database
   - Loads from `backend/.env.development`

2. **`.env.production`** - Used when running `npm start`
   - Backend connects to **PRODUCTION** database
   - Loads from `backend/.env.production`

### Setup Steps

1. Copy `backend/.env.example` to `backend/.env.development` and `backend/.env.production`

2. Update database credentials in both files:

   **`.env.development`** (Test Database):
   ```env
   NODE_ENV=development
   DB_HOST_TEST=your-hostinger-vps-ip
   DB_NAME_TEST=amigos_exatec_test
   DB_USER_TEST=your_db_user
   DB_PASSWORD_TEST=your_test_db_password
   ```

   **`.env.production`** (Production Database):
   ```env
   NODE_ENV=production
   DB_HOST_PROD=your-hostinger-vps-ip
   DB_NAME_PROD=amigos_exatec_prod
   DB_USER_PROD=your_db_user
   DB_PASSWORD_PROD=your_prod_db_password
   ```

3. The database configuration is automatically loaded from `backend/config/database.js`

### Database Connection Logic

The `backend/config/database.js` file automatically selects the correct database based on `NODE_ENV`:

- `NODE_ENV=development` → Uses `DB_*_TEST` variables → Connects to **TEST** database
- `NODE_ENV=production` → Uses `DB_*_PROD` variables → Connects to **PRODUCTION** database

## Running the Application

### Development Mode

**Frontend:**
```bash
cd frontend
npm run dev
```
- Runs on `http://localhost:5173`
- Uses `.env.development`
- API calls go to test database

**Backend:**
```bash
cd backend
npm run dev
```
- Runs on `http://localhost:3001`
- Uses `.env.development`
- Connects to **TEST** database

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```
- Builds to `frontend/dist/`
- Uses `.env.production`
- API calls go to production database
- Ready for deployment to GitHub/Hostinger

**Backend:**
```bash
cd backend
npm start
```
- Runs on configured port
- Uses `.env.production`
- Connects to **PRODUCTION** database

## Database Setup

You need to create two separate databases on your Hostinger VPS:

1. **Test Database**: `amigos_exatec_test`
   - Used for development and testing
   - Safe to modify without affecting production

2. **Production Database**: `amigos_exatec_prod`
   - Used for live production site
   - Only modified through production deployments

See `backend/DATABASE_SETUP.md` for database schema and setup instructions.

## Important Notes

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use `.env.example`** as a template for other developers
3. **Test database** should be a separate database, not just a different table
4. **Production database** should be backed up regularly
5. The environment is automatically detected based on the command used:
   - `npm run dev` → Development mode
   - `npm run build` / `npm start` → Production mode

## Troubleshooting

### Frontend not connecting to correct API
- Check that `.env.development` or `.env.production` exists
- Verify `VITE_API_URL_TEST` or `VITE_API_URL_PROD` is set correctly
- Restart the dev server after changing `.env` files

### Backend connecting to wrong database
- Check `NODE_ENV` environment variable
- Verify `.env.development` or `.env.production` exists in `backend/` folder
- Check database credentials match your Hostinger VPS setup

### Environment variables not loading
- Make sure `.env` files are in the correct directories
- Restart the server after changing `.env` files
- Check file names match exactly: `.env.development` and `.env.production`
