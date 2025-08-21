import { ROUTES } from '@/shared/constants/urls';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(ROUTES.DASHBOARD);
}
