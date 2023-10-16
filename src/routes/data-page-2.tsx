import {Stack} from "@mui/material";
import 'moment/locale/ru';
import 'dayjs/locale/ru';
import * as React from "react";
import {useContext} from "react";
import {CSSObject, styled, Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link, Outlet} from "react-router-dom";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AppStore} from "~/common/stores";
import {useSnapshot} from "valtio";


export default function DataPage2() {
  const appState = useContext(AppStore);
  const {dataDrawerOpened} = useSnapshot(appState);

  return <Stack direction={'row'}>
    <CssBaseline/>
    <Drawer
      variant="permanent"
      open={dataDrawerOpened}
    >
      <Toolbar/>
      <Box sx={{overflow: 'auto'}}>
        <List>
          <ListItem key={'overview'} disablePadding>
            <ListItemButton component={Link} to={`/data2`}>
              <ListItemText primary={'Обзор'}/>
            </ListItemButton>
          </ListItem>

          <ListItemButton sx={{pl: 4}} component={Link} to={{pathname: '/data2', hash: '#ksg'}}>
            <ListItemText primary="КСГ"/>
          </ListItemButton>

          <ListItemButton sx={{pl: 4}} component={Link} to={`/data2`}>
            <ListItemText primary="Организации"/>
          </ListItemButton>

          {[{
            title: "Бюджет",
            link: "budget"
          }, {
            title: "Проектирование",
            link: "designing"
          }, {
            title: "Вехи",
            link: "milestones"
          }, {
            title: "ПС ПИР",
            link: "ps-pir"
          }, {
            title: "ПНР",
            link: "pnr"
          }, {
            title: "ПНР: дефекты",
            link: "pnr-defects"
          }, {
            title: "Надзор",
            link: "supervision"
          },].map((item) => (
            <ListItem key={item.link} disablePadding>
              <ListItemButton component={Link} to={`/data2/${item.link}`}>
                <ListItemText primary={item.title}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>

    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
      <Box component="main" sx={[{flexGrow: 1},
        dataDrawerOpened && {
          maxWidth: `calc(100vw - ${drawerWidth}px)`
        },
        !dataDrawerOpened && {
          maxWidth: '100vw'
        },
      ]}>
        <Outlet/>
      </Box>
    </LocalizationProvider>
  </Stack>
}


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: 0
});


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    // [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
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