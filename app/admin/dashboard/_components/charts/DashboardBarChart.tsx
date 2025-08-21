import { fmtCompact } from '@/lib/format';
import { DIMENSION, TSalesBreakDownResponse } from '@/shared/types/sales';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { dashboadProductTitleConfig } from '../../_constants';
import useBarChartData from '../../_model/useBarChartData';

interface Props {
  dimension: DIMENSION;
  data?: TSalesBreakDownResponse[];
}

const DashboardBarChart = ({ dimension, data }: Props) => {
  const { chargAvg } = useBarChartData({ data });

  return (
    <div className='aspect-video w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{ top: 12, right: 16, left: 8, bottom: 12 }}
          barCategoryGap={18}
          barGap={4}
        >
          {/* 부드러운 그리드 */}
          <CartesianGrid strokeDasharray='3 3' stroke='#ECEFF1' />
          <XAxis
            dataKey='name'
            // tick={{ fontSize: 16, fill: '#6B7280' }}
            tick={({ x, y, payload }) => {
              const totalPrice =
                data?.find((d) => d.name === payload.value)?.totalPrice ?? 0;

              return (
                <g transform={`translate(${x},${y + 10})`}>
                  <text textAnchor='middle' fill='#374151' fontSize={12} dy={0}>
                    {payload.value}
                  </text>
                  <text
                    textAnchor='middle'
                    fill='#6B7280'
                    fontSize={11}
                    dy={14} // 첫 줄 아래로 내려주기
                  >
                    {`(${totalPrice.toLocaleString()})`}
                  </text>
                </g>
              );
            }}
            interval={0}
            // angle={-25}
            // textAnchor='end'
            height={46}
          />
          <YAxis
            tickFormatter={fmtCompact}
            tick={{ fontSize: 16, fill: '#6B7280' }}
            domain={[0, 'auto']}
            interval={0} // 모든 tick 표시
            tickCount={12}
            width={68}
          />

          {/* 평균 참조선 */}
          <ReferenceLine y={chargAvg} stroke='#94A3B8' strokeDasharray='4 4'>
            {/* 평균 라벨 */}
          </ReferenceLine>

          {/* 예쁜 툴팁 */}
          <Tooltip
            separator=': '
            contentStyle={{ borderRadius: 8, borderColor: '#E5E7EB' }}
            formatter={(_, ...props) => {
              const key = props?.[1].payload.key;
              const object = data?.find((d) => d.key === key);
              const v =
                props?.[0] === '매출액'
                  ? (object?.totalPrice ?? 0)
                  : (object?.profitPrice ?? 0);
              return [`${v.toLocaleString()}`, props?.[0]];
            }}
            labelFormatter={(label: string) => (
              <span className='flex items-center gap-1'>
                <span className='text-sm'>{`${dashboadProductTitleConfig[dimension]}명  `}</span>
                <span className='font-semibold'>{label}</span>
              </span>
            )}
          />

          {/* 심플 범례 */}
          <Legend
            verticalAlign='bottom'
            height={28}
            iconSize={14}
            wrapperStyle={{ fontSize: 16, color: '#6B7280' }}
          />

          {/* 아래층 (모서리 0) */}
          <Bar
            dataKey='profitPriceForChart'
            name='이익액'
            stackId='s'
            fill={'#59A14F'}
            radius={[0, 0, 0, 0]}
          >
            {/* 값 라벨 */}
            <LabelList
              position='insideTop'
              fill='white'
              style={{ fontSize: 11, zIndex: 50 }}
              formatter={(v: any) =>
                (v ? v.toLocaleString() : '') as unknown as React.ReactNode
              }
            />
          </Bar>

          {/* 윗층 (위쪽만 둥글게) */}
          <Bar
            dataKey='base'
            name='매출액'
            stackId='s'
            fill={'#4E79A7'}
            radius={[8, 8, 0, 0]}
          >
            {/* 값 라벨 (바 상단) */}
            <LabelList
              position='top'
              fill='#374151'
              style={{ fontSize: 12 }}
              formatter={(v: any, ...props) => {
                return v.toLocaleString() as unknown as React.ReactNode;
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;
