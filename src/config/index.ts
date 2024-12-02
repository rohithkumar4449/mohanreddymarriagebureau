const getApiBaseUrl = () => {
  // Check for production API URL first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.trim();
  }
  // Fallback to localhost for development
  return 'http://localhost:5000/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const WHATSAPP_NUMBER = '+919999999999';
export const ADMIN_EMAIL = 'irwrj@gmail.com';