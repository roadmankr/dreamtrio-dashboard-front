import CardWrapper from '@/components/ui/card/card-wrapper';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

const PurchaseAnalyticsFilterSkeleton = () => {
  return (
    <CardWrapper containerClassName='h-auto'>
      <div className='flex w-full max-w-xl flex-col gap-3 md:flex-row'>
        {/* StoreField 스켈레톤 */}
        <Field
          className={cn(
            'flex w-full max-w-full flex-1 flex-col',
            'flex flex-col gap-2',
          )}
        >
          <div
            className={cn(
              'text-fluid flex min-w-[calc(4rem,15vw,5rem)] shrink-0 items-center justify-start gap-1',
            )}
          >
            <FieldLabel className='flex items-center bg-transparent text-sm font-semibold text-neutral-900'>
              <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>{' '}
              {/* Label 텍스트 */}
            </FieldLabel>
          </div>
          <FieldContent>
            <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>{' '}
            {/* Select 필드 */}
          </FieldContent>
        </Field>

        {/* Date Range Field 스켈레톤 */}
        <Field
          className={cn(
            'flex w-full max-w-full flex-1 flex-col',
            'flex flex-col gap-2',
          )}
        >
          <div
            className={cn(
              'text-fluid flex min-w-[calc(4rem,15vw,5rem)] shrink-0 items-center justify-start gap-1',
            )}
          >
            <FieldLabel className='flex items-center bg-transparent text-sm font-semibold text-neutral-900'>
              <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>{' '}
              {/* Label 텍스트 */}
            </FieldLabel>
          </div>
          <FieldContent>
            <div className='h-10 w-full animate-pulse rounded-md bg-gray-200'></div>{' '}
            {/* DatePickerWithRange 필드 */}
          </FieldContent>
        </Field>

        {/* 검색 버튼 스켈레톤 */}
        {/* <div className='flex items-end'>
          <div className='h-10 w-24 animate-pulse rounded-md bg-blue-500'></div>
        </div> */}
      </div>
    </CardWrapper>
  );
};

export default PurchaseAnalyticsFilterSkeleton;
