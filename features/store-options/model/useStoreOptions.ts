import { useGetStoreList } from '@/entities/stores/model/model';
import { SelectOption } from '@/shared/types/form';
import { useMemo } from 'react';

const useStoreOptions = ({
  isNeedTotalOption,
}: {
  isNeedTotalOption?: boolean;
} = {}) => {
  const { data } = useGetStoreList();
  const storeOptions: SelectOption[] = useMemo(
    () => data?.map((d) => ({ label: d.name, value: d.id })) || [],
    [data],
  );

  return {
    storeOptions: isNeedTotalOption
      ? [{ label: '전체', value: 0 }, ...storeOptions]
      : storeOptions,
  };
};

export default useStoreOptions;
