import { useState, useEffect } from 'react';
import { Profile } from '../types';
import { profileService } from '../services/profileService';
import { useErrorHandler } from './useErrorHandler';

export const useProfiles = (type?: 'bride' | 'groom') => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await profileService.getProfiles(type);
        setProfiles(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [type, handleError]);

  return { profiles, isLoading };
};