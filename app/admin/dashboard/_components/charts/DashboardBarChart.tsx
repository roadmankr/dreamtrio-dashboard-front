import { fmtCompact } from '@/lib/format';
import { TSalesBreakDownResponse } from '@/shared/types/sales';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { pichartCololrsConfig } from '../../_config';

interface Props {
  data?: TSalesBreakDownResponse[];
}

const DashboardBarChart = ({ data }: Props) => {
  const avg = data?.length
    ? data.reduce((s, d) => s + d.totalPrice, 0) / data.length
    : 0;

  return (
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
          tick={({ x, y, payload, ...props }) => {
            // payload.value = dataKey 값 (상품명)
            // payload.payload = 실제 데이터 row 전체
            const totalPrice = data?.find((d) => d.name === payload.value);
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
                  {`(${totalPrice?.totalPrice.toLocaleString()})`}
                  {/* ({fmt(item.value)}) */}
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
          width={68}
        />

        {/* 평균 참조선 */}
        <ReferenceLine y={avg} stroke='#94A3B8' strokeDasharray='4 4'>
          {/* 평균 라벨 */}
        </ReferenceLine>

        {/* 예쁜 툴팁 */}
        <Tooltip
          separator=': '
          contentStyle={{ borderRadius: 8, borderColor: '#E5E7EB' }}
          formatter={(value: number) => [`${value.toLocaleString()}`, '매출액']}
          labelFormatter={(label: string) => `상품: ${label}`}
        />

        {/* 심플 범례 */}
        <Legend
          verticalAlign='bottom'
          height={28}
          iconSize={14}
          wrapperStyle={{ fontSize: 16, color: '#6B7280' }}
        />

        {/* 그라데이션 정의 (각 바마다 고유 id) */}
        <defs>
          {data?.map((_, i) => (
            <linearGradient
              key={i}
              id={`barGrad-${i}`}
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='0%'
                stopColor={
                  pichartCololrsConfig[i % pichartCololrsConfig.length]
                }
                stopOpacity={0.95}
              />
              <stop
                offset='100%'
                stopColor={
                  pichartCololrsConfig[i % pichartCololrsConfig.length]
                }
                stopOpacity={0.75}
              />
            </linearGradient>
          ))}
        </defs>

        <Bar
          dataKey='totalPrice'
          name='매출액'
          radius={[8, 8, 0, 0]}
          // hover 효과
          activeBar={<Rectangle fill='rgba(59,130,246,0.2)' stroke='#3B82F6' />}
        >
          {data?.map((_, i) => (
            <Rectangle key={i} />
          ))}
          {/* 각 바에 색/그라데이션 적용 */}
          {data?.map((_, i) => (
            <Cell
              key={`cell-${i}`}
              fill={`url(#barGrad-${i})`}
              stroke='transparent'
            />
          ))}

          {/* 값 라벨 (바 상단) */}
          <LabelList
            dataKey='totalPrice'
            formatter={(v: any) =>
              v.toLocaleString() as unknown as React.ReactNode
            }
            position='top'
            className='fill-gray-700'
            style={{ fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
