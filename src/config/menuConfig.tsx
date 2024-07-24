import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { MenuList } from '@/types/menu.type';

export const customerMenu: MenuList = [
  {
    pageRoute: "/staff",
    pageIcon: <CalendarMonthIcon />,
    pageText: "Make an appointment with a doctor"
  },
  {
    pageRoute: "/customer/appointments",
    pageIcon: <FormatListBulletedIcon />,
    pageText: "My appointments"
  },
  {
    pageRoute: "/customer/notifications",
    pageIcon: <NotificationsIcon />,
    pageText: "Notifications"
  },
  {
    pageRoute: "/customer/profile",
    pageIcon: <PersonIcon />,
    pageText: "Profile"
  }
]

export const staffMenu: MenuList = [
  {
    pageRoute: "appointments",
    pageIcon: <FormatListBulletedIcon />,
    pageText: "Appointments"
  },
  {
    pageRoute: "schedule",
    pageIcon: <CalendarMonthIcon />,
    pageText: "My schedule"
  },
  {
    pageRoute: "notifications",
    pageIcon: <NotificationsIcon />,
    pageText: "Notifications"
  },
  {
    pageRoute: "profile",
    pageIcon: <PersonIcon />,
    pageText: "Profile"
  }
]

export const adminMenu: MenuList = [
  {
    pageRoute: "/staff/appointments",
    pageIcon: <CalendarMonthIcon />,
    pageText: "Appointments"
  },
  {
    pageRoute: "/staff",
    pageIcon: <PeopleIcon />,
    pageText: "Staff"
  },
  {
    pageRoute: "/customers",
    pageIcon: <PersonIcon />,
    pageText: "Customers"
  },
  {
    pageRoute: "/staff/specializations",
    pageIcon: <FormatListBulletedIcon />,
    pageText: "Specializations"
  },
  {
    pageRoute: "/staff/profile",
    pageIcon: <AccountCircleIcon />,
    pageText: "Profile"
  }
]