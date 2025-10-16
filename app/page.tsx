import { MAIN_URL } from '@/shared/constants/routes';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(MAIN_URL);
}
