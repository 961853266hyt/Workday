import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';

const UserPages = [
  { name: 'Personal Information', path: '/personal-information' },
  { name: 'Visa Status Management', path: '/visa-status' }
];
const HRpages = [
  { name: 'Home', path: '/' },
  { name: 'Employee Profiles', path: '/employee-profiles' },
  { name: 'Visa Status Management', path: '/visa-status' },
  { name: 'Hiring Management', path: '/hiring-management' }
];
// const UserPages = ['Personal Information', 'Visa Status Management'];
// const HRpages = ['Home', 'Employee Profiles', 'Visa Status Management', 'Hiring Management'];
const settings = ['Logout'];

function Header() {
  const [isHR, setIsHR] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.role === 'HR') {
      setIsHR(true);
    }
  }
  , [user]);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    dispatch(logOut());
    handleCloseUserMenu();
    navigate('/login');
  }
    

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WbSunnyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Workday Chuwa
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isHR && (HRpages.map((page) => (
                <MenuItem key={page.name} onClick={() => {handleMenuItemClick(page.path)}}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              )))}
              {!isHR && (UserPages.map((page) => (
                <MenuItem key={page.name} onClick={() => {handleMenuItemClick(page.path)}}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              )))}
            </Menu>
          </Box>
          <WbSunnyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            W Chuwa
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 4 }}>
            {isHR && (HRpages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {handleMenuItemClick(page.path)}}
                sx={{ fontSize: '18px', my: 2, color: 'white', display: 'block', textTransform: 'none' }}
              >
                {page.name}
              </Button>
            )))}
            {!isHR && (UserPages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {handleMenuItemClick(page.path)}}
                sx={{ fontSize: '18px', my: 2, color: 'white', display: 'block', textTransform: 'none' }}
              >
                {page.name}
              </Button>
            )))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}> 
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;