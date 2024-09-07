'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery } from '@tanstack/react-query';
import { notificationsService } from '@/services/notifications';
import { MenuList } from '@/types/menu.type';
import { customerService } from '@/services/customer';
import { staffService } from '@/services/staff';
import useLogout from '@/hooks/useLogout';
import { useState } from 'react';
import Header from './Header';

type MenuProps = {
  menuList: MenuList;
  userRole: string;
};

export default function Menu({ menuList, userRole }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const logout = useLogout();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      if (userRole === 'Customer') {
        return customerService.get();
      }
      return staffService.get();
    },
  });

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications', true],
    queryFn: () => notificationsService.getAllByUserId(true),
  });

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isMobile && (
        <Header
          onMenuIconClick={handleMenuToggler}
          menuList={menuList}
          pathname={pathname}
        />
      )}
      <Drawer
        open={isMenuOpen}
        onClose={handleMenuToggler}
        sx={{
          width: {
            md: '230px',
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar src={data?.avatarUrl} sx={{ width: 56, height: 56, mt: 1 }} />
          {isSuccess && (
            <Typography
              variant="h6"
              component="p"
            >{`${data?.name} ${data?.surname}`}</Typography>
          )}
          {isPending && <Skeleton width="90%" sx={{ fontSize: '1.5rem' }} />}
          <Divider sx={{ width: '100%' }} />
          <List sx={{ width: '100%' }}>
            {menuList.map((element) => (
              <ListItem key={element.pageRoute}>
                <ListItemButton
                  href={element.pageRoute}
                  selected={pathname === element.pageRoute}
                  component={Link}
                  onClick={handleMenuToggler}
                >
                  <ListItemIcon>{element.pageIcon}</ListItemIcon>
                  <ListItemText primary={element.pageText} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem>
              <ListItemButton
                href="/notifications"
                selected={pathname === '/notifications'}
                component={Link}
                onClick={handleMenuToggler}
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
            </ListItem>
          </List>
          <Button fullWidth startIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
