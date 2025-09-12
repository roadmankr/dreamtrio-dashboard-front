import { TBaseSales } from '@/entities/sales/model/types';
import { TStoreOptimal } from '@/entities/stores/model/type';
import { nf } from '@/lib/form';
import { TAnalytisSignal } from '../model/type';
import { COLOR_SCORE, colorConfig } from '../ui/tokens';
import { getThreshold } from './utils';

export const getAgeColor = (
  data: TBaseSales[],
  key?: string,
): TAnalytisSignal => {
  if (!key)
    return {
      colorInfo: colorConfig.gray,
      data: null,
      score: COLOR_SCORE['gray'],
    };

  const total = data.reduce((s, r) => s + (r.totalPrice ?? 0), 0);
  let acc = 0;

  for (const r of data) {
    acc += r.totalPrice ?? 0;
    if (r.key === key) {
      const cumShare = +(acc / total).toFixed(2);
      const text = `상위 ${Math.floor(cumShare * 100)}%`;

      return cumShare <= getThreshold('AGE', 'GREEN')
        ? {
            colorInfo: colorConfig.green,
            data: text,
            score: COLOR_SCORE['green'],
          }
        : cumShare <= getThreshold('AGE', 'YELLOW')
          ? {
              colorInfo: colorConfig.yellow,
              data: text,
              score: COLOR_SCORE['yellow'],
            }
          : {
              colorInfo: colorConfig.red,
              data: text,
              score: COLOR_SCORE['red'],
            };
    }
  }

  return {
    colorInfo: colorConfig.gray,
    data: null,
    score: COLOR_SCORE['gray'],
  };
};

export const getBrandColor = (
  data: TBaseSales[],
  key?: string,
): TAnalytisSignal => {
  if (!key)
    return {
      colorInfo: colorConfig.gray,
      data: null,
      score: COLOR_SCORE['gray'],
    };

  const total = data.reduce((s, r) => s + (r.totalPrice ?? 0), 0);
  let acc = 0;

  for (const r of data) {
    acc += r.totalPrice ?? 0;
    if (r.key === key) {
      const cumShare = +(acc / total).toFixed(2);
      const text = `상위 ${Math.floor(cumShare * 100)}%`;

      return cumShare <= getThreshold('BRAND', 'GREEN')
        ? {
            colorInfo: colorConfig.green,
            data: text,
            score: COLOR_SCORE['green'],
          }
        : cumShare <= getThreshold('BRAND', 'YELLOW')
          ? {
              colorInfo: colorConfig.yellow,
              data: text,
              score: COLOR_SCORE['yellow'],
            }
          : {
              colorInfo: colorConfig.red,
              data: text,
              score: COLOR_SCORE['red'],
            };
    }
  }

  return {
    colorInfo: colorConfig.gray,
    data: null,
    score: COLOR_SCORE['gray'],
  };
};

export const getGenderColor = (
  data: TBaseSales[],
  key?: string,
): TAnalytisSignal => {
  if (!key || !data.length)
    return {
      data: null,
      colorInfo: colorConfig.gray,
      score: COLOR_SCORE['gray'],
    };

  if (data?.[0].key === key)
    return {
      data: `1등`,
      colorInfo: colorConfig.green,
      score: COLOR_SCORE['green'],
    };

  if (data?.[1].key === key)
    return {
      data: `2등`,
      colorInfo: colorConfig.yellow,
      score: COLOR_SCORE['yellow'],
    };

  if (data?.[2].key === key)
    return {
      data: `3등`,
      colorInfo: colorConfig.red,
      score: COLOR_SCORE['red'],
    };

  return {
    data: null,
    colorInfo: colorConfig.gray,
    score: COLOR_SCORE['gray'],
  };
};

