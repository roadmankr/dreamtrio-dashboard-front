import { clintKy } from '@/shared/api/ky/ky.client';

export const getStoreList = async () => {
  if (typeof window === 'undefined') {
    const { getStoreListInServer } = await import('@/actions/store.server');
    return getStoreListInServer();
  } else {
    const result = await clintKy.get(`/api/store`).json<{ data: string[] }>();
    return result.data;
  }
};
