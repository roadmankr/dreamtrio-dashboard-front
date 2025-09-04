import ky from 'ky';

export const clientKy = ky.create({
  // prefixUrl: 'api',
  timeout: 30000,
  credentials: 'include',
  cache: 'no-store',
  retry: 1,
});
