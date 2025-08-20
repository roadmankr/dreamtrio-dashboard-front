import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export type EmptyStateProps = {
  title: string;
  desc?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode; // 버튼 등 액션 요소
  size?: 'sm' | 'md' | 'lg';
  tone?: 'neutral' | 'error'; // error 톤 시 아이콘/텍스트 컬러 살짝 강조
  className?: string;
  /** 카드 내부 높이. 기본 18rem (h-72) */
  minHeightClassName?: string; // 예: "h-72" | "h-80"
};

export function EmptyState({
  title,
  desc,
  icon,
  action,
  size = 'md',
  tone = 'neutral',
  className,
  minHeightClassName = 'h-72',
}: EmptyStateProps) {
  const sizeMap = {
    sm: {
      icon: 'h-8 w-8',
      title: 'text-base',
      desc: 'text-sm',
      gap: 'gap-2',
    },
    md: {
      icon: 'h-10 w-10',
      title: 'text-lg',
      desc: 'text-sm',
      gap: 'gap-3',
    },
    lg: {
      icon: 'h-12 w-12',
      title: 'text-xl',
      desc: 'text-base',
      gap: 'gap-4',
    },
  } as const;

  const palette =
    tone === 'error'
      ? { icon: 'text-red-500', title: 'text-red-700 dark:text-red-400' }
      : { icon: 'text-muted-foreground', title: 'text-foreground' };

  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center text-center',
        sizeMap[size].gap,
      )}
    >
      <div
        className={cn(
          'bg-muted flex items-center justify-center rounded-full p-3',
          palette.icon,
        )}
      >
        {icon ?? <Search className={cn(sizeMap[size].icon)} />}
      </div>
      <h3 className={cn('font-medium', sizeMap[size].title, palette.title)}>
        {title}
      </h3>
      {desc ? (
        <p className={cn('text-muted-foreground', sizeMap[size].desc)}>
          {desc}
        </p>
      ) : null}
      {action ? <div className='pt-1'>{action}</div> : null}
    </div>
  );
}
