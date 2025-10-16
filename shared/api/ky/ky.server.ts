import ky from 'ky';
import 'server-only';

export const prefetchKy = ky.create({
  prefixUrl: process.env.API_BASE_URL,
  timeout: false,
  retry: 0,
  cache: 'no-store',
});

export const serverKy = ky.create({
  prefixUrl: process.env.API_BASE_URL,
  timeout: false,
  retry: 0,
  cache: 'no-store',
});
