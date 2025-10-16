import { getSalesBreakDown } from '@/entities/sales/api/sales';
import { queries } from '@/shared/queries';
import { TSalesBreakDownQuery } from '@/shared/types/sales';
import { queryOptions } from '@tanstack/react-query';

export const salesQueries = {
  breakdown: (params: TSalesBreakDownQuery) =>
    queryOptions({
      queryKey: queries.sales.getSales(params).queryKey,
      queryFn: () => getSalesBreakDown(params),
    }),
} as const;
