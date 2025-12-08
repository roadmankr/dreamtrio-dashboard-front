'use client';

import { ViewState } from '@/shared/model/status';
import useProductCart from '../_hooks/useProductCart';
import CartContents from './cart/CartContents';
import CartFooter from './cart/CartFooter';
import EmptyState from './cart/EmptyState';
import InfoSectionWrapper from './common/InfoSectionWrapper';

const ProductCart = () => {
  const {
    cartList,
    removeCart,
    onChangeQtyInCart,
    isPending,
    downloadExcel,
    status,
    totalQty,
    totalPrice,
  } = useProductCart();

  return (
    <InfoSectionWrapper title='담은 상품' className='h-auto min-h-0 w-full'>
      <div
        aria-busy={status === ViewState.PENDING}
        className='flex flex-1 flex-col'
      >
        <div className='grid h-full place-items-center overflow-hidden rounded-2xl border'>
          {status === ViewState.ERROR && <EmptyState />}

          {status === ViewState.SUCCESS && (
            <div className='relative grid w-full'>
              <div className='[grid-area:1/1] sm:h-auto' aria-hidden />
              <div className='w-full overflow-x-auto overflow-y-hidden p-2 [grid-area:1/1] sm:p-3'>
                {/* <div className='w-full overflow-x-auto overflow-y-hidden p-2 [-webkit-overflow-scrolling:touch] [grid-area:1/1] [scrollbar-gutter:stable_both-edges] sm:p-3'> */}
                <CartContents
                  cartList={cartList}
                  onChangeQtyInCart={onChangeQtyInCart}
                  removeCart={removeCart}
                />
              </div>
            </div>
          )}
        </div>

        {status === ViewState.SUCCESS && (
          <CartFooter
            totalPrice={totalPrice}
            totalCartLength={cartList.length}
            totalQty={totalQty}
            onDownloadExcel={downloadExcel}
            isPending={isPending}
          />
        )}
      </div>
    </InfoSectionWrapper>
  );
};

export default ProductCart;
