# Quick Setup Instructions

## Environment Configuration

### Step 1: Create Environment Files

**Frontend:**
```bash
# Copy example files to actual .env files
cd frontend
cp env.example.development .env.development
cp env.example.production .env.production
```

**Backend:**
```bash
# Copy example files to actual .env files
cd backend
cp env.example.development .env.development
cp env.example.production .env.production
```

### Step 2: Update Environment Variables

**Frontend `.env.development`:**
```env
VITE_API_URL_TEST=https://your-hostinger-vps.com/api
```

**Frontend `.env.production`:**
```env
VITE_API_URL_PROD=https://your-hostinger-vps.com/api
```

**Backend `.env.development`:**
```env
NODE_ENV=development
DB_HOST_TEST=your-hostinger-vps-ip
DB_NAME_TEST=amigos_exatec_test
DB_USER_TEST=your_db_user
DB_PASSWORD_TEST=your_test_db_password
```

**Backend `.env.production`:**
```env
NODE_ENV=production
DB_HOST_PROD=your-hostinger-vps-ip
DB_NAME_PROD=amigos_exatec_prod
DB_USER_PROD=your_db_user
DB_PASSWORD_PROD=your_prod_db_password
```

## How It Works

### Development Mode (`npm run dev`)

**Frontend:**
- Runs locally on `http://localhost:5173`
- Uses `.env.development`
- API calls go to **TEST** database endpoint

**Backend:**
- Runs locally on `http://localhost:3001`
- Uses `.env.development`
- Connects to **TEST** database on Hostinger VPS

### Production Build (`npm run build`)

**Frontend:**
- Builds to `frontend/dist/`
- Uses `.env.production`
- API calls go to **PRODUCTION** database endpoint
- Ready for deployment to GitHub/Hostinger

**Backend:**
- Uses `.env.production` when running `npm start`
- Connects to **PRODUCTION** database on Hostinger VPS

## Important Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Test database** is separate from production database
3. Environment is automatically detected:
   - `npm run dev` → Development (TEST database)
   - `npm run build` → Production (PRODUCTION database)
