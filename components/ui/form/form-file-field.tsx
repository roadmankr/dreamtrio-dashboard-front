import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file/file-upload';
import { FormInputFileType } from '@/shared/types/form';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

const FormFileField = <T extends FieldValues>({
  accept,
  field,
  isValid,
}: FormInputFileType & {
  isValid: boolean;
  field: ControllerRenderProps<T, Path<T>>;
}) => {
  return (
    <FileUpload accept={accept} onChange={(file) => field.onChange(file)}>
      <div className='flex flex-col items-start gap-2 md:flex-row md:items-center'>
        <Button
          type='button'
          variant={'outline'}
          className='h-10'
          aria-invalid={isValid}
          aria-label='파일 업로드'
        >
          파일 선택
        </Button>
        <span className='text-[clamp(0.8rem,1vw,0.875rem)]'>
          {`${field?.value?.name || '선택된 파일 없음'}`}
        </span>
      </div>
    </FileUpload>
  );
};

export default FormFileField;
