import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { IconButton, Button } from "@mui/material";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { ContextPGIMode } from "../../Hooks/PGIModeContext";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 65;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  console.log(localStorage.getItem("token"), "DashboardLayout TOKEN");
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login"> </Navigate>;
  } else if (!localStorage.getItem("user")) {
    localStorage.clear();
    return <Navigate to="/login"> </Navigate>;
  }

  return (
    <RootStyle>
      {/* <ContextPGIMode> */}
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
      {/* </ContextPGIMode> */}
    </RootStyle>
  );
}
