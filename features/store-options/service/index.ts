'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';
import { SelectOption } from '@/shared/types/form';

export const getStoreList = async (): Promise<SelectOption[]> => {
  try {
    const result = await serverKy(...apis.store.getStoreList).json<string[]>();
    const options: SelectOption[] = result.map((data) => ({
      label: data,
      value: data,
    }));
    return options;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
