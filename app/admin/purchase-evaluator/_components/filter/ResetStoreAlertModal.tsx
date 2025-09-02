'use client';

import Modal from '@/components/ui/modal/modal';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ResetStoreAlertModal = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <Modal
      onCancel={onCancel}
      onSubmit={onSubmit}
      open={open}
      hideCancel={false}
      onOpenChange={onOpenChange}
      title='매장변경'
      description='매장이 변경되면 기존 값들은 초기화 됩니다.'
    />
  );
};

export default ResetStoreAlertModal;
