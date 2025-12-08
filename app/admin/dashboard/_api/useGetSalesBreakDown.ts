'use client';

import type { Dimension } from '@/shared/model/dimension';

import { useGetSales } from '@/entities/sales/api/useGetSales';
import { salesListFilterSchema } from '@/entities/sales/model/list-filter.schema';
import { TSalesBreakDownQuery } from '@/shared/types/sales';
import { useMemo } from 'react';
import useStoreDateSearchParams from '../_hooks/useStoreDateSearchParams';

interface Props {
  dimension: Dimension;
  chartType?: 'bar' | 'pie';
}

const useGetSalesBreakDown = ({ dimension }: Props) => {
  const { storeId, saleDate } = useStoreDateSearchParams();
  const params = useMemo(
    () => ({ storeId, saleDate, dimension }),
    [storeId, saleDate, dimension],
  );

  const parsed = salesListFilterSchema.safeParse(params);
  const enabled = parsed.success && !!params.dimension;
  const data = enabled
    ? { ...parsed.data, dimension }
    : ({} as TSalesBreakDownQuery);

  return useGetSales(data, {
    enabled: enabled,
    select: (data) =>
      data.map((d) => ({
        ...d,
        name: d.key,
        profitPriceForChart: d.profitPrice < 0 ? 0 : d.profitPrice, // bar차트에서 이익률이 마이너스인 경우 밑으로 내려가는 이슈가 있어 일단 0으로
        base: Math.max(0, (d.totalPrice || 0) - d.profitPrice), // stackBarChar 형식상 기존 totalPrice와 profitPrice를 보여줄 때 두개를 더하는 이슈가 있어
      })),
  });
};

export default useGetSalesBreakDown;
