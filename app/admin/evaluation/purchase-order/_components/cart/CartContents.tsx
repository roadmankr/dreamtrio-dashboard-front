import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TProductCart } from '@/entities/product/model/type';
import { nf } from '@/lib/form';
import { cn } from '@/lib/utils';

import { Trash2 } from 'lucide-react';

interface Props {
  cartList: TProductCart[];
  onChangeQtyInCart: (barcode: string, value: string) => void;
  removeCart: (barcode: string) => void;
}

const CartContents = ({ cartList, onChangeQtyInCart, removeCart }: Props) => {
  return (
    <Table className='w-full text-sm'>
      <TableHeader>
        <TableRow className='font-bold hover:bg-transparent'>
          <TableHead className='min-w-2xs'>상품명</TableHead>
          <TableHead className='w-[9rem] min-w-[9rem]'>바코드</TableHead>
          <TableHead className='w-[6.5rem] min-w-[6.5rem] text-center'>
            수량
          </TableHead>
          <TableHead className='w-[10rem] min-w-[10rem] text-right'>
            가격
          </TableHead>
          <TableHead className='w-[6rem] min-w-[6rem] text-right'>
            비고
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cartList.map((r, idx) => (
          <TableRow
            key={r.barcode}
            className={cn(
              `text-slate-700`,
              idx % 2 ? 'bg-slate-50/60' : 'bg-white',
            )}
          >
            <TableCell>
              <div className='truncate font-medium'>{r.productName}</div>
            </TableCell>

            <TableCell>
              <code className='rounded-md bg-slate-100 px-2 py-1 text-[11px] tracking-wide'>
                {r.barcode}
              </code>
            </TableCell>

            <TableCell className='text-center'>
              <Input
                value={r.qty}
                onChange={(e) => onChangeQtyInCart(r.barcode, e.target.value)}
                className='h-8 w-full text-center'
              />
            </TableCell>

            <TableCell className='text-right tabular-nums'>
              {/* 가격 */}
              <div className='truncate font-medium'>
                {nf.format(r.price * r.qty)}
              </div>
            </TableCell>

            <TableCell className='text-right'>
              <Button
                size='icon'
                variant='destructive'
                className='h-8 w-8 cursor-pointer'
                onClick={() => removeCart(r.barcode)}
                aria-label='삭제'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartContents;
