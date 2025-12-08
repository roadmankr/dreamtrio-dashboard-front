import { pichartCololrsConfig } from '@/components/ui/charts/pie-chart/pie-chart.config';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

interface Props<TData> {
  getKey: (data: TData) => string | number;
  data?: TData[];
}
const PieChartLegend = <TData,>({ data, getKey }: Props<TData>) => {
  const color = useCallback(
    (i: number) => pichartCololrsConfig[i % pichartCololrsConfig.length],
    [],
  );

  return (
    <ul className='hidden w-full flex-wrap items-center justify-center gap-2 md:flex'>
      {data?.map((item, index) => (
        <li
          key={getKey(item)}
          style={{ display: 'flex', alignItems: 'center', gap: 3 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: color(index),
              display: 'inline-block',
              flex: '0 0 auto',
            }}
          />
          <span
            className={cn('text-sm whitespace-nowrap', color(index))}
            style={{ color: color(index) }}
          >
            {getKey(item)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PieChartLegend;
