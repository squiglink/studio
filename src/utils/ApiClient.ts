import axios from 'axios';
import { toast } from 'vue3-toastify';

export type ClientError = {
  errors: string[];
}

export type ServerError = {
  errors: string[];
}

export interface APIPage<T> {
  page: T[];
  page_count: number;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 5000,
});

apiClient.interceptors.response.use((response) => response, (error) => {
  toast(`${error.name}: ${error.message} (${error.code})`, {
    "theme": "dark",
    "type": "error",
    "position": "bottom-right",
    "dangerouslyHTMLString": true
  });

  throw error;
});
