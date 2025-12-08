import { PanelWrapper } from '@/components/ui/card/panel-card';
import BarChart from '@/components/ui/charts/bar-chart/bar-chart';
import dayjs from '@/lib/dayjs';

const YoYGrowthCard = () => {
  const yoyGrowthData = Array.from({ length: 30 }).map((_, i) => {
    const date = dayjs()
      .subtract(29 - i, 'day')
      .format('MM/DD');
    const lastYear = Math.floor(3500000 + Math.random() * 2000000); // 작년 매출
    const thisYear = Math.floor(lastYear * (0.9 + Math.random() * 0.3)); // 90~120%
    const growthRate = ((thisYear - lastYear) / lastYear) * 100;
    return {
      date,
      thisYear,
      lastYear,
      growthRate: Math.round(growthRate * 10) / 10,
    };
  });

  return (
    <PanelWrapper title='전년 동기 대비 매출 증감'>
      <BarChart<{
        date: string;
        growthRate: number;
        thisYear: number;
        lastYear: number;
      }>
        xKey={'date'}
        data={yoyGrowthData}
        tooltipFormatter={(value, name) => {
          return [`${value.toLocaleString()}`, name];
        }}
        series={[
          {
            labelPosition: 'top',
            key: 'growthRate',
            name: '매출율',
            stackId: 's',
            fill: '#4E79A7',
            radius: [8, 8, 0, 0],
            barCondition: (row) => (row.growthRate > 0 ? '#4E79A7' : 'red'),
          },
        ]}
      />
    </PanelWrapper>
  );
};

export default YoYGrowthCard;
