import axios, { AxiosError } from 'axios';

const NEXT_PUBLIC_BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost';

export const globalAxios = axios.create({
  baseURL: `${NEXT_PUBLIC_BASE_API_URL}/api`,
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
});

export const isAxiosError = (error: any): error is AxiosError =>
  !!error.isAxiosError;
