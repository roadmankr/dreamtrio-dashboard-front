'use client';

import PieChartLegend from '@/components/ui/charts/pie-chart/pie-chart-legend';
import {
  pichartCololrsConfig,
  TPieChartTooltip,
} from '@/components/ui/charts/pie-chart/pie-chart.config';
import PieTooltip from '@/components/ui/charts/pie-chart/pie-tooltip';
import { RAD } from '@/components/ui/charts/pie-chart/pie.constants';
import { formatCurrency } from '@/lib/format';
import { useMemo } from 'react';
import {
  Cell,
  Legend,
  PieChart as PChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DataKey } from 'recharts/types/util/types';

interface Props<TData extends Record<string, any>> {
  dataKey: DataKey<TData>;
  getKey: (item: TData) => string | number;
  data?: TData[];
}

const renderLeaderLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, index, name } = props;
  const color = pichartCololrsConfig[index % pichartCololrsConfig.length];

  const sin = Math.sin(-RAD * midAngle);
  const cos = Math.cos(-RAD * midAngle);

  const r1 = outerRadius + 6;
  const r2 = outerRadius + 20; // 중간 지점 더 멀리
  const sx = cx + r1 * cos;
  const sy = cy + r1 * sin;

  // 원래 mx,my
  const mx = cx + r2 * cos;
  let my = cy + r2 * sin;

  // y 보정: sin 방향(위/아래)으로 추가 오프셋
  // 값 키워줄수록 위아래로 꺾임
  my = my - 12 * Math.sign(sin);

  const ex = mx + (cos >= 0 ? 12 : -12);
  const ey = my;

  const anchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path
        d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
        stroke={color}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={color} />
      <text
        x={ex + (cos >= 0 ? 4 : -4)}
        y={ey}
        textAnchor={anchor}
        dominantBaseline='central'
        fill={color}
        fontSize={13}
        fontWeight={600}
      >
        {`${name} : ${formatCurrency(value ?? 0)}`}
      </text>
    </g>
  );
};

const PieChart = <TData extends Record<string, any>>({
  data,
  dataKey,
  getKey,
}: Props<TData>) => {
  const colorsByKey = useMemo(
    () =>
      data?.map((d, i) => ({
        key: `${getKey(d)}`,
        color: pichartCololrsConfig[i % pichartCololrsConfig.length],
      })) ?? ([] satisfies TPieChartTooltip[]),
    [data],
  );

  return (
    <div className='relative h-full w-full'>
      <div className='aspect-square w-full max-w-2xl min-w-xl md:min-w-auto'>
        <ResponsiveContainer width='100%' height='100%' debounce={0}>
          {/* <PChart margin={{ left: sideMargin, right: sideMargin }}> */}
          <PChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              dataKey={dataKey}
              outerRadius='60%'
              paddingAngle={1.5}
              minAngle={2}
              label={renderLeaderLabel}
              labelLine={false}
            >
              {data?.map((_, i) => (
                <Cell
                  key={i}
                  fill={pichartCololrsConfig[i % pichartCololrsConfig.length]}
                />
              ))}
            </Pie>

            <Tooltip
              // separator=': '
              contentStyle={{ borderRadius: 8 }}
              formatter={(value, name) => [
                <PieTooltip
                  key={name}
                  name={name}
                  value={value}
                  colorsByKey={colorsByKey}
                />,
              ]}
            />

            <Legend
              verticalAlign='bottom'
              align='center'
              iconType='circle'
              iconSize={10}
              content={() => <PieChartLegend data={data} getKey={getKey} />}
            />
          </PChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
