import Skeleton from '@/app/admin/analytics/purchase/_components/skeleton';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
  PanelCardItem,
} from '@/components/ui/card/panel-card';
import { TAnalyzeDetailGradeResult } from '@/shared/types/analyze';

interface Props {
  data?: TAnalyzeDetailGradeResult;
  isPending?: boolean;
}

const PurchaseGradeCard = ({ data, isPending }: Props) => {
  return (
    <PanelCard className='flex h-full flex-1 flex-col'>
      <PanelCardHeader title='등급 및 한줄평' />
      <PanelCardBody className='flex flex-1 flex-col'>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='grid flex-1 grid-rows-[1fr_2fr] gap-6'>
            <section className='flex gap-6'>
              <PanelCardItem>
                <p className='text-xs text-zinc-500'>등급</p>
                {isPending ? (
                  <Skeleton />
                ) : (
                  <p className='mt-1 text-lg font-semibold tracking-tight text-zinc-900'>
                    {data?.grade || '-'}
                  </p>
                )}
              </PanelCardItem>
              <PanelCardItem>
                <p className='text-xs text-zinc-500'>한줄평</p>
                {isPending ? (
                  <Skeleton />
                ) : (
                  <p className='mt-1 font-semibold tracking-tight text-zinc-900'>
                    {data?.comment || '-'}
                  </p>
                )}
              </PanelCardItem>
            </section>
            <PanelCardItem className='flex items-center justify-center'>
              {/* <RadarChart data={data} dataKey={'subject'} valueKey={'A'} /> */}
            </PanelCardItem>
          </div>
        </div>
      </PanelCardBody>
    </PanelCard>
  );
};

export default PurchaseGradeCard;
