import LabelFormField from '@/components/ui/form/label-form-field';
import {
  CommonFormPart,
  FormDataType,
  FormSelectType,
} from '@/shared/types/form';
import { useMemo } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { basePeriodOptionField } from '../config';
import { getMonthOptions } from '../model/lib';

type Props<T extends FieldValues, TExtra extends object = {}> = Partial<
  Omit<FormSelectType<T, TExtra>, 'options' | 'type'>
> &
  CommonFormPart<T, TExtra> & {
    isNeedTotalOption?: boolean;
    toastOnError?: boolean;
  };

const PeriodField = <T extends FieldValues, TExtra extends object = {}>({
  isNeedTotalOption = false,
  toastOnError = false,
  ...props
}: Props<T, TExtra>) => {
  const form = useFormContext<T>();
  const field = useMemo(
    () =>
      ({
        ...basePeriodOptionField,
        ...props,
        options: getMonthOptions(),
        type: 'select',
      }) satisfies FormDataType<T, TExtra>,
    [props],
  );

  return <LabelFormField {...field} form={form} toastOnError={toastOnError} />;
};

export default PeriodField;
