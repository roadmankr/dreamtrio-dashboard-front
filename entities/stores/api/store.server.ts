'use server';

import { TStore } from '@/entities/stores/model/type';
import { apis } from '@/shared/api/endpoints';
import {
  requestApiForPrefetch,
  requestApiJson,
} from '@/shared/api/request/request.server';

export const getStoreListForPrefetch = async () => {
  return await requestApiForPrefetch<TStore[]>(...apis.store.getStoreList);
};

export const getStoreListInServer = async () => {
  return await requestApiJson<TStore[]>(...apis.store.getStoreList);
};

export const getStoreDetailInServer = async ({
  storeId,
}: {
  storeId: number;
}) => {
  const [url, init] = apis.store.getStoreDetail(storeId);

  return await requestApiJson<TStore>(...[url, init]);
};
