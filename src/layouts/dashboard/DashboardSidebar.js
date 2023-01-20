import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// material
import { styled } from "@mui/material/styles";
import videoFill from "@iconify/icons-eva/video-fill";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  Icon,
} from "@mui/material";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import sidebarConfig from "./SidebarConfig";
import sidebarConfigLogout from "./SidebarConfigLogout";
import account from "../../_mocks_/account";
import {
  consultantProfileApi,
  consultantSettingApi,
  logout,
} from "../../DAL/Login/Login";
import { baseUri } from "../../config/config";
import { _get_user_from_localStorage } from "src/DAL/localstorage/LocalStorage";
import { useContentSetting } from "src/Hooks/ContentSettingState";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
  cursor: "pointer",
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const { enqueueSnackbar } = useSnackbar();
  const user_profile = _get_user_from_localStorage();
  const navigate = useNavigate();
  const {
    userInfo,
    setUserInfo,
    handleSetUserInfo,
    consultantInfo,
    handleConsultantInfo,
  } = useContentSetting();
  const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
  //console.log(user_profile.first_name, "user_profileuser_profileuser_profile");

  // const nameHandle = () => {
  //   if (user_profile.first_name) {
  //     const recording_object = {
  //       title: `${user_profile?.first_name} Recording`,
  //       path: "/recordings",
  //       icon: getIcon(videoFill),
  //     };
  //     sidebarConfig.push(recording_object);
  //     //console.log(recording_object, "recording_object");
  //   }
  // };
  // console.log(
  //   userInfo,
  //   "userInfouserInfouserInfouserInfouserInfouserInfouserInfo"
  // );

  const handleLogout = async () => {
    const formdata = new FormData();
    formdata.append("token", localStorage.getItem("token"));
    const result = await logout(formdata);
    if (result.code === 200) {
      localStorage.clear();
      navigate("/login");
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };
  const getContentSetting = async () => {
    // const result = await consultantSettingApi();
    //console.log(result, "consultantSettingApi");
    if (result.code == 200) {
      handleConsultantInfo(result.consultant_setting);
      localStorage.setItem(
        `consultant_data`,
        JSON.stringify(result.consultant_setting)
      );
    }
  };
  const getProfile = async () => {
    // const result = await consultantProfileApi(userInfo?._id);
    //console.log(result, "profile Api");
    if (result.code == 200) {
      localStorage.setItem(`user_data`, JSON.stringify(result.consultant));
      localStorage.setItem(`admin_time_zone`, JSON.stringify(result.time_zone));
      // console.log(result, "resultresultresult");
      handleSetUserInfo(result.consultant);
    }
  };
  // const consultantProfile = async () => {
  //   const result = await GetProfileApi(userInfo._id);
  //   if (result.code === 200) {
  //     console.log(result, "GetProfileApiGetProfileApiGetProfileApi");
  //     localStorage.setItem("admin_time_zone", result.time_zone);
  //     setUserProfile(result.consultant);
  //     handleSetUserInfo(result.consultant);
  //     handleAdminTimeZone(result.time_zone);
  //     setAdminTimeZone(result.time_zone);
  //     // setUserInfo(result.consultant);
  //   }
  // };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);
  useEffect(() => {
    getContentSetting();
    getProfile();
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Logo consultantInfo={consultantInfo} />
        </Box>
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
        <AccountStyle onClick={() => navigate('/user_profile')}>
          {localStorage.getItem('image') ? (
            <Avatar src={baseUri + localStorage.getItem('image')} alt="photoURL" />
          ) : (
            <Avatar>{localStorage.getItem('first_name').substring(0, 1)}</Avatar>
          )}
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {localStorage.getItem('first_name')} {(' ', localStorage.getItem('last_name'))}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                role
              </Typography>
          </Box>
        </AccountStyle>
        </Link>
      </Box> */}

      <NavSection
        navConfig={
          pathname == "/terms" ||
          pathname == "/privacy" ||
          pathname == "/about-us"
            ? sidebarConfigLogout({
                recording_name: userInfo?.first_name,
                type: userInfo?.team_type,
              })
            : sidebarConfig({
                recording_name: userInfo?.first_name,
                type: userInfo?.team_type,
              })
        }
      />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Button fullWidth onClick={() => handleLogout()} variant="contained">
          Logout
        </Button>
      </Box> */}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
