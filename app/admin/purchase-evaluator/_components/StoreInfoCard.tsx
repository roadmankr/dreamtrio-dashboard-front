'use client';

import { ViewState } from '@/shared/model/status';
import useStoreInfo from '../_hooks/useStoreInfo';
import DataSection from './common/DataSection.component';
import InfoSectionWrapper from './common/InfoSectionWrapper';
import Loading from './common/Loading';
import NoResult from './common/NoResult';

const StoreInfoCard = () => {
  const {
    status,
    typeAgeSignal,
    typeGenderSignal,
    typeBrandSignal,
    optimalSignal,
    storeName,
    ageActionType,
    brandActionType,
    genderActionType,
  } = useStoreInfo();

  return (
    <InfoSectionWrapper title='매장 정보'>
      <div
        className='flex h-full w-full flex-col'
        aria-busy={status === ViewState.PENDING}
        aria-live='polite'
      >
        {status === ViewState.IDLE && <NoResult text='매장을 선택해주세요.' />}

        {status === ViewState.PENDING && <Loading text='매장 검색중...' />}

        {status === ViewState.SUCCESS && (
          <>
            <div className='flex flex-col gap-4'>
              <DataSection title='매장명' data={storeName} />
              <div className='grid gap-3 sm:grid-cols-4'>
                <DataSection
                  title='연령 분포'
                  {...typeAgeSignal}
                  actionType={ageActionType}
                />
                <DataSection
                  title='성별 분포'
                  {...typeGenderSignal}
                  actionType={genderActionType}
                />
                <DataSection
                  title='브랜드 판매율'
                  {...typeBrandSignal}
                  actionType={brandActionType}
                />
                <DataSection title='가용/적정 재고' {...optimalSignal} />
              </div>
            </div>
          </>
        )}
      </div>
    </InfoSectionWrapper>
  );
};

export default StoreInfoCard;
