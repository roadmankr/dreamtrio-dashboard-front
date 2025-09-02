'use client';

import { SearchStatus } from '../_constants';
import useStoreInfo from '../_model/useStoreInfo';
import DataSection from './common/DataSection.component';
import InfoSectionWrapper from './common/InfoSectionWrapper';
import Loading from './common/Loading';
import NoResult from './common/NoResult';

const StoreInfoCard = () => {
  const {
    status,
    typeAgeColor,
    typeGenderColor,
    typeBrandColor,
    storeName,
    optimalColor,
  } = useStoreInfo();

  return (
    <InfoSectionWrapper title='매장 정보'>
      <div
        className='flex h-full w-full flex-col'
        aria-busy={status === SearchStatus.PENDING}
      >
        {status === SearchStatus.IDLE && (
          <NoResult text='매장을 선택해주세요.' />
        )}

        {status === SearchStatus.PENDING && <Loading text='매장 검색중...' />}

        {status === SearchStatus.SUCCESS && (
          <>
            <div className='flex flex-col gap-4'>
              <DataSection title='매장명' data={storeName} />
              <div className='grid gap-3 sm:grid-cols-4'>
                <DataSection title='연령 분포' {...typeAgeColor} />
                <DataSection title='성별 분포' {...typeGenderColor} />
                <DataSection title='브랜드 판매율' {...typeBrandColor} />
                <DataSection title='가용/적정 재고' {...optimalColor} />
              </div>
            </div>
          </>
        )}
      </div>
    </InfoSectionWrapper>
  );
};

export default StoreInfoCard;
