# Database Setup for Amigos Exatec

This document outlines the PostgreSQL database structure for the Amigos Exatec Alumni Association application.

## Database: PostgreSQL on Hostinger VPS

### Tables

#### 1. Users
Stores user account information and profile data.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    campus VARCHAR(100),
    graduation_year INTEGER,
    association_id INTEGER REFERENCES cities(id),
    is_subscribed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Cities
Stores city/association information.

```sql
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly name (e.g., 'dallas', 'new-york')
    description TEXT,
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Events
Stores event information linked to cities.

```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_past_event BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_events_city_id ON events(city_id);
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_events_is_featured ON events(is_featured);
CREATE INDEX idx_events_is_past_event ON events(is_past_event);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_association_id ON users(association_id);
CREATE INDEX idx_cities_slug ON cities(slug);
```

### Sample Data

```sql
-- Insert sample cities
INSERT INTO cities (name, slug, description, member_count) VALUES
('Dallas', 'dallas', 'Tec de Monterrey Alumni Association - Dallas Chapter', 100),
('New York', 'new-york', 'Tec de Monterrey Alumni Association - New York Chapter', 150),
('Chicago', 'chicago', 'Tec de Monterrey Alumni Association - Chicago Chapter', 80),
('San Antonio', 'san-antonio', 'Tec de Monterrey Alumni Association - San Antonio Chapter', 60),
('Houston', 'houston', 'Tec de Monterrey Alumni Association - Houston Chapter', 90);

-- Insert sample events
INSERT INTO events (city_id, title, description, event_date, location, image_url, is_featured, is_past_event) VALUES
(1, 'Networking Event 2024', 'Join us for an evening of networking and connections with fellow alumni.', '2024-03-15', 'Dallas, TX', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop', true, false),
(1, 'Annual Gala Dinner', 'Celebrate our achievements and reconnect with old friends at our annual gala.', '2024-04-20', 'Dallas, TX', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=400&fit=crop', false, false),
(1, 'Professional Development Workshop', 'Enhance your skills with our exclusive professional development session.', '2024-05-10', 'Dallas, TX', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop', false, false);
```

## API Endpoints (To be implemented)

### Events
- `GET /api/cities/:citySlug/events` - Get all events for a city
- `GET /api/cities/:citySlug/events/:eventId` - Get event details
- `GET /api/cities/:citySlug/events/featured` - Get featured event
- `GET /api/cities/:citySlug/events/past` - Get past events

### Cities
- `GET /api/cities` - Get all cities
- `GET /api/cities/:citySlug` - Get city details

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `DELETE /api/users/profile` - Delete user account (authenticated)

## Environment Variables

```env
# Database
DB_HOST=your_hostinger_vps_ip
DB_PORT=5432
DB_NAME=amigos_exatec
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Server
PORT=3000
NODE_ENV=production

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_key
```

## Connection Setup

The backend will use `pg` (node-postgres) library to connect to PostgreSQL:

```javascript
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
```

