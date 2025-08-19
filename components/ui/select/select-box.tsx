import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CircleXIcon } from 'lucide-react';
import React, { JSX } from 'react';

interface Props<T> {
  options: { label: string; value: T }[] | undefined;
  isDeletable?: boolean;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  labelTextPosition?: 'left' | 'center';
  className?: string;
  optionClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}

const SelectBox = <T,>({
  options = [],
  value,
  defaultValue,
  onValueChange,
  className,
  placeholder,
  disabled = false,
  optionClassName,
  labelTextPosition = 'left',
  onFocus,
  isDeletable = false,
  ref,
}: Props<T>) => {
  const v = value !== null && value !== undefined ? { value: `${value}` } : {};

  return (
    <div className='relative flex'>
      <Select
        defaultValue={`${defaultValue ?? ''}`}
        {...v}
        disabled={disabled}
        onOpenChange={(open: boolean) => (open ? onFocus?.() : undefined)}
        onValueChange={(v) =>
          onValueChange?.((typeof value === 'number' ? +v : v) as T)
        }>
        <SelectTrigger
          ref={ref}
          disabled={disabled}
          labelTextPosition={labelTextPosition}
          className={cn(
            `line-clamp-1 inline-flex h-10 w-full items-center justify-between gap-1 truncate border border-neutral-200 px-2 py-[7px] text-sm shadow-none ring-transparent focus:ring-transparent disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:opacity-100 data-[placeholder]:text-neutral-400`,
            className,
          )}>
          <SelectValue placeholder={placeholder || '선택'} />
        </SelectTrigger>
        {options.length > 0 && (
          <SelectContent
            className={cn(`border border-neutral-200`, optionClassName)}>
            {options.map((option) => (
              <SelectItem
                key={`${option.value}`}
                value={`${option.value}`}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>

      {!!value && isDeletable && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onValueChange?.('' as T);
          }}
          className='hover:bg-accent hover:text-accent-foreground text-muted-foreground absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer rounded-sm p-1'>
          <CircleXIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
};

export default React.memo(SelectBox) as <T>(props: Props<T>) => JSX.Element;
