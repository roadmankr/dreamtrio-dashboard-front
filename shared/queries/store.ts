import { createQueryKeys } from '@lukemorales/query-key-factory';

export const store = createQueryKeys('store', {
  getStoreList: {
    queryKey: ['storeList'],
  },
  getSalesDateList: {
    queryKey: ['dateList'],
  },
});
