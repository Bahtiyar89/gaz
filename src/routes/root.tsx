import {Outlet} from "react-router-dom";
import NavTopbar from "../features/nav-topbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export default function Root() {
  return (
    <Box>
      <CssBaseline />
      {/*<MainTopbar/>*/}
      <NavTopbar/>

      {/*<div className={`CONTENT`}>*/}
        <Outlet/>
      {/*</div>*/}
    </Box>
  );
}