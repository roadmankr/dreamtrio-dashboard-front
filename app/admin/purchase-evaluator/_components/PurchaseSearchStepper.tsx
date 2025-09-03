'use client';

import { cn } from '@/lib/utils';
import { labelByStatus } from '../_config';

import { ViewState } from '@/shared/model/status';
import { chipClass, resultChipVariant } from '../_lib';
import usePurchaseSearchStepper from '../_model/usePurchaseSearchStepper';

const Step = ({
  step,
  text,
  className,
}: {
  step: number;
  text: string;
  className?: string;
}) => {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-atomic='true'
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm',
        className,
      )}
    >
      <span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20'>
        {step}
      </span>
      {text}
    </div>
  );
};

const PurchaseSearchStepper = () => {
  const { hasSelectedStore, status, hasSearched } = usePurchaseSearchStepper();

  return (
    <div className='flex flex-wrap items-center gap-2 text-sm'>
      <Step
        step={1}
        text='매장선택'
        className={chipClass(!hasSelectedStore ? 'active' : 'muted')}
      />

      <span className='text-slate-400'>→</span>

      <Step
        step={2}
        text='상품 바코드 검색'
        className={chipClass(
          hasSelectedStore && status === ViewState.IDLE ? 'active' : 'muted',
        )}
      />

      <span className='text-slate-400'>→</span>

      <Step
        step={3}
        text={labelByStatus[hasSearched ? status : ViewState.IDLE]}
        className={resultChipVariant(status, hasSearched)}
      />
    </div>
  );
};

export default PurchaseSearchStepper;
