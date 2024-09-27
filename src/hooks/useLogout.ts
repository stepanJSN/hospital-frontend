import { authService } from '@/services/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next//navigation';

export default function useLogout() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const logout = () => {
    push('/auth/signin');
    authService.logout();
    queryClient.resetQueries();
  };
  return logout;
}
