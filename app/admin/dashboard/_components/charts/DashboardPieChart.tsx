import { formatCurrency } from '@/lib/format';
import { TSalesBreakDownResponse } from '@/shared/types/sales';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { pichartCololrsConfig } from '../../_config';
import ChartLegend from './ChartLegend.component';

interface Props {
  data?: TSalesBreakDownResponse[];
}

const DashboardPieChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={'70%'}
          paddingAngle={1.5} // 조각 간격 약간 주기
          minAngle={2} // 매우 작은 섹션 각 최소값
          dataKey='totalPrice'
          label={({ name, value, x, y, cx, index }) => {
            const isRight = x > cx; // 중심보다 오른쪽이면 true

            return (
              <text
                x={isRight ? x - 10 : x + 10}
                y={y}
                fill={
                  pichartCololrsConfig[index ?? 0 % pichartCololrsConfig.length]
                }
                fontSize={14}
                textAnchor={isRight ? 'start' : 'end'} // 오른쪽은 start, 왼쪽은 end
                dominantBaseline='central'
              >
                {`${name}: ${formatCurrency(value ?? 0)}`}
              </text>
            );
          }}
        >
          {/* 파이 부분 */}
          {data?.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pichartCololrsConfig[index % pichartCololrsConfig.length]}
            />
          ))}
        </Pie>

        {/* hover시 보여지는 부분 */}
        <Tooltip
          formatter={(value: number) => value?.toLocaleString()}
          separator=': '
          contentStyle={{ borderRadius: 8 }}
        />

        {/* 밑 부분 */}
        <Legend
          verticalAlign='bottom'
          align='center'
          iconType='square'
          iconSize={10}
          content={() => <ChartLegend data={data} />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
