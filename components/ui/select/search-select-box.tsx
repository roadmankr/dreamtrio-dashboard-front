'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/shared/types/form';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  value: string | number;
  options: SelectOption[] | undefined;
  onValueChange: (v: any) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  isSearchMode?: boolean;
  labelTextPosition?: 'center' | 'left';
  onFocus?: () => void;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export default function SearchSelectBox({
  value,
  label,
  className,
  labelTextPosition = 'left',
  options = [],
  onValueChange,
  placeholder,
  isSearchMode = true,
  onFocus,
  disabled = false,
  ref,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onChangeSelect = (value: any) => {
    onValueChange(value);
    setOpen(false);
  };

  useEffect(() => {
    if (open) onFocus?.();
  }, [open, onFocus]);

  return (
    <div className='w-full space-y-2'>
      {label && <Label htmlFor='select-41'>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id='select-41'
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn(
              `hover:bg-background focus-visible:border-ring focus-visible:outline-ring/20 h-10 w-full justify-between bg-transparent px-3 font-normal outline-offset-0 focus-visible:outline-[3px]`,
              className,
            )}
            disabled={disabled}
          >
            <span
              className={cn(
                `w-full truncate ${labelTextPosition === 'left' ? 'text-left' : 'text-center'}`,
                !value && 'text-muted-foreground',
              )}
            >
              {value
                ? options?.find((framework) => framework.value === value)?.label
                : placeholder || '선택'}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className='text-muted-foreground/80 shrink-0'
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0'
          align='start'
        >
          <Command>
            {isSearchMode && (
              <CommandInput placeholder={placeholder || '선택'} />
            )}

            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {options?.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    disabled={framework.disabled}
                    onSelect={() => onChangeSelect(framework.value)}
                  >
                    {framework.label}
                    {value === framework.value && (
                      <Check size={16} strokeWidth={2} className='ml-auto' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
