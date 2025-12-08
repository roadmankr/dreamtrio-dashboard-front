import { PanelWrapper } from '@/components/ui/card/panel-card';
import BarChart from '@/components/ui/charts/bar-chart/bar-chart';
import dayjs from '@/lib/dayjs';

const SalesProfitCard = () => {
  const salesProfitData = Array.from({ length: 35 }).map((_, i) => {
    const date = dayjs()
      .subtract(29 - i, 'day')
      .format('MM/DD');
    const sales = Math.floor(4000000 + Math.random() * 2000000); // 400만 ~ 600만
    const profit = Math.floor(sales * (0.15 + Math.random() * 0.1)); // 15~25% 수익률
    return { date, sales, profit };
  });

  return (
    <PanelWrapper title='매출 / 수익 현황'>
      <div>
        <BarChart<{ date: string; sales: number; profit: number }>
          xKey={'date'}
          data={salesProfitData}
          tooltipFormatter={(value, name) => {
            return [`${value.toLocaleString()}`, name];
          }}
          series={[
            {
              labelPosition: 'top',
              key: 'sales',
              name: '매출액',
              stackId: 's',
              fill: '#4E79A7',
              radius: [8, 8, 0, 0],
            },
          ]}
        />
      </div>
    </PanelWrapper>
  );
};

export default SalesProfitCard;
