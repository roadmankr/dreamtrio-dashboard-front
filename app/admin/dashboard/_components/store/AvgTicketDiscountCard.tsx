import { DeltaPill } from '@/app/admin/dashboard/_components/common/DeltaPill';

import { PanelWrapper } from '@/components/ui/card/panel-card';
import { Metric } from '@/components/ui/metric/Metric';

const AvgTicketDiscountCard = () => {
  return (
    <PanelWrapper title='매장 평균 객단가 / 할인율 (타매장 대비)'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <Metric
          label='객단가'
          value='50,000'
          helper={
            <div className='flex items-center gap-2'>
              <span>타매장 대비</span>
              <DeltaPill value='+5,000' />
            </div>
          }
        />
        <Metric
          label='할인율'
          value=' 15%'
          helper={
            <div className='flex items-center gap-2'>
              <span>타매장 대비</span>
              <DeltaPill value='-5%' />
            </div>
          }
        />
      </div>
    </PanelWrapper>
  );
};

export default AvgTicketDiscountCard;
