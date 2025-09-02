export const upload = {
  dashboardUpload: (formData: FormData) =>
    [`file/upload/sales`, { method: 'post', body: formData }] as const,
} as const;
