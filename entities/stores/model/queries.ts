import { getStoreDetail, getStoreList } from '@/entities/stores/api/store';
import { queries } from '@/shared/queries';
import { queryOptions } from '@tanstack/react-query';

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
