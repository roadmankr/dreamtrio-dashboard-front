'use client';

import { queries } from '@/shared/queries';
import { DIMENSION, TSalesBreakDownResponse } from '@/shared/types/sales';
import useStoreDateSearchParams from '@/widgets/store-date-filter/model/useStoreDateSearchParams';
import { useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
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

  return useQuery<
    TSalesBreakDownResponse[],
    HTTPError,
    { name: string; value: number }[]
  >({
    queryKey: queries.sales.getSales(params).queryKey,
    queryFn: () => getSalesBreakDown(params),
    enabled: !!params.storeName && !!params.saleDate && !!params.dimension,
    select: (data) => {
      console.log(data);
      return data.map((d) => ({ name: d.key, value: d.totalPrice }));
    },
  });
};

export default useGetSalesBreakDown;
