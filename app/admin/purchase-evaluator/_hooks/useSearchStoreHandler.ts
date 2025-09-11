import { storeQueries } from '@/entities/stores/model/queries';
import useStoreOptions from '@/features/store-options/model/useStoreOptions';
import { showToastError } from '@/lib/toast';
import { DIMENSION } from '@/shared/model/dimension';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { salesQueries } from '@/entities/sales/api/queries';
import { TStoreDateFilter } from '../../dashboard/_schema/dashboard.schema';
import { getSearchSaleDate } from '../_lib';
import {
  cartProductListStore,
  searchProductListStore,
  selectedStore,
} from '../_store';

const useSearchStoreHandler = () => {
  const { storeOptions } = useStoreOptions();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const resetCartList = cartProductListStore((state) => state.resetCartList);
  const setSearchProduct = searchProductListStore(
    (state) => state.setSearchProduct,
  );
  const { setStoreInfo, resetStore, setPending } = selectedStore(
    useShallow((state) => ({
      setStoreInfo: state.setStoreInfo,
      resetStore: state.resetStore,
      setPending: state.setPending,
    })),
  );

  const resetTotalStore = useCallback(() => {
    resetCartList();
    resetStore();
    setSearchProduct('reset');
  }, [resetCartList, resetStore, setSearchProduct]);

  useEffect(() => {
    setPending(isPending);
  }, [isPending, setPending]);

  const getStoreInfo = useCallback(
    (storeId: number) => {
      startTransition(async () => {
        try {
          const storeName = storeOptions.find(
            (f) => f.value === storeId,
          )?.label;

          if (!storeName) {
            showToastError({ description: '매장이 존재하지 않습니다' });
            return;
          }

          resetTotalStore();
          const result = await queryClient.fetchQuery(
            storeQueries.detail(storeId),
          );

          const params = {
            storeId: storeId,
            saleDate: getSearchSaleDate(),
          } satisfies TStoreDateFilter;

          const [age, brand, gender] = await Promise.all([
            queryClient.fetchQuery(
              salesQueries.breakdown({ ...params, dimension: DIMENSION.AGE }),
            ),
            queryClient.fetchQuery(
              salesQueries.breakdown({
                ...params,
                dimension: DIMENSION.BRAND,
              }),
            ),
            queryClient.fetchQuery(
              salesQueries.breakdown({
                ...params,
                dimension: DIMENSION.GENDER,
              }),
            ),
          ]);

          setStoreInfo({
            age,
            brand,
            gender,
            optimal: result,
            storeId,
            storeName,
          });
        } catch (error: unknown) {
          console.error(error);
        }
      });
    },
    [setStoreInfo, storeOptions, queryClient, resetTotalStore, setPending],
  );
  return { isPending, getStoreInfo, storeOptions };
};

export default useSearchStoreHandler;
