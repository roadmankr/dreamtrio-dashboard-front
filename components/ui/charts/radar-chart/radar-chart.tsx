'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart as RRadaChart,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { DataKey } from 'recharts/types/util/types';

interface Props<TData extends Record<string, any>> {
  dataKey: DataKey<TData>;

  valueKey: DataKey<TData>;
  valueName?: string;
  data?: TData[];
}

const RadarChart = <TData extends Record<string, any>>({
  dataKey,
  valueKey,
  valueName,
  data,
}: Props<TData>) => {
  return (
    <div className='aspect-square h-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RRadaChart cx='50%' cy='50%' outerRadius='70%' data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={dataKey} tick={{ fontSize: 10 }} />
          <PolarRadiusAxis tick={{ fontSize: 10 }} />
          <Radar
            name={valueName}
            dataKey={valueKey}
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.6}
          />
        </RRadaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
