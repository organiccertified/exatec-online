// API Configuration
// This file determines which API endpoint to use based on the environment

const getApiUrl = () => {
  // In development mode, use test database API
  // In production build, use production database API
  if (import.meta.env.MODE === 'development') {
    // Development: Frontend runs locally, connects to test DB on Hostinger
    return import.meta.env.VITE_API_URL_TEST || 'https://your-hostinger-vps.com/api'
  } else {
    // Production: Frontend deployed, connects to production DB on Hostinger
    return import.meta.env.VITE_API_URL_PROD || 'https://your-hostinger-vps.com/api'
  }
}

export const API_BASE_URL = getApiUrl()

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  const baseUrl = API_BASE_URL.replace(/\/$/, '') // Remove trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${path}`
}

export default {
  baseUrl: API_BASE_URL,
  buildUrl: buildApiUrl
}
