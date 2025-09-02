'use server';

import { TStore, TStoreOptimal } from '@/entities/stores/model/type';
import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';

export const getStoreListInServer = async (): Promise<TStore[]> => {
  try {
    const result = await serverKy(...apis.store.getStoreList).json<TStore[]>();
    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};

export const getStoreDetailInServer = async ({
  storeId,
}: {
  storeId: number;
}) => {
  try {
    const [url, init] = apis.store.getStoreDetail(storeId);
    const result = await serverKy(url, init).json<TStoreOptimal>();
    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
