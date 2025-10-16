import { TStore, TStoreOptimal } from '@/entities/stores/model/type';
import { requestApiForGet } from '@/shared/api/request/request.client';

export const getStoreList = async () => {
  return await requestApiForGet<TStore[]>(`/api/store`, {
    method: 'get',
  });
};

export const getStoreDetail = async (storeId: number) => {
  return await requestApiForGet<TStoreOptimal>(`/api/store/${storeId}`, {
    method: 'get',
  });
};
