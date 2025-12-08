import { cn } from '@/lib/utils';

// 작은 유틸 컴포넌트 (원하면 각 파일 안에서 선언해도 됩니다)
export function PanelCard({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-200/70 bg-white/60 ' +
          'shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]' +
          'backdrop-blur-sm transition-shadow',
        className,
      )}
      {...props}
    />
  );
}
export function PanelCardHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className='px-4 pt-4 pb-2'>
      <h3 className='text-sm font-semibold text-zinc-800'>{title}</h3>
      {subtitle && <p className='mt-0.5 text-xs text-zinc-500'>{subtitle}</p>}
    </div>
  );
}
export function PanelCardBody({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('min-h-0 px-4 pb-5', className)} {...props} />;
}

export function PanelCardItem({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex-1 rounded-xl border border-zinc-200/60 bg-gradient-to-b from-white to-zinc-50/40 p-4',
        className,
      )}
      {...props}
    />
  );
}

export function PanelCardHelper({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-0.5 text-[11px] text-zinc-500', className)}
      {...props}
    />
  );
}

export function PanelWrapper({
  className = '',
  title = '',
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <PanelCard>
      <PanelCardHeader title={title} />
      <PanelCardBody className={cn(``, className)}>{children}</PanelCardBody>
    </PanelCard>
  );
}