export const getOptimalColor = ({
  optimalStockCost,
  currentStockCost,
}: TStoreOptimal): TAnalytisSignal => {
  const data = `${optimalStockCost.toLocaleString()} / ${currentStockCost.toLocaleString()}`;
  if (optimalStockCost < currentStockCost * getThreshold('OPTIMAL', 'GREEN'))
    return { data, colorInfo: colorConfig.green, score: COLOR_SCORE['green'] };
  if (optimalStockCost < currentStockCost)
    return {
      data,
      colorInfo: colorConfig.yellow,
      score: COLOR_SCORE['yellow'],
    };
  if (optimalStockCost >= currentStockCost)
    return { data, colorInfo: colorConfig.red, score: COLOR_SCORE['red'] };

  return {
    data: null,
    colorInfo: colorConfig.gray,
    score: COLOR_SCORE['gray'],
  };
};
export function getOptimalStockColor({
  quantity,
  optimalStock,
}: {
  quantity?: number | null;
  optimalStock?: number | null;
}): TAnalytisSignal {
  if (
    quantity == null ||
    quantity == undefined ||
    optimalStock == null ||
    optimalStock == undefined ||
    optimalStock <= 0
  ) {
    return {
      data: null,
      colorInfo: colorConfig.gray,
      score: COLOR_SCORE['gray'],
    };
  }

  const data = `${nf.format(quantity)} / ${nf.format(optimalStock)}`;

  if (quantity < optimalStock) {
    return { data, colorInfo: colorConfig.green, score: COLOR_SCORE['green'] };
  }
  if (quantity >= optimalStock * 2) {
    return { data, colorInfo: colorConfig.red, score: COLOR_SCORE['red'] };
  }

  return { data, colorInfo: colorConfig.yellow, score: COLOR_SCORE['yellow'] };
}

export const getStockRateColor = (stockRate?: number): TAnalytisSignal => {
  if (stockRate === undefined || stockRate === null)
    return {
      data: null,
      colorInfo: colorConfig.gray,
      score: COLOR_SCORE['gray'],
    };

  const data = `${nf.format(stockRate)}%`;
  if (stockRate > getThreshold('STOCK', 'GREEN'))
    return { data, colorInfo: colorConfig.green, score: COLOR_SCORE['green'] };
  if (stockRate > getThreshold('STOCK', 'YELLOW'))
    return {
      data,
      colorInfo: colorConfig.yellow,
      score: COLOR_SCORE['yellow'],
    };

  return { data, colorInfo: colorConfig.red, score: COLOR_SCORE['red'] };
};

export const getSaleRateColor = (saleRate?: number): TAnalytisSignal => {
  if (saleRate === undefined || saleRate === null)
    return {
      data: null,
      colorInfo: colorConfig.gray,
      score: COLOR_SCORE['gray'],
    };

  const data = `${nf.format(saleRate)}%`;
  if (saleRate > getThreshold('SALE', 'GREEN'))
    return { data, colorInfo: colorConfig.green, score: COLOR_SCORE['green'] };
  if (saleRate > getThreshold('SALE', 'YELLOW'))
    return {
      data,
      colorInfo: colorConfig.yellow,
      score: COLOR_SCORE['yellow'],
    };

  return { data, colorInfo: colorConfig.red, score: COLOR_SCORE['red'] };
};

//아직 데이터가 없어서 로직 미완성
export const getSalePriceColor = (
  onlinePrice?: number,
  offlinePrice?: number,
): TAnalytisSignal => {
  if (
    onlinePrice === undefined ||
    onlinePrice === null ||
    offlinePrice === undefined ||
    offlinePrice === null
  )
    return {
      data: null,
      colorInfo: colorConfig.gray,
      score: COLOR_SCORE['gray'],
    };

  const data = `${nf.format(onlinePrice)} / ${nf.format(offlinePrice)}`;
  // if (saleRate > 60) return { data, colorInfo: colorConfig.green };
  // if (saleRate > 30) return { data, colorInfo: colorConfig.yellow };

  return { data, colorInfo: colorConfig.red, score: COLOR_SCORE['red'] };
};
