/**
 * 카트에 수량과 가격이 바뀜에 따라 매장정보의 가용 재고의 수량이 변경되어야 하기 때문에
 */

import { cartProductListStore, selectedStore } from '../_store';

const useEffectiveOptimal = () => {
  const baseOptimal = selectedStore((s) => s.storeInfo.optimal);
  const totalCartPrice = cartProductListStore((s) =>
    s.cartList.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
  );

  return {
    ...baseOptimal,
    optimalStockCost: (baseOptimal.optimalStockCost ?? 0) + totalCartPrice,
  };
};

export default useEffectiveOptimal;
