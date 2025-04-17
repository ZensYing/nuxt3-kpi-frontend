// composables/useApi.ts
import axios from 'axios';
import { useAuthStore } from '~/store/useAuthStore';
import type { IAPIOption } from '~/types/api';

export const useApi = async <T>(endpoint: string, options: IAPIOption) => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;

  // Move `useAuthStore` here, inside function body
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  if (!options.headers) {
    options.headers = token ? { Authorization: `Bearer ${token}` } : {};
  }

  try {
    const response = await axios<T>(baseUrl + endpoint, options);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
