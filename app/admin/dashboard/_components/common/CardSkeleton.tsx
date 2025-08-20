import { cn } from '@/lib/utils';
import { PieChart } from 'lucide-react';

export type CardSkeletonProps = {
  variant?: 'bar' | 'pie' | 'line';
  withHeader?: boolean; // 카드 상단 타이틀/액션 스켈레톤
  withLegend?: boolean; // 범례 칩 스켈레톤
  className?: string;
  /** 카드 내부 높이. 기본 18rem (h-72) */
  minHeightClassName?: string;
};

export function CardSkeleton({
  variant = 'bar',
  withHeader = true,
  withLegend = true,
  className,
  minHeightClassName = 'h-72',
}: CardSkeletonProps) {
  return (
    <div className={cn('h-full w-full')} aria-label='차트 로딩 중'>
      <div className='flex h-full flex-col'>
        {withHeader && (
          <div className='mb-3 flex items-center justify-between'>
            <div className='shimmer bg-muted h-5 w-40' />
            <div className='shimmer bg-muted h-8 w-24 rounded-full' />
          </div>
        )}

        {withLegend && (
          <div className='mb-3 flex flex-wrap gap-2'>
            <div className='shimmer bg-muted h-6 w-20 rounded-full' />
            <div className='shimmer bg-muted h-6 w-16 rounded-full' />
            <div className='shimmer bg-muted h-6 w-24 rounded-full' />
          </div>
        )}

        <div className='bg-muted/40 relative grid flex-1 place-items-center rounded-xl'>
          {variant === 'bar' && <BarChartSkeleton />}
          {variant === 'line' && <LineChartSkeleton />}
          {variant === 'pie' && <PieChartSkeleton />}
        </div>
      </div>

      {/* shimmer 효과 */}
      <style jsx>{`
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 1.6s infinite;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

function BarChartSkeleton() {
  return (
    <div className='w-full max-w-[520px] px-6 py-4'>
      <div className='mb-5 flex items-end gap-2'>
        {[50, 70, 40, 90, 65, 30, 80].map((h, i) => (
          <div key={i} className='relative flex-1'>
            <div className='shimmer bg-muted absolute bottom-0 h-full w-full rounded' />
            <div
              className='bg-foreground/10 absolute bottom-0 w-full rounded'
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className='bg-foreground/10 mx-auto h-3 w-10 rounded' />
    </div>
  );
}

function LineChartSkeleton() {
  return (
    <div className='w-full max-w-[560px] px-6 py-6'>
      <div className='relative h-40 w-full'>
        <div className='absolute inset-0 grid grid-cols-12 gap-2'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className='bg-muted h-full w-full rounded' />
          ))}
        </div>
        <svg viewBox='0 0 560 160' className='absolute inset-0 h-full w-full'>
          <polyline
            points='0,120 80,100 140,130 210,70 280,90 340,60 420,100 560,80'
            fill='none'
            stroke='currentColor'
            className='text-foreground/20'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <div className='mt-3 flex items-center justify-center gap-2'>
        <div className='bg-foreground/10 h-3 w-10 rounded' />
        <div className='bg-foreground/10 h-3 w-10 rounded' />
      </div>
    </div>
  );
}

function PieChartSkeleton() {
  return (
    <div className='flex w-full max-w-[420px] flex-col items-center px-6 py-6'>
      <div className='relative grid place-items-center'>
        <div className='shimmer bg-muted h-48 w-48 rounded-full' />
        <PieChart className='text-foreground/20 absolute h-10 w-10' />
      </div>
      <div className='mt-4 grid w-full grid-cols-2 gap-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='flex items-center gap-2'>
            <span className='bg-foreground/20 h-3 w-3 rounded-full' />
            <span className='bg-foreground/10 h-3 flex-1 rounded' />
          </div>
        ))}
      </div>
    </div>
  );
}
