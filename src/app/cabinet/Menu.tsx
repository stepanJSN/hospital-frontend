"use client"

import { UserService } from '@/services/user'
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useQuery } from '@tanstack/react-query'

export default function Menu() {
  const { data } = useQuery({
		queryKey: ['profile'],
		queryFn: () => new UserService().getProfile()
	})

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      mr={1}
      sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Avatar sx={{ width: 56, height: 56 }}>{data?.name.charAt(0)}</Avatar>
      <Typography variant="h6" component="p">{`${data?.name} ${data?.surname}`}</Typography>
      <Divider sx={{ width: '100%' }} />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Make an appointment with a doctor" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="My appointments" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
