import {
  Card,
  CardBody,
  CardHeader,
} from '@/app/admin/analytics/purchase/_components/card-layout';

const SalesOverview = () => {
  return (
    <div className='flex flex-col gap-3'>
      <Card>
        <CardHeader title='매출정보' />
        <CardBody>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3'>
            {[
              { label: '총 구매금액', value: '30,000,000원' },
              { label: '매입대비 판매율', value: '20%' },
              { label: '타매장 매입대비 판매율', value: '20%' },
              { label: '타매장 매입대비 매출이익', value: '20%' },
              { label: '매출이익', value: '6,000,000원' },
              { label: '잔여재고', value: '20,000,000원' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className='rounded-xl border border-zinc-200/60 bg-gradient-to-b from-white to-zinc-50/40 p-4'
              >
                <p className='text-xs text-zinc-500'>{kpi.label}</p>
                <p className='mt-1 text-lg font-semibold tracking-tight text-zinc-900'>
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SalesOverview;
