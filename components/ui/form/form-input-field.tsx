import { Input } from '@/components/ui/input';
import { defaultParse, getParseFieldValue } from '@/lib/form';
import { cn } from '@/lib/utils';
import { FormInputType, TFormFieldBaseProps } from '@/shared/types/form';
import React, { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

const FormInputField = <T extends FieldValues>({
  form,
  field,
  autoFocus,
  valueType,
  maxLength,
  disabled,
  type,
  className,
  placeholder,
  parse,
  onChange,
}: TFormFieldBaseProps<T> & FormInputType<T>) => {
  const inputRef = useCallback(
    (node: HTMLInputElement | null) => {
      field.ref(node); // RHF 연결
      if (autoFocus && node) {
        queueMicrotask(() => node.focus());
      }
    },
    [autoFocus, field],
  );

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const value = parse
        ? parse?.(e.target.value)
        : defaultParse(e.target.value, valueType);

      field.onChange(value);
      onChange?.({ value, form });
    },
    [field, onChange, disabled, form],
  );

  return (
    <Input
      {...field}
      onBlur={field.onBlur}
      ref={inputRef}
      id={field.name}
      autoFocus={autoFocus}
      type={type || 'text'}
      value={getParseFieldValue(field.value, valueType)}
      maxLength={maxLength || undefined}
      disabled={disabled || false}
      readOnly={disabled}
      autoComplete={type === 'password' ? 'new-password' : ''}
      className={cn('h-10 w-full px-2 text-sm font-medium', className)}
      autoCapitalize='none'
      placeholder={placeholder || '입력'}
      onChange={onChangeValue}
    />
  );
};

export default FormInputField;
