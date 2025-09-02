import { ShoppingCart } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className='flex flex-col items-center gap-3 px-6 py-12 text-center'>
      <div className='flex h-12 w-12 items-center justify-center rounded-2xl border bg-slate-50'>
        <ShoppingCart className='h-5 w-5' />
      </div>
      <div className='text-base font-semibold'>아직 담은 상품이 없어요</div>
      <p className='max-w-[36ch] text-sm text-slate-600'>
        상단에서 매장을 선택하고 상품을 검색해 담아보세요. 담은 상품은 여기에서
        수량 조정과 엑셀 다운로드를 빠르게 할 수 있습니다.
      </p>
    </div>
  );
};

export default EmptyState;
