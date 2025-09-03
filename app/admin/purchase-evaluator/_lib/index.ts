import { TStoreOptimal } from '@/entities/stores/model/type';
import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import { nf } from '@/lib/form';
import { buildQuery } from '@/lib/http';
import type { Dimension } from '@/shared/model/dimension';
import { ViewState } from '@/shared/model/status';
import { TSalesBreakDownResponse } from '@/shared/types/sales';
import { ActionType } from '../_components/common/DataSection.component';
import { colorConfig } from '../_config';
import { Category, COLOR_THRESHOLD } from '../_constants';

export function getThreshold<
  C extends Category,
  L extends keyof (typeof COLOR_THRESHOLD)[C],
>(cat: C, level: L) {
  return COLOR_THRESHOLD[cat][level];
}

export const getAgeColor = (data: TSalesBreakDownResponse[], key?: string) => {
  if (!key) return { colorInfo: colorConfig.gray, data: null };

  const total = data.reduce((s, r) => s + (r.totalPrice ?? 0), 0);
  let acc = 0;

  for (const r of data) {
    acc += r.totalPrice ?? 0;
    if (r.key === key) {
      const cumShare = +(acc / total).toFixed(2);
      const text = `상위 ${Math.floor(cumShare * 100)}%`;

      return cumShare <= getThreshold('AGE', 'GREEN')
        ? { colorInfo: colorConfig.green, data: text }
        : cumShare <= getThreshold('AGE', 'YELLOW')
          ? { colorInfo: colorConfig.yellow, data: text }
          : { colorInfo: colorConfig.red, data: text };
    }
  }

  return { colorInfo: colorConfig.gray, data: null };
};

export const getBrandColor = (
  data: TSalesBreakDownResponse[],
  key?: string,
) => {
  if (!key) return { colorInfo: colorConfig.gray, data: null };

  const total = data.reduce((s, r) => s + (r.totalPrice ?? 0), 0);
  let acc = 0;

  for (const r of data) {
    acc += r.totalPrice ?? 0;
    if (r.key === key) {
      const cumShare = +(acc / total).toFixed(2);
      const text = `상위 ${Math.floor(cumShare * 100)}%`;

      return cumShare <= getThreshold('BRAND', 'GREEN')
        ? { colorInfo: colorConfig.green, data: text }
        : cumShare <= getThreshold('BRAND', 'YELLOW')
          ? { colorInfo: colorConfig.yellow, data: text }
          : { colorInfo: colorConfig.red, data: text };
    }
  }

  return { colorInfo: colorConfig.gray, data: null };
};

export const getGenderColor = (
  data: TSalesBreakDownResponse[],
  key?: string,
) => {
  if (!key || !data.length) return { data: null, colorInfo: colorConfig.gray };

  if (data?.[0].key === key)
    return {
      data: `1등`,
      colorInfo: colorConfig.green,
    };

  if (data?.[1].key === key)
    return {
      data: `2등`,
      colorInfo: colorConfig.yellow,
    };

  if (data?.[2].key === key)
    return {
      data: `3등`,
      colorInfo: colorConfig.red,
    };

  return { data: null, colorInfo: colorConfig.gray };
};

export const getOptimalColor = ({
  optimalStockCost,
  currentStockCost,
}: TStoreOptimal) => {
  const data = `${optimalStockCost.toLocaleString()} / ${currentStockCost.toLocaleString()}`;
  if (optimalStockCost < currentStockCost * getThreshold('OPTIMAL', 'GREEN'))
    return { data, colorInfo: colorConfig.green };
  if (optimalStockCost < currentStockCost)
    return { data, colorInfo: colorConfig.yellow };
  if (optimalStockCost >= currentStockCost)
    return { data, colorInfo: colorConfig.red };

  return { data: null, colorInfo: colorConfig.gray };
};
export function getOptimalStockColor({
  quantity,
  optimalStock,
}: {
  quantity?: number | null;
  optimalStock?: number | null;
}) {
  if (
    quantity == null ||
    quantity == undefined ||
    optimalStock == null ||
    optimalStock == undefined ||
    optimalStock <= 0
  ) {
    return { data: null, colorInfo: colorConfig.gray };
  }

  const data = `${nf.format(quantity)} / ${nf.format(optimalStock)}`;

  if (quantity < optimalStock) {
    return { data, colorInfo: colorConfig.green };
  }
  if (quantity >= optimalStock * 2) {
    return { data, colorInfo: colorConfig.red };
  }

  return { data, colorInfo: colorConfig.yellow };
}

export const getStockRateColor = (stockRate?: number) => {
  if (stockRate === undefined || stockRate === null)
    return { data: null, colorInfo: colorConfig.gray };

  const data = `${nf.format(stockRate)}%`;
  if (stockRate > 10) return { data, colorInfo: colorConfig.green };
  if (stockRate > 5) return { data, colorInfo: colorConfig.yellow };

  return { data, colorInfo: colorConfig.red };
};

export const getSaleRateColor = (saleRate?: number) => {
  if (saleRate === undefined || saleRate === null)
    return { data: null, colorInfo: colorConfig.gray };

  const data = `${nf.format(saleRate)}%`;
  if (saleRate > 60) return { data, colorInfo: colorConfig.green };
  if (saleRate > 30) return { data, colorInfo: colorConfig.yellow };

  return { data, colorInfo: colorConfig.red };
};

export const getSalePriceColor = (
  onlinePrice?: number,
  offlinePrice?: number,
) => {
  if (
    onlinePrice === undefined ||
    onlinePrice === null ||
    offlinePrice === undefined ||
    offlinePrice === null
  )
    return { data: null, colorInfo: colorConfig.gray };

  const data = `${nf.format(onlinePrice)} / ${nf.format(offlinePrice)}`;
  // if (saleRate > 60) return { data, colorInfo: colorConfig.green };
  // if (saleRate > 30) return { data, colorInfo: colorConfig.yellow };

  return { data, colorInfo: colorConfig.red };
};

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
): ActionType | undefined => {
  if (!storeId) return undefined;

  return {
    type: 'link',
    url: `${process.env.NEXT_PUBLIC_BASE_URL!}/admin/dashboard${buildQuery({ storeId, saleDate: getSearchSaleDate(), dimension })}`,
  };
};
