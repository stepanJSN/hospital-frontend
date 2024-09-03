import { getUserRole } from '@/services/cookie';

export default async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  if (role === 'Admin') {
    return true;
  }
  return false;
}
