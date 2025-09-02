'use client';

import { cn } from '@/lib/utils';

interface Props {
  text: string;
  className?: string;
  bgColor?: string | null;
}

const UnderlineLable = ({ text, className, bgColor }: Props) => {
  return (
    <div>
      <span className='relative inline-block'>
        <span
          className={cn(
            `relative z-10 whitespace-nowrap text-[clamp(1rem,1.8vw,1.125rem)] font-bold`,
            className,
          )}
        >
          {text}
        </span>
        <span
          className={`${bgColor ?? 'bg-[#D9E3FF]'} absolute bottom-0 left-0 right-0 z-0 h-[0.6em] rounded-sm`}
        />
      </span>
    </div>
  );
};

export default UnderlineLable;
