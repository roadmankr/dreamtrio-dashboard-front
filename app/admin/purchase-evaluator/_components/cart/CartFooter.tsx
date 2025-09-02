import { Button } from '@/components/ui/button';
import { nf } from '@/lib/form';
import { cn } from '@/lib/utils';
import { DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';
import { BarChart2, DollarSignIcon, Package2 } from 'lucide-react';

interface Props {
  totalCartLength: number;
  totalPrice: number;
  totalQty: number;
  onDownloadExcel: () => void;
  isPending?: boolean;
}

const Stat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) => {
  return (
    <div
      className={cn('flex flex-1 items-center gap-3 rounded-2xl border p-3')}
    >
      <div className='flex h-9 w-9 items-center justify-center rounded-xl border bg-slate-50'>
        <Icon className='h-4 w-4' />
      </div>
      <div>
        <div className='text-xs text-slate-500'>{label}</div>
        <div className='text-sm font-semibold whitespace-nowrap text-slate-900'>
          {value ?? '-'}
        </div>
      </div>
    </div>
  );
};

const CartFooter = ({
  totalCartLength,
  totalPrice,
  totalQty,
  onDownloadExcel,
  isPending = false,
}: Props) => {
  return (
    <div className='mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-row flex-wrap items-center gap-2'>
        <Stat
          icon={Package2}
          label='상품 수'
          value={`${nf.format(totalCartLength)}개`}
        />
        <Stat
          icon={BarChart2}
          label='총 수량'
          value={`${nf.format(totalQty)}개`}
        />
      </div>

      <div className='flex w-full flex-col justify-end gap-2 sm:w-auto md:flex-row md:items-center'>
        <Stat
          icon={DollarSignIcon}
          label='총 금액'
          value={`${nf.format(totalPrice)}원`}
        />
        <Button
          onClick={onDownloadExcel}
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none',
            isPending
              ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 focus:ring-slate-200'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus:ring-emerald-400',
          )}
        >
          {isPending ? (
            <ReloadIcon className='animate-spin' aria-hidden />
          ) : (
            <DownloadIcon aria-hidden />
          )}
          엑셀다운로드
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
