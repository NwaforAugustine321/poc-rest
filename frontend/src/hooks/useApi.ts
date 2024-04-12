import { get, post } from '@/utils/axios';

export const useApi = () => {
  const getSubscription = async (): Promise<any> => {
    try {
      const response = await get('/music/subscribed-music');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getMusic = async (): Promise<any> => {
    try {
      const response = await get('/music');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getMusic,
    getSubscription,
  };
};
