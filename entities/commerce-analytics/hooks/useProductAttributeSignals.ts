// entities/commerce-analytics/hooks/useProductAttributeSignals.ts
import { TProduct } from '@/entities/product/model/type';
import { TStoreOptimal } from '@/entities/stores/model/type';
import { TSalesBreakDownResponse } from '@/shared/types/sales';
import { useMemo } from 'react';
import {
  getAgeColor,
  getBrandColor,
  getGenderColor,
  getOptimalColor,
} from '../lib/metrics';

export function useProductAttributeSignals(params: {
  age: TSalesBreakDownResponse[];
  gender: TSalesBreakDownResponse[];
  brand: TSalesBreakDownResponse[];

  product: TProduct | null;
  optimal: TStoreOptimal;
}) {
  const { age, gender, brand, optimal, product } = params;

  const typeAgeSignal = useMemo(
    () => getAgeColor(age, product?.typeAge),
    [age, product?.typeAge],
  );

  const typeGenderSignal = useMemo(
    () => getGenderColor(gender, product?.typeGender),
    [gender, product?.typeGender],
  );

  const typeBrandSignal = useMemo(
    () => getBrandColor(brand, product?.typeBrand),
    [brand, product?.typeBrand],
  );

  const optimalSignal = useMemo(() => getOptimalColor(optimal), [optimal]);

  return { typeAgeSignal, typeGenderSignal, typeBrandSignal, optimalSignal };
}
