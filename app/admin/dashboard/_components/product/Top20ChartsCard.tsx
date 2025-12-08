import DashboardChartCategory from '@/app/admin/dashboard/_components/common/DashboardChartCategory';
import dayjs from '@/lib/dayjs';

const Top20ChartsCard = () => {
  // const yoyGrowthData = [] as any;
  const yoyGrowthData = Array.from({ length: 20 }).map((_, i) => {
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
    <div className='grid grid-cols-1 gap-4'>
      <DashboardChartCategory
        data={yoyGrowthData}
        title='BEST TOP20'
        xKey={'date'}
        series={{ key: 'growthRate', name: '매출율', fill: '#10B981' }}
      />

      <DashboardChartCategory
        data={yoyGrowthData}
        title='WORST TOP20'
        xKey={'date'}
        series={{ key: 'growthRate', name: '매출율', fill: '#EF4444' }}
      />
    </div>
    // <PanelCard>
    //   <PanelCardHeader title='BEST TOP20' />
    //   <PanelCardBody>
    //     <PanelCardItem>
    //       {yoyGrowthData.length > 0 ? (
    //         <BarChart<{
    //           date: string;
    //           growthRate: number;
    //           thisYear: number;
    //           lastYear: number;
    //         }>
    //           xKey={'date'}
    //           data={yoyGrowthData}
    //           tooltipFormatter={(value, name) => {
    //             return [`${value.toLocaleString()}`, name];
    //           }}
    //           series={[
    //             {
    //               labelPosition: 'top',
    //               key: 'growthRate',
    //               name: '매출율',
    //               stackId: 's',
    //               fill: '#4E79A7',
    //               radius: [8, 8, 0, 0],
    //               barCondition: (row) =>
    //                 row.growthRate > 0 ? '#4E79A7' : 'red',
    //             },
    //           ]}
    //         />
    //       ) : (
    //         <div className='h-[200px]'>
    //           <EmptyState title='필터를 선택하고 검색을 눌러주세요' />
    //         </div>
    //       )}
    //     </PanelCardItem>
    //   </PanelCardBody>
    // </PanelCard>
  );
};

export default Top20ChartsCard;
