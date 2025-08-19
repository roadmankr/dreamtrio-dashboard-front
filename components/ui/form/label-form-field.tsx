'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectBox from '@/components/ui/select/select-box';
import { defaultParse, getParseFieldValue } from '@/lib/form';
import { cn } from '@/lib/utils';
import { FormProps } from '@/shared/types/form';
import { DotFilledIcon } from '@radix-ui/react-icons';
import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Button } from '../button';
import FileUpload from '../file/file-upload';
import SearchSelectBox from '../select/search-select-box';

const LabelFormField = <T extends FieldValues, TExtra extends object = any>({
  form,
  name,
  label,
  disabled,
  autoFocus = false,
  labelFlexPosition = 'col',
  fieldClassName,
  labelDescription,
  required,
  ...props
}: FormProps<T, TExtra>) => {
  return (
    <div className={cn(`text-fluid flex w-full flex-1`, fieldClassName)}>
      <FormField
        key={name}
        control={form.control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem className='flex w-full max-w-full flex-1 flex-col'>
            <div
              className={cn(
                `flex gap-2 ${labelFlexPosition === 'row' ? 'flex-row' : 'flex-col'}`,
                fieldClassName,
              )}
            >
              {/* label */}
              <div
                className={cn(
                  `text-fluid flex min-w-[calc(4rem,15vw,5rem)] shrink-0 items-center justify-start gap-1`,
                  // `flex ${labelFlexPosition === 'row' ? 'min-w-[calc(4rem,15vw,5rem)] shrink-0' : ''} flex-col justify-center`,
                )}
              >
                {label && (
                  <div className='flex items-center bg-transparent text-sm font-semibold text-neutral-900'>
                    {label}
                    <div className='flex'>
                      {required ? (
                        <DotFilledIcon className='text-red-500' />
                      ) : undefined}
                    </div>
                  </div>
                )}
                <span className='text-xs font-medium text-neutral-500'>
                  {labelDescription}
                </span>
              </div>

              {/* form field */}
              <FormControl>
                <div className='flex w-full flex-row gap-1'>
                  {props.type === 'file' && (
                    <>
                      <FileUpload
                        accept={props.accept}
                        onChange={(file) => field.onChange(file)}
                      >
                        <div className='flex items-center gap-2'>
                          <Button type='button' variant={'outline'}>
                            파일 선택
                          </Button>
                          <span className='text-[clamp(0.8rem,1vw,0.875rem)]'>{`${field?.value?.name || '선택된 파일 없음'}`}</span>
                        </div>
                      </FileUpload>
                    </>
                  )}

                  {/* {props.type === 'dateTime' && (
                    <DateTimePicker
                      clearable={props.clearable}
                      hourCycle={24}
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date: Date | undefined) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                      {...props}
                      minDate={
                        props?.minDate ? new Date(props.minDate) : undefined
                      }
                      maxDate={
                        props?.maxDate ? new Date(props.maxDate) : undefined
                      }
                    />
                  )} */}

                  {/* {props.type === 'date' && (
                    <DatePickerInput
                      value={field.value}
                      placeholder={props?.placeholder}
                      minDate={
                        props?.minDate ? new Date(props.minDate) : undefined
                      }
                      maxDate={
                        props?.maxDate ? new Date(props.maxDate) : new Date()
                      }
                      onDateChange={(date: Date | undefined) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                  )} */}

                  {/* {props.type === 'textArea' && (
                    <Textarea
                      {...field}
                      value={`${field.value || ''}`}
                      placeholder={props?.placeholder || '입력'}
                      maxLength={props?.maxLength || undefined}
                      className='h-40 resize-none bg-white leading-6'
                      autoFocus={autoFocus}
                    />
                  )} */}

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
                    <props.component field={field} form={form} />
                  )}

                  {props.type === 'select' &&
                    (props.isSearchMode ? (
                      <SearchSelectBox
                        {...field}
                        key={name}
                        value={field.value}
                        placeholder={props.placeholder}
                        options={props.options}
                        onValueChange={(value: any) => {
                          props?.onChange?.({
                            value,
                            form,
                            ...(props.extra ?? {}),
                          } as {
                            value: any;
                            form: UseFormReturn<T>;
                          } & TExtra);
                          field.onChange(value);
                        }}
                      />
                    ) : (
                      <SelectBox
                        {...field}
                        key={name}
                        // isDeletable={props.isDeletable}
                        defaultValue={props.defaultValue ?? ''}
                        value={field.value}
                        placeholder={props.placeholder}
                        options={props.options}
                        className={props.className}
                        onValueChange={(value: any) => {
                          props?.onChange?.({
                            value,
                            form,
                            ...(props.extra ?? {}),
                          } as { value: any; form: UseFormReturn<T> } & TExtra);
                          field.onChange(value);
                        }}
                      />
                    ))}

                  {(props.type === 'text' || props.type === 'password') && (
                    <Input
                      {...field}
                      autoFocus={autoFocus}
                      type={props.type || 'text'}
                      value={getParseFieldValue(field.value, props.valueType)}
                      maxLength={props?.maxLength || undefined}
                      disabled={disabled || false}
                      readOnly={disabled}
                      autoComplete={
                        props.type === 'password' ? 'new-password' : ''
                      }
                      className={cn(
                        'h-10 w-full px-2 text-sm font-medium',
                        props.className,
                      )}
                      autoCapitalize='none'
                      placeholder={props?.placeholder || '입력'}
                      onChange={(e) => {
                        if (disabled) return;

                        const value = props.parse
                          ? props.parse?.(e.target.value)
                          : defaultParse(e.target.value, props.valueType);

                        field.onChange(value);
                        props.onChange?.({ value, form });
                      }}
                    />
                  )}

                  {props.subComponent}
                </div>
              </FormControl>
            </div>

            <FormMessage className='text-[0.8rem]' />
          </FormItem>
        )}
      />
    </div>
  );
};

export default React.memo(LabelFormField) as typeof LabelFormField;
