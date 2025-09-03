import { DIMENSION } from '@/shared/model/dimension';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ViewState } from '@/shared/model/status';
import {
  getAgeColor,
  getBrandColor,
  getGenderColor,
  getOptimalColor,
  makeActionTypeByDimension,
} from '../_lib';
import { searchProductListStore, selectedStore } from '../_store';
import useEffectiveOptimal from './useEffectiveOptimal';

const useStoreInfo = () => {
  const { storeId, age, gender, brand, storeName, isPending } = selectedStore(
    useShallow((s) => ({
      storeId: s.storeInfo.storeId,
      age: s.storeInfo.age,
      gender: s.storeInfo.gender,
      brand: s.storeInfo.brand,
      storeName: s.storeInfo.storeName,
      isPending: s.isPending,
    })),
  );
  const optimal = useEffectiveOptimal(); // optimal값은 위에 store에서 안꺼내고 해당 훅에서 가공 후 리턴
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

  const optimalColor = useMemo(() => getOptimalColor(optimal), [optimal]);

  const ageActionType = useMemo(
    () => makeActionTypeByDimension(storeId, DIMENSION.AGE),
    [storeId],
  );

  const brandActionType = useMemo(
    () => makeActionTypeByDimension(storeId, DIMENSION.BRAND),
    [storeId],
  );

  const genderActionType = useMemo(
    () => makeActionTypeByDimension(storeId, DIMENSION.GENDER),
    [storeId],
  );

  const status = isPending
    ? ViewState.PENDING
    : !storeId
      ? ViewState.IDLE
      : storeId > 0 && !isPending
        ? ViewState.SUCCESS
        : ViewState.ERROR;

  return {
    storeId,
    storeName,
    typeAgeColor,
    typeBrandColor,
    isPending,
    optimalColor,
    typeGenderColor,
    status,
    ageActionType,
    brandActionType,
    genderActionType,
  };
};

export default useStoreInfo;
