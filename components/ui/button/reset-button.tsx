'use client';

import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import { RotateCcw } from 'lucide-react';
import React, { JSX } from 'react';
import { Button } from '../button';

interface Props extends React.ComponentProps<'button'> {
  className?: string;
  submitText?: string;
  submitIcon?: JSX.Element;
  isPending?: boolean;
}

const ResetButton = ({
  className,
  submitText = '초기화',
  submitIcon,
  isPending,
  ...props
}: Props) => {
  return (
    <Button
      disabled={isPending}
      type='button'
      variant='outline'
      onClick={props.onClick}
      className={cn(
        'group flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900',
        className,
      )}
    >
      {isPending ? (
        <ReloadIcon className='mr-1.5 h-4 w-4 animate-spin' />
      ) : (
        (submitIcon ?? (
          <RotateCcw className='mr-1.5 h-4 w-4 text-blue-600 transition-transform group-hover:-rotate-90' />
        ))
      )}
      {submitText ?? `초기화`}
    </Button>
  );
};

export default ResetButton;
