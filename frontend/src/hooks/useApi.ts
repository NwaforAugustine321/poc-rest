import { IQuery } from '@/interfaces/auth.interface';
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

  const getMusic = async ({ title, artist, year }: IQuery): Promise<any> => {
    try {
      const response = await get(
        `/music?title=${title ?? ''}&artist=${artist ?? ''}&year=${year ?? ''}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubscribe = async (musicId: string): Promise<any> => {
    try {
      const response = await post(`/music/subscribe`, {
        musicId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleUnSubscribe = async (musicId: string): Promise<any> => {
    try {
      const response = await post(`/music/unsubscribe`, {
        musicId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    handleSubscribe,
    handleUnSubscribe,
    getMusic,
    getSubscription,
  };
};
