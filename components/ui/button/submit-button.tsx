'use client';

import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import React, { JSX } from 'react';
import { Button } from '../button';

interface Props extends React.ComponentProps<'button'> {
  className?: string;
  submitText?: string;
  submitIcon?: JSX.Element;
  isPending?: boolean;
}

const SubmitButton = ({
  className,
  submitText = '확인',
  submitIcon,
  isPending,
  ...props
}: Props) => {
  return (
    <Button
      disabled={isPending || props.disabled}
      {...props}
      type='submit'
      className={cn(`group h-10 cursor-pointer`, className)}
    >
      {isPending ? <ReloadIcon className='animate-spin' /> : submitIcon}
      {submitText}
    </Button>
  );
};

export default SubmitButton;
