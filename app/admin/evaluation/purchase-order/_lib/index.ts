import { getMonthOptions } from '@/features/period-options/model/lib';
import { buildQuery } from '@/lib/http';
import type { Dimension } from '@/shared/model/dimension';
import { ViewState } from '@/shared/model/status';
import { Action } from '../_constants';

// PurchaseSearchStepper.tsx에서 보여질 css
export const chipClass = (base: 'active' | 'muted') =>
  base === 'active'
    ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300/50'
    : 'bg-slate-200 text-slate-700';

// PurchaseSearchStepper.tsx에서 보여질 css
export const resultChipVariant = (status: ViewState, hasSearched: boolean) => {
  if (!hasSearched) return chipClass('muted');
  if (status === ViewState.ERROR)
    return 'bg-rose-50     text-rose-700  border-rose-200';
  if (status === ViewState.SUCCESS)
    return 'bg-emerald-50  text-emerald-700 border-emerald-200';
  if (status === ViewState.PENDING)
    return 'bg-slate-100   text-slate-600  border-slate-200';
  return chipClass('muted');
};

export const getSearchSaleDate = () => getMonthOptions()?.[1].value;

export const makeActionTypeByDimension = (
  storeId: number,
  dimension: Dimension,
): Action | undefined => {
  if (!storeId) return undefined;

  return {
    type: 'link',
    url: `${process.env.NEXT_PUBLIC_BASE_URL!}/admin/dashboard${buildQuery({ storeId, saleDate: getSearchSaleDate(), dimension })}`,
  };
};
