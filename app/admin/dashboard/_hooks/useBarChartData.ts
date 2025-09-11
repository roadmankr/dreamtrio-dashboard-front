import { TSalesBreakDownResponse } from '@/shared/types/sales';
import { useMemo } from 'react';

interface Props {
  data?: TSalesBreakDownResponse[];
}

const useBarChartData = ({ data = [] }: Props) => {
  const chargAvg = useMemo(
    () =>
      data?.length
        ? data.reduce((s, d) => s + d.totalPrice, 0) / data.length
        : 0,
    [],
  );

  return { chargAvg };
};

export default useBarChartData;
