import { JSX } from 'react';
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';

export type SelectOption = { label: string; value: any; disabled?: boolean };
export type TFormBaseChange<T extends FieldValues> = {
  value: unknown;
  form: UseFormReturn<T>;
};
export type TFormValue =
  | ''
  | undefined
  | 'number'
  | 'date'
  | 'phone'
  | 'currency'
  | 'percent'
  | 'regNum'
  | 'decimal';

export type FormFieldType =
  | 'text'
  | 'textArea'
  | 'select'
  | 'password'
  | 'component'
  | 'date'
  | 'hidden'
  | 'dateTime'
  | 'label';

export type FormHiddenType = {
  type: 'hidden';
};

export type FormDateType = {
  type: 'date' | 'dateTime' | 'dateRange';
  className?: string;
  minDate?: string;
  maxDate?: string | number;
  placeholder?: string;
  clearable?: boolean;
  value?: Date;
};

export type FormDateRangeType = {
  type: 'dateRange';
  className?: string;
  placeholder?: string;
  clearable?: boolean;
  value?: { from: Date; to: Date };
};

export type FormLabelType = {
  type: 'label';
  className?: string;
};

export type ComponentForm<T extends FieldValues, TExtra = {}> = {
  type: 'component';
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  component: (params: {
    field: ControllerRenderProps<T, Path<T>>;
    form: UseFormReturn<T>;
    props?: TExtra;
  }) => JSX.Element;
};

export type FormInputType<T extends FieldValues = FieldValues> = {
  type: 'text' | 'password' | 'textArea';
  className?: string;

  valueType?: '' | undefined | 'number' | 'date' | 'phone';
  placeholder?: string;
  maxLength?: number;
  parse?: (v: string) => void;
  onChange?: ({ value, form }: TFormBaseChange<T>) => any;
};

export type FormInputFileType = {
  type: 'file';
  className?: string;
  accept?: string | undefined;
  placeholder?: string;
  // onChange?: ({ value, form }: { value: any; form: UseFormReturn<T> }) => any;
  onChange?: (v: string) => void;
  // onChange?: ({ value, form }: { value: string; form: UseFormReturn }) => void;
};

export type FormSelectType<T extends FieldValues = FieldValues, TExtra = {}> = {
  type: 'select';
  isSearchMode?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  options?: { label: string; value: any }[];
  placeholder?: string;
  useSearchMode?: boolean;
  onChange?: (props?: TFormBaseChange<T>) => void;
  // onChange?: (v: string) => void;
};

export type CommonFormPart<T extends FieldValues, TExtra = {}> = {
  name: FieldPath<T>;
  autoFocus?: boolean;
  extra?: TExtra;
  label?: string;
  disabled?: boolean;
  labelFlexPosition?: 'row' | 'col';
  className?: string;
  fieldClassName?: string;
  required?: boolean;
  labelDescription?: string;
  subComponent?: JSX.Element;
};

export type FormDataType<T extends FieldValues = FieldValues, TExtra = {}> = (
  | FormSelectType<T, TExtra>
  | FormInputType<T>
  | ComponentForm<T, TExtra>
  | FormLabelType
  | FormInputFileType
  | FormDateType
  | FormHiddenType
) &
  CommonFormPart<T, TExtra>;

export type FormProps<T extends FieldValues, TExtra = {}> = FormDataType<
  T,
  TExtra
> & {
  form: UseFormReturn<T>;
  autoFocus?: boolean;
  extra?: TExtra;
  toastOnError?: boolean;
};

export type TFormFieldBaseProps<T extends FieldValues> = {
  isValid: boolean;
  field: ControllerRenderProps<T, Path<T>>;
  form: UseFormReturn<T>;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
};
