import { showToastError } from '@/lib/toast';
import useModalState from '@/shared/hooks/useModalState';
import { FormSelectType, TFormBaseChange } from '@/shared/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { searchStoreFormField } from '../_config';
import { STORE_KEY } from '../_constants';
import { TSearchStore } from '../_schema';
import { cartProductListStore, selectedStore } from '../_store';
import { searchStoreSchema } from './../_schema/index';
import useSearchStoreHandler from './useSearchStoreHandler';

const useSearchStoreForm = () => {
  const oriStoreIdRef = useRef(0);
  const pendingStoreIdRef = useRef<number | null>(null);
  const { isOpen, handleOpenChange } = useModalState();
  const { getStoreInfo, isPending, storeOptions } = useSearchStoreHandler();
  const isHaveCartList = cartProductListStore((state) => state.cartList.length);
  const { resetStore, storeInfo } = selectedStore(
    useShallow((state) => ({
      resetStore: state.resetStore,
      storeInfo: state.storeInfo,
    })),
  );
  const form = useForm<TSearchStore>({
    resolver: zodResolver(searchStoreSchema),
    mode: 'onChange',
    defaultValues: {
      [STORE_KEY]: '',
    },
  });

  useEffect(() => {
    oriStoreIdRef.current = storeInfo.storeId;
  }, [storeInfo.storeId]);

  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  const onSubmit = useCallback(
    (data: TSearchStore) => {
      const storeId = Number(data.storeId);

      if (
        oriStoreIdRef.current &&
        oriStoreIdRef.current !== storeId &&
        isHaveCartList
      ) {
        pendingStoreIdRef.current = storeId;
        handleOpenChange(true);
        return;
      }

      getStoreInfo(storeId);
    },
    [getStoreInfo, handleOpenChange, isHaveCartList],
  );

  const onConfirmChange = useCallback(async () => {
    const id = pendingStoreIdRef.current;
    if (id == null) {
      showToastError({ description: '매장이 존재하지 않습니다' });
      return;
    }

    await getStoreInfo(id);
    pendingStoreIdRef.current = null;
    handleOpenChange(false);
  }, [getStoreInfo, handleOpenChange]);

  const onCancelChange = useCallback(() => {
    form.reset(
      { [STORE_KEY]: String(oriStoreIdRef.current || '') },
      { keepDirty: false, keepTouched: false },
    );
    pendingStoreIdRef.current = null;
    handleOpenChange(false);
  }, [form, handleOpenChange]);

  const onChangeSelect = useCallback(
    (props?: TFormBaseChange<TSearchStore>) => {
      if (form.formState.isSubmitting) return;
      queueMicrotask(() => props?.form.handleSubmit(onSubmit)());
    },
    [form, onSubmit],
  );

  const storeFormField = useMemo(
    () =>
      ({
        ...searchStoreFormField,
        options: storeOptions,
        disabled: !!isPending,
        onChange: (props) => onChangeSelect(props),
      }) satisfies FormSelectType<TSearchStore>,
    [storeOptions, onChangeSelect, isPending],
  );

  return {
    storeFormField,
    form,
    onSubmit,
    isOpen,
    handleOpenChange,
    onConfirmChange,
    onCancel: onCancelChange,
  };
};

export default useSearchStoreForm;
