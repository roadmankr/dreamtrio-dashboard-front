'use client';

import { cn } from '@/lib/utils';

interface Props {
  text: string;
  className?: string;
}

const NoResult = ({ text, className }: Props) => {
  return (
    <div
      className={cn(
        `flex flex-1 items-center justify-center rounded-xl border border-dashed p-6 text-center text-sm text-slate-500`,
        className,
      )}
    >
      {text}
    </div>
  );
};

export default NoResult;
