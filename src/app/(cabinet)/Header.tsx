import { MenuList } from '@/types/menu.type';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

type HeaderProps = {
  onMenuIconClick: () => void;
  menuList: MenuList;
  pathname: string;
};

export default function Header({
  onMenuIconClick,
  menuList,
  pathname,
}: HeaderProps) {
  return (
    <AppBar>
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuIconClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`Hospital | ${menuList.find((menuItem) => menuItem.pageRoute === pathname)?.pageText}`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
