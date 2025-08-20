'use client';

import { queries } from '@/shared/queries';
import { DIMENSION, TSalesBreakDownResponse } from '@/shared/types/sales';
import useStoreDateSearchParams from '@/widgets/store-date-filter/model/useStoreDateSearchParams';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getSalesBreakDown } from '../actions';

interface Props {
  dimension: DIMENSION;
  chartType?: 'bar' | 'pie';
}

const useGetSalesBreakDown = ({ dimension }: Props) => {
  const { storeName, saleDate } = useStoreDateSearchParams();
  const params = useMemo(
    () => ({ storeName, saleDate, dimension }),
    [storeName, saleDate, dimension],
  );
  const enabled = useMemo(
    () => !!params.saleDate && !!params.dimension,
    [params],
  );

  return useQuery<TSalesBreakDownResponse[]>({
    queryKey: queries.sales.getSales(params).queryKey,
    queryFn: () => getSalesBreakDown(params),
    enabled,
    select: (data) =>
      data.map((d) => ({
        ...d,
        name: d.key,
        base: Math.max(0, (d.totalPrice || 0) - d.profitPrice),
      })),
  });
};

export default useGetSalesBreakDown;
