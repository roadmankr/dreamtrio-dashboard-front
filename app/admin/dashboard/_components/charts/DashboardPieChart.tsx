import PieChart from '@/components/ui/charts/pie-chart/pie-chart';
import { TSalesBreakDownResponse } from '@/shared/types/sales';

export default function DashboardPieChart({
  data,
}: {
  data?: TSalesBreakDownResponse[];
}) {
  return (
    <PieChart<TSalesBreakDownResponse>
      data={data}
      getKey={(data) => data.key}
      dataKey={'totalPrice'}
    />
  );
}
