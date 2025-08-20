'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';

export const getStoreListInServer = async (): Promise<string[]> => {
  try {
    const result = await serverKy(...apis.store.getStoreList).json<string[]>();
    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
