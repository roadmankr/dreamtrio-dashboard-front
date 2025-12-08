import { DeltaPill } from '@/app/admin/dashboard/_components/common/DeltaPill';
import { PanelWrapper } from '@/components/ui/card/panel-card';
import { Metric } from '@/components/ui/metric/Metric';

const StoreRankSummary = () => {
  return (
    <PanelWrapper title='매장 요약'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-2'>
        {/* <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'> */}
        <Metric
          label='매출'
          value='50,000,000'
          helper={
            <div className='flex items-center gap-2'>
              <span>평균 대비</span>
              <DeltaPill value='+10%' />
            </div>
          }
        />
        <Metric
          label='매출이익'
          value='20%'
          helper={
            <div className='flex items-center gap-2'>
              <span>평균 대비</span>
              <DeltaPill value='+3%' />
            </div>
          }
        />
        <Metric label='보유재고' value='60%' helper='적정 50M / 현재 30M' />
        <Metric label='매장 순위' value='1위' helper='이번 달' />
      </div>
    </PanelWrapper>
  );
};

export default StoreRankSummary;
