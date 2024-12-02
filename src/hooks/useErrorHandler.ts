import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    console.error('Error:', error);
    
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.message;
      toast.error(message);
      return;
    }
    
    if (error instanceof Error) {
      toast.error(error.message);
      return;
    }
    
    toast.error('An unexpected error occurred');
  }, []);

  return { handleError };
};