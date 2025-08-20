import useGetStoreList from '@/entities/store/model/hooks/useGetStoreList';
import { SelectOption } from '@/shared/types/form';
import { useMemo } from 'react';

const useStoreOptions = ({
  isNeedTotalOption,
}: {
  isNeedTotalOption?: boolean;
} = {}) => {
  const { data } = useGetStoreList();
  const storeOptions: SelectOption[] = useMemo(
    () => data?.map((d) => ({ label: d, value: d })) || [],
    [data],
  );

  return {
    storeOptions: isNeedTotalOption
      ? [{ label: '전체', value: '' }, ...storeOptions]
      : storeOptions,
  };
};

export default useStoreOptions;
