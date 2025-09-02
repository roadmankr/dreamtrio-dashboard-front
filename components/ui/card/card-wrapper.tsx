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
    <Card className={cn('flex h-full w-full', containerClassName)}>
      <CardContent
        className={cn('relative flex flex-1 flex-col gap-3', className)}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default CardWrapper;
