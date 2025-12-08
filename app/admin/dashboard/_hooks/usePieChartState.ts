import {
  pichartCololrsConfig,
  TPieChartTooltip,
} from '@/components/ui/charts/pie-chart/pie-chart.config';
import { formatCurrency } from '@/lib/format';
import { TSalesBreakDownResponse } from '@/shared/types/sales';

const usePieChartState = ({ data }: { data?: TSalesBreakDownResponse[] }) => {
  const maxLabelPx = (data ?? []).reduce((max, d) => {
    const w = `${d.name} : ${formatCurrency(d.totalPrice ?? 0)}`.length * 8;
    return Math.max(max, w);
  }, 0);

  const sideMargin = Math.min(Math.max(64, Math.floor(maxLabelPx * 0.7)), 280);
  const colorsByKey =
    data?.map((d, i) => ({
      key: d.key,
      color: pichartCololrsConfig[i % pichartCololrsConfig.length],
    })) ?? ([] satisfies TPieChartTooltip[]);

  return { colorsByKey, sideMargin };
};

export default usePieChartState;
