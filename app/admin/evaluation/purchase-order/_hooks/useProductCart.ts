import { exportToXlsx } from '@/lib/excel';
import { defaultParse } from '@/lib/form';
import { useCallback, useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ViewState } from '@/shared/model/status';
import { getSearchSaleDate } from '../_lib';
import {
  cartProductListStore,
  searchProductListStore,
  selectedStore,
} from '../_store';

const useProductCart = () => {
  const [isPending, startTransition] = useTransition();
  const storeName = selectedStore((state) => state.storeInfo.storeName);
  const barcode = searchProductListStore(
    (state) => state.searchProduct?.barcode,
  );
  const { cartList, removeCart, changeQty } = cartProductListStore(
    useShallow((state) => ({
      removeCart: state.removeCart,
      cartList: state.cartList,
      changeQty: state.changeQty,
    })),
  );

  const downloadExcel = useCallback(() => {
    startTransition(() => {
      const rows = cartList.map((c) => ({
        바코드: c.barcode,
        상품명: c.productName,
        브랜드: c.typeBrand ?? '',
        수량: c.qty,
        단가: c.price,
        금액: c.qty * c.price,
      }));

      const header = ['바코드', '상품명', '브랜드', '수량', '단가', '금액'];
      const filename = `${getSearchSaleDate()}_${storeName}`;

      exportToXlsx(rows, {
        columns: header,
        autoWidth: true,
        sheetName: '장바구니',
        filename: `${filename}.xlsx`,
      });
    });
  }, [cartList, storeName, barcode]);

  const onChangeQtyInCart = useCallback(
    (barcode: string, value: string) => {
      changeQty(barcode, defaultParse(value, 'number'));
    },
    [changeQty],
  );

  const status = isPending
    ? ViewState.PENDING
    : cartList.length > 0
      ? ViewState.SUCCESS
      : ViewState.ERROR;

  const totalQty = cartList.reduce((acc, curr) => acc + curr.qty, 0);
  const totalPrice = cartList.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0,
  );

  return {
    cartList,
    totalPrice,
    downloadExcel,
    removeCart,
    onChangeQtyInCart,
    isPending,
    status,
    totalQty,
  };
};

export default useProductCart;
