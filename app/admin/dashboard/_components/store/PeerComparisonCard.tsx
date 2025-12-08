import { DeltaPill } from '@/app/admin/dashboard/_components/common/DeltaPill';
import { PanelWrapper } from '@/components/ui/card/panel-card';
import { Metric } from '@/components/ui/metric/Metric';

const PeerComparisonCard = () => {
  return (
    <PanelWrapper title='가격대별 판매 / 수익률'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <Metric
          label='판매'
          value=' 100,000원'
          helper={
            <div className='flex items-center gap-2'>
              <span>고가비중</span>
              <DeltaPill value='-5%' />
            </div>
          }
        />
        <Metric
          label='수익률'
          value=' 15%'
          helper={
            <div className='flex items-center gap-2'>
              <span>저가비중</span>
              <DeltaPill value='-5%' />
            </div>
          }
        />
      </div>
    </PanelWrapper>
  );
};

export default PeerComparisonCard;
