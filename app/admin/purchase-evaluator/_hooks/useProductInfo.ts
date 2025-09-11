import { useShallow } from 'zustand/react/shallow';

import { ViewState } from '@/shared/model/status';

import useProductSignals from '@/entities/commerce-analytics/hooks/useProductSignals';
import { searchProductListStore, selectedStore } from '../_store';

const useProductInfo = () => {
  const { storeId } = selectedStore((state) => state.storeInfo);
  const [isPending, searchProduct] = searchProductListStore(
    useShallow((state) => [state.isPending, state.searchProduct]),
  );

  const { saleRateSignal, stockRateSignal, optimalSignal, priceSignal } =
    useProductSignals({
      quantity: searchProduct?.quantity,
      optimalStock: searchProduct?.optimalStock,
      saleRate: searchProduct?.saleRate,
      stockRate: searchProduct?.stockRate,
    });

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
    saleRateSignal,
    stockRateSignal,
    optimalSignal,
    priceSignal,
    searchProduct,
  };
};

export default useProductInfo;
