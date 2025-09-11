import { showToastError } from '@/lib/toast';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { cartProductListStore, searchProductListStore } from '../_store';

const useProductSearchResult = () => {
  const setCartList = cartProductListStore((state) => state.setCartList);
  const {
    isNoResult,
    searchProductList,
    resetSearchProductList,
    searchWord,
    reset,
    searchProduct,
  } = searchProductListStore(
    useShallow((s) => ({
      searchWord: s.searchWord,
      isNoResult: s.isNoResult,
      searchProductList: s.searchProductList,
      reset: s.reset,
      resetSearchProductList: s.resetSearchProductList,
      searchProduct: s.searchProduct,
    })),
  );

  const addToCart = useCallback(() => {
    if (!searchProduct) {
      showToastError({ description: '상품이 존재하지 않습니다' });
      return;
    }

    setCartList(searchProduct);
  }, [setCartList, searchProduct]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return {
    searchProductList,
    addToCart,
    isNoResult,
    searchWord,
    resetSearchProductList,
  };
};

export default useProductSearchResult;
