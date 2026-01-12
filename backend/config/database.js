import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Determine which database to use based on NODE_ENV
const getDatabaseConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // Development: Connect to TEST database
    return {
      host: process.env.DB_HOST_TEST || process.env.DB_HOST,
      port: process.env.DB_PORT_TEST || process.env.DB_PORT || 5432,
      database: process.env.DB_NAME_TEST || process.env.DB_NAME,
      user: process.env.DB_USER_TEST || process.env.DB_USER,
      password: process.env.DB_PASSWORD_TEST || process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    };
  } else {
    // Production: Connect to PRODUCTION database
    return {
      host: process.env.DB_HOST_PROD || process.env.DB_HOST,
      port: process.env.DB_PORT_PROD || process.env.DB_PORT || 5432,
      database: process.env.DB_NAME_PROD || process.env.DB_NAME,
      user: process.env.DB_USER_PROD || process.env.DB_USER,
      password: process.env.DB_PASSWORD_PROD || process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    };
  }
};

const config = getDatabaseConfig();

const pool = new Pool(config);

// Log which database we're connecting to (without sensitive info)
console.log(`Database connection: ${process.env.NODE_ENV === 'development' ? 'TEST' : 'PRODUCTION'}`);
console.log(`Database: ${config.database} on ${config.host}:${config.port}`);

// Test connection
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

export default pool;
