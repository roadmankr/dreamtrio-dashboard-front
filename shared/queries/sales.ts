import { createQueryKeys } from '@lukemorales/query-key-factory';
import { TSalesBreakDownQuery } from '../types/sales';

export const sales = createQueryKeys('sales', {
  getSales: (props: TSalesBreakDownQuery | undefined) => {
    return {
      queryKey: [
        'storeList',
        !props
          ? '__disabled__'
          : {
              saleDate: props?.saleDate,
              dimension: props?.dimension,
              storeId: props?.storeId ?? 0,
            },
      ],
    };
  },
});
