'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Card, CardContent } from '../card';

interface Props {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

const CardWrapper = ({ children, className, containerClassName }: Props) => {
  return (
    <Card className={cn('flex h-full w-full min-w-0', containerClassName)}>
      <CardContent
        className={cn('relative flex min-w-0 flex-1 flex-col gap-3', className)}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default CardWrapper;
