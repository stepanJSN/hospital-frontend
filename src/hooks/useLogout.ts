import { authService } from '@/services/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next//navigation';

export default function useLogout() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const logout = () => {
    authService.logout();
    queryClient.invalidateQueries();
    push('/auth/signin');
  };
  return logout;
}
