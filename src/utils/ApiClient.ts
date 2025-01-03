import axios from 'axios';
// import { env } from "process";

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
  timeout: 1000
});

console.log()
