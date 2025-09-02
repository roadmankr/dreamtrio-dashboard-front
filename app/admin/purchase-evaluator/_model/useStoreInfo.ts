import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { SearchStatus } from '../_constants';
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
    })),
  );
  const optimal = useEffectiveOptimal();
  const product = searchProductListStore((state) => state.searchProduct);

  const typeAgeColor = useMemo(
    () => getAgeColor(age, product?.typeAge),
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
  };
};

export default useStoreInfo;
