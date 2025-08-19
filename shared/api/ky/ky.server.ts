import ky from 'ky';
import 'server-only';

export const serverKy = ky.create({
  prefixUrl: process.env.API_BASE_URL,
  timeout: 300000,
  retry: 0,
});
