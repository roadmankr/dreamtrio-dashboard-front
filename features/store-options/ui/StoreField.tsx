import LabelFormField from '@/components/ui/form/label-form-field';
import {
  CommonFormPart,
  FormDataType,
  FormSelectType,
} from '@/shared/types/form';
import { useMemo } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { baseStoreOptionField } from '../config';
import useStoreOptions from '../model/useStoreOptions';

type Props<T extends FieldValues, TExtra = {}> = Partial<
  Omit<FormSelectType<T, TExtra>, 'options' | 'type'>
> &
  CommonFormPart<T, TExtra> & {
    isNeedTotalOption?: boolean;
  };

const StoreField = <T extends FieldValues, TExtra = {}>({
  isNeedTotalOption = false,
  ...props
}: Props<T, TExtra>) => {
  const { storeOptions } = useStoreOptions({ isNeedTotalOption });
  const form = useFormContext<T>();
  const field = useMemo(
    () =>
      ({
        ...baseStoreOptionField,
        ...props,
        options: storeOptions,
        type: 'select',
      }) satisfies FormDataType<T, TExtra>,
    [props, storeOptions],
  );

  return <LabelFormField {...field} form={form} />;
};

export default StoreField;
