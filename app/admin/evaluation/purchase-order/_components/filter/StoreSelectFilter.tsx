import { Form } from '@/components/ui/form';
import LabelFormField from '@/components/ui/form/label-form-field';
import useSearchStoreForm from '../../_hooks/useSearchStoreForm';
import ResetStoreAlertModal from './ResetStoreAlertModal';

const StoreSelectFilter = () => {
  const {
    form,
    storeFormField,
    onSubmit,
    isOpen,
    onCancel,
    handleOpenChange,
    onConfirmChange,
  } = useSearchStoreForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        {isOpen && (
          <ResetStoreAlertModal
            onCancel={onCancel}
            onOpenChange={handleOpenChange}
            open={isOpen}
            onSubmit={onConfirmChange}
          />
        )}
        <LabelFormField form={form} {...storeFormField} />
      </form>
    </Form>
  );
};

export default StoreSelectFilter;
