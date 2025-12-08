import CardWrapper from '@/components/ui/card/card-wrapper';
import UnderlineLable from '@/components/ui/label/underline-label';
import { cn } from '@/lib/utils';
import React from 'react';

const InfoSectionWrapper = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <CardWrapper
      className='h-full w-full'
      containerClassName={cn('min-h-[404px]', className)}
    >
      <UnderlineLable className='text-lg font-semibold' text={title} />
      {children}
    </CardWrapper>
  );
};

export default InfoSectionWrapper;
