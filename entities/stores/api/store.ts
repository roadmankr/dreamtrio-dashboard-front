import { TStore, TStoreOptimal } from '@/entities/stores/model/type';
import { requestApiInClient } from '@/shared/api/request/request.client';

export const getStoreList = async () => {
  return await requestApiInClient<TStore[]>(`store`, {
    method: 'get',
    mode: 'route',
  });
};

export const getStoreDetail = async (storeId: number) => {
  return await requestApiInClient<TStoreOptimal>(`store/${storeId}`, {
    method: 'get',
    mode: 'route',
  });
};
