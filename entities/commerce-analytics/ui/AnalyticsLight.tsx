import { cn } from '@/lib/utils';
import { TAnalytisSignal } from '../model/type';

const AnalyticsLight = ({
  bg,
  border,
  text,
}: Pick<TAnalytisSignal, 'colorInfo'>['colorInfo']) => {
  return (
    <span
      className={cn(
        `inline-block h-7 w-7 rounded-full border border-slate-200 bg-slate-500`,
        bg,
        border,
        text,
      )}
    />
  );
};

export default AnalyticsLight;
