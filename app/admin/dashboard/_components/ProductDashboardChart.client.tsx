'use client';
import { DIMENSION } from '@/shared/types/sales';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import QueryGuard from './common/QueryGuard';
const data = [
  { name: 'Apple', value: 400 },
  { name: 'Banana', value: 300 },
  { name: 'Cherry', value: 300 },
  { name: 'Date', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProductDashboardChart = () => {
  const { data, isPending, isEnabled, isError } = useGetSalesBreakDown({
    dimension: DIMENSION.PRODUCT,
  });

  const fmt = (n: number) => n.toLocaleString('ko-KR');
  const fmtCompact = (n: number) =>
    n >= 1_0000_0000
      ? `${n / 1_0000_0000}억`
      : n >= 1_0000
        ? `${n / 1_0000}만`
        : fmt(n);

  return (
    <QueryGuard
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      hasData={!!data && data.length > 0}
      emptyMessage='해당 조건의 상품 차트 데이터가 없습니다.'
    >
      <div className='flex aspect-video w-full items-center justify-center'>
        <ResponsiveContainer width='90%' height='100%'>
          <BarChart
            data={data?.slice(0, 10)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis tickFormatter={fmtCompact} />
            <Tooltip
              formatter={(value: number) => [`${fmt(value)}`, '매출액']} // 값/라벨 교체
              labelFormatter={(label: string) => `상품: ${label}`}
            />
            <Legend />
            <Bar
              dataKey='value'
              name='매출액'
              fill='#8884d8'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
            />
            {/* <Bar
            dataKey='uv'
            fill='#82ca9d'
            activeBar={<Rectangle fill='gold' stroke='purple' />}
          /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </QueryGuard>
  );
};

export default ProductDashboardChart;
