import SubmitButton from '@/components/ui/button/submit-button';
import { Form } from '@/components/ui/form';
import LabelFormField from '@/components/ui/form/label-form-field';
import { SearchIcon } from 'lucide-react';
import useSearchProductForm from '../../_hooks/useSearchProductForm';

const ProductInputFilter = () => {
  const { form, onSubmit, formField, disabled } = useSearchProductForm();

  return (
    <Form {...form}>
      <form
        onSubmit={
          disabled ? (e) => e.preventDefault() : form.handleSubmit(onSubmit)
        }
        className='flex w-full items-end gap-2'
      >
        <LabelFormField form={form} {...formField} />
        <SubmitButton
          disabled={disabled}
          submitText='상품검색'
          submitIcon={<SearchIcon />}
        />
      </form>
    </Form>
  );
};

export default ProductInputFilter;
