import { Chart, TChartMap } from '@/shared/types/sales';

export const chartDataConfig: TChartMap = {
  [Chart.PIE]: (data) =>
    data?.map((d) => ({ name: d.key, value: d.totalPrice })) ?? [],
  [Chart.BAR]: (data) =>
    data?.map((d) => ({
      name: d.key,
      uv: d.totalPrice,
      pv: d.count,
      amt: d.count,
    })) ?? [],
};
