import SearchSelectBox from '@/components/ui/select/search-select-box';
import SelectBox from '@/components/ui/select/select-box';
import { FormSelectType, TFormFieldBaseProps } from '@/shared/types/form';
import { FieldValues } from 'react-hook-form';

const FormSelectField = <T extends FieldValues>({
  field,
  options,
  form,
  isSearchMode,
  onChange,
  disabled,
  className,
  isValid,
  defaultValue,
  placeholder,
}: TFormFieldBaseProps<T> & FormSelectType<T>) => {
  const Component = isSearchMode ? SearchSelectBox : SelectBox;

  return (
    <>
      <Component
        {...field}
        key={field.name}
        value={field.value}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        isValid={isValid}
        defaultValue={defaultValue}
        options={options}
        onValueChange={(value: unknown) => {
          onChange?.({ value, form });
          field.onChange(value);
        }}
      />
    </>
  );
};

export default FormSelectField;
