import { apiClient } from './apiClient';
import { Profile, ApiResponse } from '../types';

export const profileService = {
  getProfiles: async (type?: 'bride' | 'groom') => {
    const response = await apiClient.get<ApiResponse<Profile[]>>(
      `/profiles${type ? `?type=${type}` : ''}`
    );
    return response.data;
  },

  createProfile: async (data: Partial<Profile>, token: string) => {
    const response = await apiClient.post<ApiResponse<Profile>>(
      '/profiles',
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  updateProfile: async (id: string, data: Partial<Profile>, token: string) => {
    const response = await apiClient.patch<ApiResponse<Profile>>(
      `/profiles/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  deleteProfile: async (id: string, token: string) => {
    const response = await apiClient.delete<ApiResponse<Profile>>(
      `/profiles/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
};