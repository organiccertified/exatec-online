# Database Connection Checklist for Cities API

This checklist covers everything needed to connect the cities/chapters API to PostgreSQL.

## ✅ What's Already Done

1. **API Route Created**: `backend/routes/cities.js` ✅
2. **Database Config**: `backend/config/database.js` ✅
3. **Dependencies**: `pg` and `dotenv` are in `package.json` ✅
4. **Server Setup**: Routes registered in `server.js` ✅

## 📋 What You Need to Do

### 1. Install Missing Dependencies

The backend needs `express` and `cors` packages:

```bash
cd backend
npm install express cors
```

**Current dependencies in package.json:**
- ✅ `pg` - PostgreSQL client
- ✅ `dotenv` - Environment variables
- ❌ `express` - Web framework (NEEDED)
- ❌ `cors` - CORS middleware (NEEDED)

### 2. Create Environment Files

Copy the example files and fill in your Hostinger VPS credentials:

```bash
cd backend
cp env.example.development .env.development
cp env.example.production .env.production
```

**Update `.env.development` with your TEST database:**
```env
NODE_ENV=development
PORT=3001

# Test Database (Hostinger VPS)
DB_HOST_TEST=your-hostinger-vps-ip-or-domain
DB_PORT_TEST=5432
DB_NAME_TEST=amigos_exatec_test
DB_USER_TEST=your_db_username
DB_PASSWORD_TEST=your_db_password

FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_dev
DB_SSL=true
```

**Update `.env.production` with your PRODUCTION database:**
```env
NODE_ENV=production
PORT=3001

# Production Database (Hostinger VPS)
DB_HOST_PROD=your-hostinger-vps-ip-or-domain
DB_PORT_PROD=5432
DB_NAME_PROD=amigos_exatec_prod
DB_USER_PROD=your_db_username
DB_PASSWORD_PROD=your_db_password

FRONTEND_URL=https://exatec.online
JWT_SECRET=your_jwt_secret_key_prod
DB_SSL=true
```

### 3. Create PostgreSQL Databases on Hostinger VPS

You need to create **TWO** databases:

**Test Database:**
```sql
CREATE DATABASE amigos_exatec_test;
```

**Production Database:**
```sql
CREATE DATABASE amigos_exatec_prod;
```

### 4. Create the Cities Table

Run this SQL in **BOTH** databases (test and production):

```sql
-- Create cities table
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster lookups
CREATE INDEX idx_cities_slug ON cities(slug);
```

### 5. Insert Sample Data

Insert some cities to test with:

```sql
-- Insert sample cities
INSERT INTO cities (name, slug, description, member_count) VALUES
('Dallas', 'dallas', 'Tec de Monterrey Alumni Association - Dallas Chapter', 100),
('New York', 'new-york', 'Tec de Monterrey Alumni Association - New York Chapter', 150),
('Chicago', 'chicago', 'Tec de Monterrey Alumni Association - Chicago Chapter', 80),
('San Antonio', 'san-antonio', 'Tec de Monterrey Alumni Association - San Antonio Chapter', 60),
('Houston', 'houston', 'Tec de Monterrey Alumni Association - Houston Chapter', 90);
```

### 6. Test the Connection

**Start the backend server:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Backend server running on port 3001
📦 Environment: development
🗄️  Database: TEST
Database connection: TEST
Database: amigos_exatec_test on your-host:5432
✅ Database connected successfully
```

**Test the API:**
```bash
# In another terminal or browser
curl http://localhost:3001/api/cities
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Chicago",
      "slug": "chicago",
      "description": "...",
      "member_count": 80,
      "created_at": "...",
      "updated_at": "..."
    },
    ...
  ],
  "count": 5
}
```

### 7. Update Frontend API URL

Make sure your frontend `.env.development` points to your backend:

```env
# frontend/.env.development
VITE_API_URL_TEST=http://localhost:3001/api
```

## 🔍 Troubleshooting

### Connection Refused
- Check if PostgreSQL is running on Hostinger VPS
- Verify the IP/domain and port (usually 5432)
- Check firewall settings

### Authentication Failed
- Verify username and password
- Check if user has access to the database
- Ensure SSL is configured correctly

### Table Doesn't Exist
- Run the CREATE TABLE SQL script
- Verify you're connected to the correct database
- Check database name in `.env` file

### SSL Connection Error
- Set `DB_SSL=true` in `.env` file
- Or set `DB_SSL=false` if SSL is not required

## 📝 Quick Start Commands

```bash
# 1. Install dependencies
cd backend
npm install express cors

# 2. Create environment files
cp env.example.development .env.development
cp env.example.production .env.production

# 3. Edit .env.development with your credentials

# 4. Start server
npm run dev

# 5. Test API
curl http://localhost:3001/api/cities
```

## ✅ Verification Checklist

- [ ] `express` and `cors` installed
- [ ] `.env.development` file created with correct credentials
- [ ] `.env.production` file created with correct credentials
- [ ] Test database created on Hostinger VPS
- [ ] Production database created on Hostinger VPS
- [ ] `cities` table created in both databases
- [ ] Sample data inserted
- [ ] Backend server starts without errors
- [ ] API endpoint `/api/cities` returns data
- [ ] Frontend can fetch cities from API
