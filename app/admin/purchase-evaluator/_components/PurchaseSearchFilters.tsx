'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCartIcon } from 'lucide-react';
import { SearchStatus } from '../_constants';
import useProductSearchResult from '../_model/useProductSearchResult';
import usePurchaseSearchStepper from '../_model/usePurchaseSearchStepper';
import ProductInputFilter from './filter/ProductInputFilter';
import StoreSelectFilter from './filter/StoreSelectFilter';

const PurchaseSearchFilters = () => {
  const { status } = usePurchaseSearchStepper();
  const { addToCart } = useProductSearchResult();

  return (
    <div className='flex w-full flex-col gap-2 md:w-2/3 md:flex-row'>
      <div className='flex-[0.5]'>
        <StoreSelectFilter />
      </div>

      <div className='flex flex-1 flex-col items-end justify-end gap-2 md:flex-row'>
        <ProductInputFilter />

        <Button
          disabled={status !== SearchStatus.SUCCESS}
          onClick={status === SearchStatus.SUCCESS ? addToCart : undefined}
          aria-disabled={status !== SearchStatus.SUCCESS}
          aria-label='검색된 상품을 장바구니에 담기'
          className={cn(
            `h-10`,
            status === SearchStatus.SUCCESS
              ? 'cursor-pointer bg-emerald-500 hover:bg-emerald-600'
              : 'disabled:pointer-events-none disabled:opacity-50',
          )}
        >
          <ShoppingCartIcon aria-hidden /> 담기
        </Button>
      </div>
    </div>
  );
};

export default PurchaseSearchFilters;
