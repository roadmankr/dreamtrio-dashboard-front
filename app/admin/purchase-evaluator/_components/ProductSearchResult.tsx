'use client';

const ProductSearchResult = () => {
  // const {
  //   searchProductList,
  //   addCart,
  //   isNoResult,
  //   searchWord,
  //   resetSearchProductList,
  // } = useProductSearchResult();

  return (
    <></>
    // <InfoSectionWrapper title='검색 결과'>
    //   <div>
    //     <div className='mb-3 flex items-center justify-between'>
    //       <div className='text-sm font-semibold text-slate-800'>
    //         마지막 검색
    //       </div>
    //       <div className='rounded-full border px-2 py-0.5 text-xs text-slate-600'>
    //         {`검색명 : ${searchWord || '-'}`}
    //       </div>
    //     </div>
    //     {isNoResult && (
    //       <div className='space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center'>
    //         <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm'>
    //           <svg
    //             xmlns='http://www.w3.org/2000/svg'
    //             viewBox='0 0 24 24'
    //             fill='none'
    //             stroke='currentColor'
    //             className='h-6 w-6 text-slate-600'
    //           >
    //             <path
    //               strokeLinecap='round'
    //               strokeLinejoin='round'
    //               strokeWidth='1.5'
    //               d='M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z'
    //             />
    //           </svg>
    //         </div>
    //         <div className='flex items-center justify-center gap-1 text-sm font-medium text-slate-400'>
    //           <span className='text-base font-semibold text-slate-800'>
    //             {searchWord}
    //           </span>
    //           검색 결과가 없습니다
    //         </div>
    //       </div>
    //     )}

    //     <hr className='my-6 border-slate-100' />
    //     <div className='flex w-full flex-col'>
    //       <div className='mb-3 flex items-center justify-between'>
    //         <div className='text-sm font-semibold text-slate-800'>
    //           최근 검색 성공 결과
    //         </div>
    //         {searchProductList.length > 0 && (
    //           <Button
    //             variant={'outline'}
    //             onClick={resetSearchProductList}
    //             className='cursor-pointer text-xs text-slate-500'
    //           >
    //             <TrashIcon /> 비우기
    //           </Button>
    //         )}
    //       </div>
    //       {searchProductList.length === 0 ? (
    //         <NoResult text='최근 성공 결과가 없습니다.' />
    //       ) : (
    //         <div className='divide-y divide-slate-100'>
    //           {searchProductList.map((p) => (
    //             <div
    //               key={p.barcode}
    //               className='flex items-center justify-between py-3'
    //             >

    //               <Button
    //                 variant={'ghost'}
    //                 onClick={() => addCart(p)}
    //                 className='cursor-pointer rounded-xl border px-3 py-1.5 text-xs hover:bg-slate-50'
    //               >
    //                 담기
    //               </Button>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </InfoSectionWrapper>
  );
};

export default ProductSearchResult;
