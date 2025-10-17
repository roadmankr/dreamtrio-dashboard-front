import { TStore, TStoreOptimal } from '@/entities/stores/model/type';
import { requestApiForActions } from '@/shared/api/request/request.client';

export const getStoreList = async () => {
  return await requestApiForActions<TStore[]>(`/api/store`, {
    method: 'get',
  });
};

export const getStoreDetail = async (storeId: number) => {
  return await requestApiForActions<TStoreOptimal>(`/api/store/${storeId}`, {
    method: 'get',
  });
};
