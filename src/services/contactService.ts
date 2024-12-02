import { apiClient } from './apiClient';
import { ContactFormData, ApiResponse } from '../types';

export const contactService = {
  submitContactForm: async (data: ContactFormData) => {
    const response = await apiClient.post<ApiResponse<void>>(
      '/contact',
      data
    );
    return response.data;
  },
};