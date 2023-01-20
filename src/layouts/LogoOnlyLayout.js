import {
  Link as RouterLink,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
// components
import Logo from "../components/Logo";
import DashboardSidebar from "./dashboard/DashboardSidebar";
import { useState } from "react";

// ----------------------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));
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

export default function LogoOnlyLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard"> </Navigate>;
  }
  console.log(pathname, "pathName");
  return (
    <>
      <RootStyle>
        {pathname == "/login" ? (
          ""
        ) : (
          <DashboardSidebar
            isOpenSidebar={open}
            onCloseSidebar={() => setOpen(false)}
          />
        )}
        {/* <RouterLink to="/">
          <Logo />
        </RouterLink> */}

        <MainStyle>
          <Outlet />
        </MainStyle>
      </RootStyle>
    </>
  );
}
