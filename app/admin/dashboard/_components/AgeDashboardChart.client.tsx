'use client';
import { DIMENSION } from '@/shared/types/sales';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AgeDashboardChart = () => {
  const { data } = useGetSalesBreakDown({ dimension: DIMENSION.AGE });

  return (
    <div className='aspect-square w-1/2'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={'50%'}
            fill='#8884d8'
            dataKey='value'
            label={({ name, value, x, y, cx, index }) => {
              const isRight = x > cx; // 중심보다 오른쪽이면 true
              return (
                <text
                  x={isRight ? x - 10 : x + 10}
                  y={y}
                  fill={COLORS[index ?? 0 % COLORS.length]}
                  fontSize={12}
                  textAnchor={isRight ? 'start' : 'end'} // 오른쪽은 start, 왼쪽은 end
                  dominantBaseline='central'
                >
                  {`${name}: ${value?.toLocaleString()}`}
                </text>
              );
            }}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeDashboardChart;
