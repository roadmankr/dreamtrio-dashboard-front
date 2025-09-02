'use client';

import { useGetSales } from '@/entities/sales/model/model';
import { DIMENSION } from '@/shared/types/sales';
import useStoreDateSearchParams from '@/widgets/store-date-filter/model/useStoreDateSearchParams';
import { useMemo } from 'react';

interface Props {
  dimension: DIMENSION;
  chartType?: 'bar' | 'pie';
}

const useGetSalesBreakDown = ({ dimension }: Props) => {
  const { storeId, saleDate } = useStoreDateSearchParams();
  const params = useMemo(
    () => ({ storeId, saleDate, dimension }),
    [storeId, saleDate, dimension],
  );
  const enabled = useMemo(
    () => !!params.saleDate && !!params.dimension,
    [params],
  );

  return useGetSales(params, {
    enabled,
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
