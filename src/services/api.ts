import axios from 'axios';
import { API_CONFIG } from '../config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Profile Services
export const profileService = {
  getProfiles: (type?: 'bride' | 'groom') => 
    api.get(`/profiles${type ? `?type=${type}` : ''}`),
  
  createProfile: (data: any) => 
    api.post('/profiles', data),
  
  updateProfile: (id: string, data: any) => 
    api.patch(`/profiles/${id}`, data),
  
  deleteProfile: (id: string) => 
    api.delete(`/profiles/${id}`),
};

// Contact Services
export const contactService = {
  submitContactForm: (data: any) => 
    api.post('/contact', data),
};

// Admin Services
export const adminService = {
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await api.post('/admin/login', credentials);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  },
  
  getProfile: () => api.get('/admin/profile'),
  
  logout: () => {
    localStorage.removeItem('token');
  }
};