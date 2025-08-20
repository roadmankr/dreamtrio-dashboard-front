import { TSalesBreakDownResponse } from '@/shared/types/sales';
import { useMemo } from 'react';

const useDashboardTableData = ({
  data,
}: {
  data: TSalesBreakDownResponse[];
}) => {
  const totals = useMemo(() => {
    const t = data.reduce(
      (acc, r) => {
        acc.total += r.totalPrice || 0;
        acc.profit += r.profitPrice || 0;
        acc.count += r.count || 0;
        return acc;
      },
      { total: 0, profit: 0, count: 0 },
    );
    return { ...t, rate: t.total ? t.profit / t.total : 0 };
  }, [data]);

  return { totals };
};

export default useDashboardTableData;
