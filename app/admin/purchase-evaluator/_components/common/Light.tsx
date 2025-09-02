import { cn } from '@/lib/utils';

const Light = ({
  bg,
  text,
  border,
}: {
  border: string;
  bg: string;
  text: string;
}) => {
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

export default Light;
