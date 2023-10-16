import * as React from 'react';
import {useRef, useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "~/features/logo";
import {FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, Stack, Tab, Tabs} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Link, useLocation} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {changeDataDrawer} from "~/common/stores";
import ProjectsDialog from "~/features/projects";
import {Apps, PhotoCamera} from "@mui/icons-material";
// import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

function LinkTab(props: {
  label: string;
  to: string;
  disabled?: boolean;
}) {
  return (
    <Tab
      sx={{
        '&.Mui-selected': {
          color: grey[50],
        },
        '&.Mui-disabled': {
          color: grey[700],
        },
        color: grey[400],
      }}
      component={Link}

      // onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      //   event.preventDefault();
      // }}
      {...props}
    />
  );
}

function AppGrid(props: { onClick: () => void }) {
  return <Grid container spacing={0} sx={{maxWidth: '30rem',}}>
    {['ПСД', 'МТО', 'СМР', 'ВВОД', 'ФИНПЛАН', 'ДОКУМЕНТООБОРОТ', 'ПЕРСОНАЛ', 'КОНТРОЛЬ', 'ОТЧЕТЫ'].map((item, i) =>
      <Grid item xs={4} sx={{
        maxWidth: '10rem',
        width: '10rem',
        height: '10rem',
      }}>
        {/*<Paper>*/}
        <MenuItem component={'button'}
          sx={{
            maxWidth: '10rem',
            width: '10rem',
            height: '10rem',
            justifyContent: 'center'
          }}
          key={i}
          onClick={props.onClick}
        >
          {item}
        </MenuItem>
        {/*</Paper>*/}
      </Grid>
    )}
  </Grid>
}

export default function NavTopbar() {
  // const appStore = useContext(AppStore);
  // const {dataDrawerOpened} = useSnapshot(appStore);
  const {pathname} = useLocation();
  const showDrawerIcon = pathname.includes('/data2')
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [currProject, setCurrProject] = useState({
    id: 1,
    title: "Газоснабжение Сыктывкарского промузла",
    lastEdit: "2023-03-07"
  });

  const menuRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);

  const [openProjects, setOpenProjects] = useState(false);
  return (
    <AppBar position="sticky" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={changeDataDrawer}
          sx={{
            mr: 2,
            ...(!showDrawerIcon && {display: 'none'}),
          }}
        >
          <MenuIcon/>
        </IconButton>
        <Logo/>

        <Tabs
          sx={{
            ml: '2rem',
            flexGrow: 1
          }}
          indicatorColor={'secondary'}
          // textColor={'white'}
          value={value}
          onChange={handleChange}
        >
          <LinkTab label="Главная" to="/"/>
          <LinkTab label="Филиал" to="/branch"/>
          <LinkTab label="Данные" to="/data"/>
          <LinkTab label="Данные 2" to="/data2"/>
          <LinkTab label="Персонал" to="/staff" disabled/>
          <LinkTab label="Планировщик" to="/planner" disabled/>
          <LinkTab label="Настройки" to="/settings" disabled/>
        </Tabs>

        <Stack spacing={'1rem'} alignItems={'center'} direction={"row"}>
          <IconButton onClick={() => setMenuOpened(true)} color="inherit" ref={menuRef}>
            {/*<input hidden accept="image/*" type="file" />*/}
            <Apps/>
          </IconButton>

          <Menu
            // id="basic-menu"
            anchorEl={menuRef.current}
            open={menuOpened}
            onClose={() => setMenuOpened(false)}
            // MenuListProps={{
            //   'aria-labelledby': 'basic-button',
            // }}
          >
            <AppGrid onClick={() => setMenuOpened(false)}/>
          </Menu>

          <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
            <InputLabel sx={{
              color: grey[500],
            }} id="demo-simple-select-filled-label">Проект</InputLabel>

            <Select
              sx={{
                bgcolor: 'primary.dark',
                color: 'white',
                '.MuiSelect-icon ': {
                  fill: grey[50],
                }
              }}
              open={false}
              onOpen={(e) => {
                e.preventDefault();
                setOpenProjects(true);
              }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={currProject.id}
              // onChange={(e) => e.preventDefault()}
            >
              <MenuItem value={currProject.id}>{currProject.title}</MenuItem>
            </Select>

            <ProjectsDialog open={openProjects} setOpen={setOpenProjects}/>
          </FormControl>
        </Stack>
      </Toolbar>
    </AppBar>
    // </Box>
  );
}

