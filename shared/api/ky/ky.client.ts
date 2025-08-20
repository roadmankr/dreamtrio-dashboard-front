import ky from 'ky';

export const clintKy = ky.create({
  // prefixUrl: 'api',
  timeout: 300000,
  credentials: 'include',
});
