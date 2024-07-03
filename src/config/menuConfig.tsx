import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { MenuList } from '@/types/menu.type';

export const customerMenu: MenuList = [
  {
    pageName: "book",
    pageIcon: <CalendarMonthIcon />,
    pageText: "Make an appointment with a doctor"
  },
  {
    pageName: "appointments",
    pageIcon: <FormatListBulletedIcon />,
    pageText: "My appointments"
  },
  {
    pageName: "notifications",
    pageIcon: <NotificationsIcon />,
    pageText: "Notifications"
  },
  {
    pageName: "profile",
    pageIcon: <PersonIcon />,
    pageText: "Profile"
  }
]