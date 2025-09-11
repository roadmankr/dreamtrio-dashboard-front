import SearchSelectBox from '@/components/ui/select/search-select-box';
import SelectBox from '@/components/ui/select/select-box';
import { useMemo } from 'react';
import useStoreOptions from '../model/useStoreOptions';

const StoreOption = ({
  value,
  onChange,
  disabled,
  placeholder = '매장 선택',
  isNeedTotalOption = false,
  isSearchMode = false,
  className,
}: {
  value: string;
  onChange: (v: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
  isNeedTotalOption?: boolean;
  isSearchMode?: boolean;
  className?: string;
}) => {
  const { storeOptions } = useStoreOptions({ isNeedTotalOption });
  const common = useMemo(
    () => ({
      value,
      disabled,
      placeholder,
      options: storeOptions,
      onValueChange: onChange,
      className,
    }),
    [storeOptions, value, onChange, disabled, placeholder, className],
  );

  return (
    <>
      {isSearchMode ? (
        <SearchSelectBox {...common} />
      ) : (
        <SelectBox {...common} />
      )}
    </>
  );
};

export default StoreOption;
