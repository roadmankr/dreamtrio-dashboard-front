import { useShallow } from 'zustand/react/shallow';

import { ViewState } from '@/shared/model/status';
import { searchProductListStore, selectedStore } from '../_store';

const usePurchaseSearchStepper = () => {
  const { storeId } = selectedStore((state) => state.storeInfo);
  const [isNoResult, isPending] = searchProductListStore(
    useShallow((state) => [state.isNoResult, state.isPending]),
  );

  const status: ViewState = isPending
    ? ViewState.PENDING
    : isNoResult === null
      ? ViewState.IDLE
      : !isNoResult && !isPending
        ? ViewState.SUCCESS
        : ViewState.ERROR;

  const hasSearched = status !== ViewState.IDLE; // 상품 검색을 했는지(성공 혹은 실패)
  const hasSelectedStore = storeId > 0; // 매장검색에 성공을 했는지. 실패했으면 상품 검색도 X

  return {
    hasSelectedStore,
    isPending, // 검색 중
    status,
    hasSearched,
  };
};

export default usePurchaseSearchStepper;
