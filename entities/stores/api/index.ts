import { universalFetcher } from '@/shared/api/ky/universalFetcher';

export const getStoreList = async () => universalFetcher('getStoreList');
export const getStoreDetail = async (storeId: number) =>
  universalFetcher('getStoreDetail', { storeId });
