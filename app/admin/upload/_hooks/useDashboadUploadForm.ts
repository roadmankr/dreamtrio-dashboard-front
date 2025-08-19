import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { dashboardUploadSchema, TDashboardUpload } from '../_schema';
import { validateDashboardUpload } from '../_server/service';

const useDashboadUploadForm = () => {
  const form = useForm<TDashboardUpload>({
    resolver: zodResolver(dashboardUploadSchema),
    defaultValues: {
      file: null,
      password:'',
    }
  })

  const onSubmit = async (data: TDashboardUpload) => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('password', data.password);
    const result = await validateDashboardUpload(formData);

    console.log(result);
  }

  return {form, onSubmit};
}

export default useDashboadUploadForm