import { queries } from '@/shared/queries';
import { queryOptions } from '@tanstack/react-query';
import { getStoreDetail, getStoreList } from '../api';

export const storeQueries = {
  list: () =>
    queryOptions({
      queryKey: queries.store.getStoreList.queryKey,
      queryFn: getStoreList,
    }),
  detail: (storeId: number) =>
    queryOptions({
      queryKey: queries.store.getStoreDetail(storeId).queryKey,
      queryFn: () => getStoreDetail(storeId),
    }),
} as const;
