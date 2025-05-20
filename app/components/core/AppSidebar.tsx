"use client"

import { Cloud, DarkMode, LightMode } from '@mui/icons-material';
import AssignmentIcon from "@mui/icons-material/Assignment"
import BarChartIcon from "@mui/icons-material/BarChart"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

// MUI Icons
import HomeIcon from "@mui/icons-material/Home"
import InventoryIcon from "@mui/icons-material/Inventory"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import PeopleIcon from "@mui/icons-material/People"
import PersonIcon from "@mui/icons-material/Person"
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from "@mui/icons-material/Settings"
import { InputAdornment, ListItemText, TextField } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { type CSSObject, styled, type Theme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import classNames from 'classnames';
import * as React from "react"
import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/data/store/root-hooks';
import { toggleDarkMode } from '~/data/ui/UI.slice';

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const navItems = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    href: "/",
    isActive: true,
  },
  {
    title: "Jobs",
    icon: <AssignmentIcon />,
    href: "/jobs",
  },
  {
    title: "Schedule",
    icon: <CalendarTodayIcon />,
    href: "/schedule",
  },
  {
    title: "Customers",
    icon: <PeopleIcon />,
    href: "/customers",
  },
  {
    title: "Materials",
    icon: <InventoryIcon />,
    href: "/materials",
  },
  {
    title: "Suppliers",
    icon: <LocalShippingIcon />,
    href: "/suppliers",
  },
  {
    title: "Reports",
    icon: <BarChartIcon />,
    href: "/reports",
  },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(state => state.UI);
  
  const handleDrawerToggle = () => {
    setOpen(!open)
  }
  
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleProfileClose = () => {
    setAnchorEl(null)
  }
  
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
  }
  
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
    }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box className={classNames(
            'column-grid',
            'justify-between',
            'w-full',
          )}>
            {open && (
              <Box className={classNames(
                'column-grid',
                'place-items-center',
              )}>
                <Box
                  className={classNames(
                    'p-2',
                    'rounded-md',
                  )}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                  }}
                >
                  <Cloud/>
                </Box>
                <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: "bold" }}>
                  JobCumulus
                </Typography>
              </Box>
            )}
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <NavLink to={item.href}>
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      bgcolor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: isActive ? "primary.main" : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: isActive ? "primary.main" : "inherit",
                        "& .MuiTypography-root": {
                          fontWeight: item.isActive ? "medium" : "regular"
                        }
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box className={classNames(
          'column-grid',
          'p-2',
          'gap-2',
          'grid-cols-[1fr_auto]'
        )}>
          <TextField
            size="small"
            placeholder={open ? "Search..." : ""}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: open ? 1 : 4,
                  pr: open ? undefined : 0,
                },
              }
            }}
          />
          <IconButton onClick={handleToggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
        <Divider />
        <Box>
          <ListItemButton
            onClick={handleProfileClick}
            sx={{
              borderRadius: 1,
              p: 1,
            }}
          >
            <Avatar sx={{ width: 32, height: 32, mr: open ? 2 : 0 }}>JD</Avatar>
            {open && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  D. Halwisbacherton III
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  dh@jobcumulus.com
                </Typography>
              </Box>
            )}
          </ListItemButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Drawer>
      <Box className={'gutter-primary'}>
        <Box className={'grid'}>
          <AppBar />
          {children}
        </Box>
      </Box>
    </Box>
  )
}
