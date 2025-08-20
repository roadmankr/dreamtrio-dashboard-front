'use client';
import { DIMENSION } from '@/shared/types/sales';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import DashboardPieChart from './charts/DashboardPieChart';
import QueryGuard from './common/QueryGuard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GenderDashboardChart = () => {
  const { data, isPending, isError, isEnabled } = useGetSalesBreakDown({
    dimension: DIMENSION.GENDER,
  });

  return (
    <QueryGuard
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      sectionType='aspect-square'
      chartTitle='성별 매출 통계'
      hasData={!!data && data.length > 0}
      emptyMessage='해당 조건의 성별 차트 데이터가 없습니다.'
    >
      <div className='aspect-square'>
        <DashboardPieChart data={data} />
        {/* <ResponsiveContainer width='100%' height='100%'>
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

            <Legend
              content={() => (
                <ul
                  style={{
                    display: 'flex',
                    gap: 12,
                    listStyle: 'none',
                    padding: 0,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {data?.map((item, index) => (
                    <li
                      key={item.name}
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          background: COLORS[index ?? 0 % COLORS.length],
                          display: 'inline-block',
                        }}
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            />
          </PieChart>
        </ResponsiveContainer> */}
      </div>
    </QueryGuard>
  );
};

export default GenderDashboardChart;
