import { CardSkeleton } from '@/app/admin/dashboard/_components/common/CardSkeleton';
import DashboardCard from '@/app/admin/dashboard/_components/common/DashboardCard';
import { EmptyState } from '@/app/admin/dashboard/_components/common/EmptyState';
import BarChart from '@/components/ui/charts/bar-chart/bar-chart';
import { DataKey } from 'recharts/types/util/types';

interface Props<TData extends Record<string, any>> {
  data: TData[];
  title: string;
  xKey: DataKey<TData>;
  series: { key: DataKey<TData>; name: string; fill?: string };
  isPending?: boolean;
}

const DashboardChartCategory = <TData extends Record<string, any>>({
  data,
  title,
  xKey,
  series,
  isPending,
}: Props<TData>) => {
  return (
    <DashboardCard title={title}>
      {isPending && (
        <div className='h-[200px]'>
          <CardSkeleton />
        </div>
      )}

      {data.length === 0 && (
        <div className='h-[200px]'>
          <EmptyState title='필터를 선택하고 검색을 눌러주세요' />
        </div>
      )}

      {data.length > 0 && (
        <BarChart<TData>
          xKey={xKey}
          data={data}
          tooltipFormatter={(value, name) => {
            return [`${value.toLocaleString()}`, name];
          }}
          series={[
            {
              labelPosition: 'top',
              key: series.key,
              name: series.name,
              stackId: 's',
              fill: series.fill ?? '#4E79A7',
              radius: [8, 8, 0, 0],
            },
          ]}
        />
      )}
    </DashboardCard>
  );
};

export default DashboardChartCategory;
