'use client';

import ResetButton from '@/components/ui/button/reset-button';
import SubmitButton from '@/components/ui/button/submit-button';
import CardWrapper from '@/components/ui/card/card-wrapper';
import { Form } from '@/components/ui/form';
import LabelFormField from '@/components/ui/form/label-form-field';
import { SearchIcon } from 'lucide-react';
import useStoreDateFilterForm from '../model/useStoreDateFilterForm';

const StoreDateFilter = () => {
  const { form, onSubmit, formFields, disabled, resetParams } =
    useStoreDateFilterForm();

  return (
    <CardWrapper className='flex max-w-3xl'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col items-end gap-3 md:flex-row'
        >
          {formFields.map((fields) => (
            <LabelFormField
              form={form}
              key={fields.name}
              {...fields}
              className='flex-1'
            />
          ))}

          <div className='flex flex-row gap-2'>
            <ResetButton onClick={resetParams} />
            <SubmitButton
              disabled={disabled}
              submitText='검색'
              submitIcon={<SearchIcon />}
            />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default StoreDateFilter;
