import SelectBox from '@/components/ui/select/select-box';
import { useMemo } from 'react';
import { getMonthOptions } from '../model/lib';

const PeriodOption = ({
  value,
  onChange,
  disabled,
  placeholder = '기간 선택',
  className,
}: {
  value: string;
  onChange: (v: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) => {
  const common = useMemo(
    () => ({
      value,
      disabled,
      placeholder,
      options: getMonthOptions(),
      onValueChange: onChange,
      name: 'period',
      className,
    }),
    [value, onChange, disabled, placeholder, className],
  );

  return <SelectBox {...common} />;
};

export default PeriodOption;
