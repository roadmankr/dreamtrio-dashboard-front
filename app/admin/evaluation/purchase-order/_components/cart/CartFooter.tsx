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
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border p-3 sm:w-auto',
      )}
      aria-label={label}
    >
      <div
        className='flex h-9 w-9 items-center justify-center rounded-xl border bg-slate-50'
        aria-hidden='true'
      >
        <Icon className='h-4 w-4' />
      </div>
      <div className='min-w-0'>
        <div className='text-xs text-slate-500'>{label}</div>
        <div
          className='text-sm font-semibold whitespace-nowrap text-slate-900'
          aria-live='polite'
        >
          {value ? (
            <>
              <span>{value.replace(/[^\d,.-]/g, '')}</span>
              <span className='ml-0.5'>{value.replace(/^[\d,.-\s]*/, '')}</span>
            </>
          ) : (
            '-'
          )}
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
  const priceText = `${nf.format(totalPrice)}원`;
  const qtyText = `${nf.format(totalQty)}개`;
  const cartText = `${nf.format(totalCartLength)}개`;

  return (
    <div
      className='mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'
      aria-busy={isPending ? 'true' : 'false'}
    >
      <div className='flex w-full flex-col flex-wrap items-start gap-2 sm:flex-row'>
        <Stat icon={Package2} label='총 상품' value={cartText} />
        <Stat icon={BarChart2} label='총 수량' value={qtyText} />
        <Stat icon={DollarSignIcon} label='총 금액' value={priceText} />
      </div>

      <div className='flex w-full flex-col justify-end gap-2 sm:w-auto md:flex-row md:items-center'>
        <Button
          onClick={onDownloadExcel}
          disabled={isPending}
          aria-disabled={isPending ? 'true' : 'false'}
          aria-busy={isPending ? 'true' : 'false'}
          aria-label={isPending ? '엑셀 다운로드 중' : '엑셀 다운로드'}
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none',
            isPending
              ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 focus:ring-slate-200'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus:ring-emerald-400',
          )}
        >
          {isPending ? (
            <span
              role='status'
              aria-live='polite'
              className='inline-flex items-center gap-2'
            >
              <ReloadIcon className='animate-spin' aria-hidden='true' />
              <span className='sr-only'>다운로드 중…</span>
            </span>
          ) : (
            <DownloadIcon aria-hidden='true' />
          )}
          <span aria-hidden='true'>엑셀다운로드</span>
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
