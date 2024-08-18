import { Box } from '@mui/material'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Menu from './Menu'
import { getUserRole } from '@/services/auth-token';
import { customerService } from '@/services/customer';
import { staffService } from '@/services/staff';
import { notificationsService } from '@/services/notifications';
import { MenuList } from '@/types/menu.type';
import { adminMenu, customerMenu, staffMenu } from '@/config/menuConfig';

export default async function Layout({ children }: {children: React.ReactNode}) {
  const userRole = await getUserRole() ?? "Customer";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: () => {
      if(userRole === 'Customer') {
        return customerService.get();
      }
      return staffService.get();
    },
  })

  queryClient.prefetchQuery({
    queryKey: ['notifications', true],
		queryFn: () => notificationsService.getAllByUserId(true),
  })

  const menuList = ((): MenuList => {
    switch (userRole) {
      case "Admin":
        return adminMenu;
      case "Staff":
        return staffMenu;
      default:
        return customerMenu;
    }
  })()

  return (
    <Box display="flex" minHeight="100vh" gap={1}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Menu menuList={menuList} userRole={userRole} />
        <Box 
          flex="0 1 75%" 
          paddingRight={1}
          paddingBottom={2}
        >{children}</Box>
      </HydrationBoundary>
    </Box>
  )
}
