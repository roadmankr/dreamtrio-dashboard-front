import { TSalesBreakDownResponse } from '@/shared/types/sales';
import { useCallback } from 'react';
import { pichartCololrsConfig } from '../../_config';
interface Props {
  data?: TSalesBreakDownResponse[];
}
const PieChartLegend = ({ data }: Props) => {
  const color = useCallback(
    (i: number) => pichartCololrsConfig[i % pichartCololrsConfig.length],
    [],
  );

  return (
    <ul className='flex w-full flex-wrap items-center justify-center gap-3'>
      {data?.map((item, index) => (
        <li
          key={item.key}
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
          <span style={{ whiteSpace: 'nowrap', color: color(index) }}>
            {item.key}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PieChartLegend;
