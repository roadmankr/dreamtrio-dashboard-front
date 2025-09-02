import { productQueries } from '@/entities/product/model/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useTransition,
} from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import {
  searchProductFormDefaultValues,
  searchProductFormField,
} from '../_config';
import { BARCODE_KEY } from '../_constants';
import { searchProductForBarcodeSchema, TSearchProduct } from '../_schema';
import { searchProductListStore, selectedStore } from '../_store';

const useSearchProductForm = () => {
  const storeIdRef = useRef(0);
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { storeInfo, resetStore } = selectedStore(
    useShallow((s) => ({
      storeInfo: s.storeInfo,
      resetStore: s.resetStore,
    })),
  );
  const {
    setPending,
    resetSearchProductList,
    setSearchProduct,
    setSearchWord,
  } = searchProductListStore(
    useShallow((s) => ({
      setPending: s.setPending,
      setSearchWord: s.setSearchWord,
      resetSearchProductList: s.resetSearchProductList,
      setSearchProduct: s.setSearchProduct,
    })),
  );
  const storeId = useMemo(() => storeInfo.storeId, [storeInfo.storeId]);

  const form = useForm<TSearchProduct>({
    resolver: zodResolver(searchProductForBarcodeSchema),
    defaultValues: searchProductFormDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = useCallback(
    async (data: TSearchProduct) => {
      startTransition(async () => {
        try {
          const result = await queryClient.fetchQuery(
            productQueries.byBarcode(data.barcode, storeId),
          );

          setSearchWord(data.barcode);
          setSearchProduct(result);
        } catch {
          setSearchProduct(null);
        }
      });
    },
    [setSearchProduct, setSearchWord, storeId],
  );

  useEffect(() => {
    setPending(isPending);
  }, [isPending, setPending]);

  useLayoutEffect(() => {
    if (!storeId) return;
    if (storeId === storeIdRef.current) return; // 같은 값이면 중복 포커스 방지
    storeIdRef.current = storeId;

    form.reset(searchProductFormDefaultValues);

    setTimeout(() => {
      form.setFocus(BARCODE_KEY);
    }, 0);

    return () => {
      storeIdRef.current = 0;
      resetStore();
    };
  }, [storeId, resetStore]);

  const formField = useMemo(
    () => ({
      ...searchProductFormField,
      disabled: !storeId,
      placeholder: storeId ? '바코드 입력' : '매장을 먼저 선택해주세요',
    }),
    [storeId],
  );

  const disabled = useMemo(
    () => !form.formState.isValid,
    [form.formState.isValid],
  );

  return { form, onSubmit, formField, disabled, resetSearchProductList };
};

export default useSearchProductForm;
