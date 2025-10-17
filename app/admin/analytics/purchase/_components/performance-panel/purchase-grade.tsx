import {
  Card,
  CardBody,
  CardHeader,
} from '@/app/admin/analytics/purchase/_components/card-layout';

const PurchaseGradeCard = () => {
  return (
    <Card>
      <CardHeader title='등급 및 한줄평' />
      <CardBody>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3'></div>
      </CardBody>
    </Card>
  );
};

export default PurchaseGradeCard;
