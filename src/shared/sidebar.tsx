import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NavLink } from 'react-router-dom';
import '../assets/css/Sidebar.css';
import { IconBaseProps } from "react-icons/lib"
import loadable from "@loadable/component";
import { getAllMenu } from '../service/menuMaster-Service';
import { getSessionUser } from '../common/commonMethod';

interface typesPropsIcon {
  nameIcon: string;
  propsIcon?: IconBaseProps
}

const drawerWidth = 240;
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    overflowX: 'auto', // Add horizontal scrollbar
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export function Icon({ nameIcon, propsIcon }: typesPropsIcon): JSX.Element {
  const lib = nameIcon.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase();
  const ElementIcon = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[nameIcon as keyof JSX.Element]
  });
  return <ElementIcon {...propsIcon} />
}

const MenuItem = ({ item }: any) => {
  const [isopen, setIsopen] = React.useState(true);
  if (item.subMenu) {
    return (
      <>
        <ListItemButton onClick={() => { setIsopen(!isopen) }}>
          <ListItemIcon>
            <Icon nameIcon={item.icon} />
          </ListItemIcon>
          <ListItemText primary={item.menuName} />
          {isopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* <ListItemButton sx={{ pl: 4 }}> */}
            {item.subMenu.map((child: any, index: any) => <MenuItem key={index} item={child} />)}
            {/* </ListItemButton> */}
          </List>
        </Collapse>
      </>
    )
  }
  else {
    return (
      (item.path) ? <ListItemButton >
        <ListItemIcon>
          {/* {<item.icon />} */}
        </ListItemIcon>
        <NavLink key={item.menuId} to={item.path} className='sidebar-item plain'>
          <ListItemText primary={item.menuName} sx={{ textDecoration: 'none' }} />
        </NavLink>
      </ListItemButton> : null
    )
  }
}

const Sidebar = (props: any) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const { sideMenus } = useSelector((state: RootState) => state.menu);
  const theme = useTheme();
  if (sideMenus.length == 0)
    dispatch(getAllMenu(getSessionUser()?.userId))

  const handleDrawerClose = () => {
    setOpen(false);
  }
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sideMenus.map((item, index) => <MenuItem key={index} item={item} />)}
      </List>
    </Drawer>
  )
}

export default Sidebar;
