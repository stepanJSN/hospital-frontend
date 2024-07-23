"use client"

import { customerService } from '@/services/customer'
import { Avatar, Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MenuList } from '@/types/menu.type';
import { customerMenu, staffMenu } from '@/config/menuConfig';
import { staffService } from '@/services/staff';
import { getUserId, getUserRole } from '@/services/auth-token';
import { useEffect, useState } from 'react';
import { authService } from '@/services/auth';

export default function Menu() {
  const pathname = usePathname().split('/');
  const currentPage = pathname[2];
  const [role, setRole] = useState<string | null>(null);
  const { push } = useRouter()

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await getUserRole();
      setRole((userRole as string).toLowerCase());
    };
    fetchUserRole();
  }, []);

  const { data, isSuccess, isPending } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
      if(role === 'customer') {
        return customerService.get((await getUserId()) as string);
      }
      return staffService.getProfile();
    },
    enabled: !!role
	})

  function getMenu(): MenuList {
    switch (role) {
      case "customer":
        return customerMenu;
      case "staff":
        return staffMenu;
      default:
        return customerMenu;
    }
  }

  const logout = () => {
    authService.logout();
    push('/auth/signin');
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      mr={1}
      flex="0 0 25%"
      sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Avatar sx={{ width: 56, height: 56 }}>{data?.name.charAt(0)}</Avatar>
      {isSuccess && <Typography variant="h6" component="p">{`${data?.name} ${data?.surname}`}</Typography>}
      {isPending && <Skeleton width="90%" sx={{ fontSize: '1.5rem' }} />}
      <Divider sx={{ width: '100%' }} />
      <List sx={{ width: '100%' }}>
        {getMenu().map(element => (
          <ListItem key={element.pageName}>
            <ListItemButton
              href={`/${role}/${element.pageName}`}
              selected={currentPage === element.pageName}
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
