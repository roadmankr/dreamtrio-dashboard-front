import { ROUTES } from '@/shared/constants/routes';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(ROUTES.DASHBOARD);
}
