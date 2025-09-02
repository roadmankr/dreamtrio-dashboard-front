import { buildQuery } from '@/lib/http';
import { DIMENSION } from '@/shared/types/sales';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ActionType } from '../_components/common/DataSection.component';
import { SEARCH_SALE_DATE, SearchStatus } from '../_constants';
import {
  getAgeColor,
  getBrandColor,
  getGenderColor,
  getOptimalColor,
} from '../_lib';
import { searchProductListStore, selectedStore } from '../_store';
import useEffectiveOptimal from './useEffectiveOptimal';

const useStoreInfo = () => {
  const { storeId, age, gender, brand, storeName, isPending } = selectedStore(
    useShallow((state) => ({
      storeId: state.storeInfo.storeId,
      age: state.storeInfo.age,
      gender: state.storeInfo.gender,
      brand: state.storeInfo.brand,
      storeName: state.storeInfo.storeName,
      isPending: state.isPending,
      storeInfo: state.storeInfo,
    })),
  );
  const optimal = useEffectiveOptimal();
  const product = searchProductListStore((state) => state.searchProduct);

  const typeAgeColor = useMemo(
    () => ({
      ...getAgeColor(age, product?.typeAge),
      actionType: {},
    }),
    [age, product?.typeAge],
  );

  const typeGenderColor = useMemo(
    () => getGenderColor(gender, product?.typeGender),
    [gender, product?.typeGender],
  );

  const typeBrandColor = useMemo(
    () => getBrandColor(brand, product?.typeBrand),
    [brand, product?.typeBrand],
  );

  const optimalColor = useMemo(
    () => ({
      colorInfo: getOptimalColor(optimal),
      data: `${optimal.optimalStockCost.toLocaleString()} / ${optimal.currentStockCost.toLocaleString()}`,
    }),
    [optimal],
  );

  const actionType = {
    type: 'link',
    url: `${process.env.NEXT_PUBLIC__BASE_URL!}/admin/dashboard`,
    // url: `${process.env.NEXT_PUBLIC__BASE_URL!}/admin/dashboard${buildQuery({ storeId, saleDate: SEARCH_SALE_DATE })}`,
  } satisfies ActionType;

  const ageActionType = useMemo(
    () => ({
      ...actionType,
      url: `${actionType.url}${buildQuery({ storeId, saleDate: SEARCH_SALE_DATE, dimesion: DIMENSION.AGE })}`,
    }),
    [storeId],
  );
  const brandActionType = useMemo(
    () => ({
      ...actionType,
      url: `${actionType.url}${buildQuery({ storeId, saleDate: SEARCH_SALE_DATE, dimesion: DIMENSION.BRAND })}`,
    }),
    [storeId],
  );
  const genderActionType = useMemo(
    () => ({
      ...actionType,
      url: `${actionType.url}${buildQuery({ storeId, saleDate: SEARCH_SALE_DATE, dimesion: DIMENSION.GENDER })}`,
    }),
    [storeId],
  );

  const status = isPending
    ? SearchStatus.PENDING
    : !storeId
      ? SearchStatus.IDLE
      : storeId > 0 && !isPending
        ? SearchStatus.SUCCESS
        : SearchStatus.FAIL;

  return {
    storeId,
    storeName,
    typeAgeColor,
    typeBrandColor,
    isPending,
    optimalColor,
    typeGenderColor,
    status,
    actionType,
    ageActionType,
    brandActionType,
    genderActionType,
  };
};

export default useStoreInfo;
