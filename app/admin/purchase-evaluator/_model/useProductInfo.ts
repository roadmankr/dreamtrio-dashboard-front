import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ViewState } from '@/shared/model/status';
import {
  getOptimalStockColor,
  getSalePriceColor,
  getSaleRateColor,
  getStockRateColor,
} from '../_lib';
import { searchProductListStore, selectedStore } from '../_store';

const useProductInfo = () => {
  const { storeId } = selectedStore((state) => state.storeInfo);
  const [isPending, searchProduct] = searchProductListStore(
    useShallow((state) => [state.isPending, state.searchProduct]),
  );

  const optimalStockColor = useMemo(
    () =>
      getOptimalStockColor({
        quantity: searchProduct?.quantity,
        optimalStock: searchProduct?.optimalStock,
      }),
    [searchProduct?.optimalStock, searchProduct?.quantity],
  );

  const stockRateColor = useMemo(
    () => getStockRateColor(searchProduct?.stockRate),
    [searchProduct?.stockRate],
  );

  const saleRateColor = useMemo(
    () => getSaleRateColor(searchProduct?.saleRate),
    [searchProduct?.saleRate],
  );

  const salePriceColor = useMemo(
    () => getSalePriceColor(),
    [searchProduct?.barcode],
  );

  const status =
    !storeId && !isPending
      ? ViewState.IDLE
      : storeId > 0 && isPending
        ? ViewState.PENDING
        : searchProduct?.barcode && !isPending
          ? ViewState.SUCCESS
          : ViewState.EMPTY;

  return {
    status,
    saleRateColor,
    stockRateColor,
    optimalStockColor,
    searchProduct,
    salePriceColor,
  };
};

export default useProductInfo;
