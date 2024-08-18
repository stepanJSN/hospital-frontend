"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, Badge, Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/auth';
import { notificationsService } from '@/services/notifications';
import { MenuList } from '@/types/menu.type';
import { customerService } from '@/services/customer';
import { staffService } from '@/services/staff';

type MenuProps = {
  menuList: MenuList;
  userRole: string;
};

export default function Menu({ menuList, userRole }: MenuProps) {
  const pathname = usePathname();
  const { push } = useRouter()

  const { data, isSuccess, isPending } = useQuery({
		queryKey: ['profile'],
		queryFn: () => {
      if(userRole === 'Customer') {
        return customerService.get();
      }
      return staffService.get();
    },
	})

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications', true],
		queryFn: () => notificationsService.getAllByUserId(true),
  })

  const logout = () => {
    authService.logout();
    push('/auth/signin');
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      flex="0 0 25%"
      mt={1}
      sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Avatar 
        src={data?.avatarUrl}
        sx={{ width: 56, height: 56 }}
      />
      {isSuccess && 
        <Typography variant="h6" component="p">{`${data?.name} ${data?.surname}`}</Typography>
      }
      {isPending && <Skeleton width="90%" sx={{ fontSize: '1.5rem' }} />}
      <Divider sx={{ width: '100%' }} />
      <List sx={{ width: '100%' }}>
        {menuList.map(element => (
          <ListItem key={element.pageRoute}>
            <ListItemButton
              href={element.pageRoute}
              selected={pathname === element.pageRoute}
              component={Link}
            >
              <ListItemIcon>
                {element.pageIcon}
              </ListItemIcon>
              <ListItemText primary={element.pageText} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItemButton
        href="/notifications"
        selected={pathname === "/notifications"}
        component={Link}
        sx={{ maxHeight: '48px', width: '90%' }}
      >
        <ListItemIcon>
          <Badge 
            badgeContent={notificationsData?.length} 
            invisible={notificationsData?.length === 0} 
            color="warning"
          >
            <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
      <Button 
        fullWidth 
        startIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  )
}
