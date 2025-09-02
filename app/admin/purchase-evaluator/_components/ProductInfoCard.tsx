'use client';

import { nf } from '@/lib/form';
import { NOT_PRODUCT_LIST_TEXT, SearchStatus } from '../_constants';
import useProductInfo from '../_model/useProductInfo';
import DataSection from './common/DataSection.component';
import InfoSectionWrapper from './common/InfoSectionWrapper';
import Loading from './common/Loading';
import NoResult from './common/NoResult';

const ProductInfoCard = () => {
  const {
    status,
    saleRateColor,
    stockRateColor,
    optimalStockColor,
    searchProduct,
    salePriceColor,
  } = useProductInfo();

  return (
    <InfoSectionWrapper title='상품 정보'>
      <div
        className='flex h-full w-full flex-col'
        aria-busy={status === SearchStatus.PENDING}
      >
        {status === SearchStatus.IDLE && (
          <NoResult text={NOT_PRODUCT_LIST_TEXT} />
        )}

        {status === SearchStatus.FAIL && (
          <NoResult text={'상품 검색결과가 없습니다'} />
        )}

        {status === SearchStatus.PENDING && <Loading text='상품 검색중...' />}

        {status === SearchStatus.SUCCESS && searchProduct && (
          <div className='flex flex-col gap-4'>
            <div className='flex w-full gap-4'>
              <div className='max-w-full min-w-0 flex-1'>
                <DataSection
                  title='상품명'
                  text={searchProduct.productName}
                  textDirection='row'
                  scrollable
                />
              </div>

              <div className='min-w-0 flex-[0.3]'>
                <DataSection
                  title='단가'
                  text={`${nf.format(searchProduct.price)}원`}
                  textDirection='row'
                  scrollable
                />
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-4'>
              <DataSection
                title='연령'
                text={searchProduct.typeAge}
                textDirection='row'
              />
              <DataSection
                title='성별'
                text={searchProduct.typeGender}
                textDirection='row'
              />

              <DataSection
                title='브랜드'
                text={searchProduct.typeBrand}
                textDirection='row'
              />

              <DataSection
                title='신상품'
                text={searchProduct.new ? '신상품' : '해당없음'}
                textDirection='row'
              />
            </div>

            <div className='grid gap-4 sm:grid-cols-4'>
              <DataSection title='보유/적정 재고' {...optimalStockColor} />
              <DataSection title='재고회전율' {...stockRateColor} />
              <DataSection title='판매율' {...saleRateColor} />
              <DataSection title='온라인/매장 판매가' {...salePriceColor} />
            </div>
          </div>
        )}
      </div>
    </InfoSectionWrapper>
  );
};

export default ProductInfoCard;
