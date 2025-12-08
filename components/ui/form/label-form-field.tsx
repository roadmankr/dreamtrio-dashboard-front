'use client';

import { DatePickerWithRange } from '@/components/ui/datepicker/datepicker-range';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import FormFileField from '@/components/ui/form/form-file-field';
import FormInputField from '@/components/ui/form/form-input-field';
import FormSelectField from '@/components/ui/form/form-select-field';
import { cn } from '@/lib/utils';
import { FormProps } from '@/shared/types/form';
import { DotFilledIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

const LabelFormField = <T extends FieldValues, TExtra extends object = object>({
  form,
  name,
  label,
  disabled,
  autoFocus = false,
  labelFlexPosition = 'col',
  fieldClassName,
  labelDescription,
  required,
  toastOnError,
  ...props
}: FormProps<T, TExtra>) => {
  return (
    <Controller
      key={name}
      control={form.control}
      name={name}
      defaultValue={form.getValues(name)}
      render={({ field, fieldState }) => {
        return (
          <Field
            aria-invalid={fieldState.invalid}
            className={cn(
              'flex w-full max-w-full flex-1 flex-col',
              `flex gap-2 ${labelFlexPosition === 'row' ? 'flex-row' : 'flex-col'}`,
              fieldClassName,
            )}
          >
            {/* label */}
            <div
              className={cn(
                `text-fluid flex min-w-[calc(4rem,15vw,5rem)] shrink-0 items-center justify-start gap-1`,
              )}
            >
              {label && (
                <FieldLabel className='flex items-center bg-transparent text-sm font-semibold text-neutral-900'>
                  {label}
                  <div className='flex'>
                    {required ? (
                      <DotFilledIcon className='text-red-500' />
                    ) : undefined}
                  </div>
                </FieldLabel>
              )}
              <FieldDescription className='text-xs font-medium text-neutral-500'>
                {labelDescription}
              </FieldDescription>
            </div>

            {/* form field */}
            <FieldContent>
              <div className='flex w-full flex-row gap-1'>
                {props.type === 'file' && (
                  <FormFileField
                    {...props}
                    field={field}
                    isValid={fieldState.invalid}
                  />
                )}

                {props.type === 'dateRange' && (
                  <DatePickerWithRange
                    clearable={props.clearable}
                    value={field.value}
                    startDate={field.value.from}
                    endDate={field.value.to}
                    onSelect={({ from, to }) => field.onChange({ from, to })}
                    {...props}
                  />
                )}

                {props.type === 'label' && (
                  <span
                    className={cn(
                      'text flex h-10 w-full items-center px-1 text-sm font-medium opacity-50',
                      props.className,
                    )}
                  >
                    {field.value || '-'}
                  </span>
                )}

                {props.type === 'component' && (
                  <props.component field={field} form={form} {...props.extra} />
                )}

                {props.type === 'select' && (
                  <FormSelectField
                    {...props}
                    form={form}
                    field={field}
                    isValid={fieldState.invalid}
                    autoFocus={autoFocus}
                    disabled={disabled}
                  />
                )}

                {(props.type === 'text' || props.type === 'password') && (
                  <FormInputField
                    {...props}
                    form={form}
                    field={field}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    isValid={fieldState.invalid}
                  />
                )}

                {props.subComponent}
              </div>
            </FieldContent>

            <FieldError
              errors={[fieldState.error]}
              className='text-[0.8rem]'
              toastOnError={toastOnError}
            />
          </Field>
        );
      }}
    />
  );
};

// export default LabelFormField;
export default React.memo(LabelFormField) as typeof LabelFormField;
