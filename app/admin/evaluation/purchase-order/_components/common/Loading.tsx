'use client';

import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';

interface Props {
  text: string;
  className?: string;
}

const Loading = ({ text, className }: Props) => {
  return (
    <div
      role='status'
      aria-live='polite'
      className={cn(
        `flex h-full w-full flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center text-sm text-slate-500`,
        className,
      )}
    >
      <ReloadIcon className='animate-spin' aria-hidden />
      {text}
    </div>
  );
};

export default Loading;
