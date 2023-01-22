import React from "react";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import unlockFill from "@iconify/icons-eva/unlock-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";
import { consultantSettingApi, logout } from "../../DAL/Login/Login";
import ChangePassword from "./ChangePassword";
import { get_root_value } from "src/utils/domUtils";
import { _get_user_from_localStorage } from "src/DAL/localstorage/LocalStorage";
import { s3baseUrl } from "src/config/config";
import { useContentSetting } from "src/Hooks/ContentSettingState";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: "Home",
  //   icon: homeFill,
  //   linkTo: "/",
  // },
  {
    label: "Edit Profile",
    icon: personFill,
    linkTo: "/edit-profile",
  },
  // {
  //   label: "Settings",
  //   icon: settings2Fill,
  //   linkTo: "#",
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [openPasswordModal, setopenPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState();
  const { userInfo } = useContentSetting();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleProfile = (value) => {
    navigate(value);
    handleClose();
  };

  // const getContentSetting = async () => {
  //   const result = await consultantSettingApi();
  //   console.log(result, "consultantSettingApi");
  //   if (result.code == 200) {
  //     localStorage.setItem(
  //       `consultant_data`,
  //       JSON.stringify(result.consultant_setting)
  //     );
  //   }
  // };
  const handleLogout = async () => {
    // const formdata = new FormData();
    // formdata.append('token', localStorage.getItem('token'));
    // const result = await logout(formdata);
    // if (result.code === 200) {
    localStorage.clear();
    navigate("/login");
    // } else {
    //   enqueueSnackbar(result.message, { variant: 'error' });
    // }
  };
  React.useEffect(() => {
    setUserData(userInfo);
    setProfileImage(s3baseUrl + userInfo?.profile_image);
  }, []);
  // console.log(userInfo, "userInfouserInfouserInfouserInfo123456");
  return (
    <>
      <ChangePassword
        openPasswordModal={openPasswordModal}
        setopenPasswordModal={setopenPasswordModal}
      />
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
            color: get_root_value("--portal-theme-primary"),
          }),
        }}
      >
        <Avatar
          className="top-avatar"
          src={s3baseUrl + userInfo?.profile_image}
          alt="photoURL"
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {userInfo.first_name}
            &nbsp;{(" ", userInfo.last_name)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: get_root_value("--input-text-color: #fff") }}
            noWrap
          >
            {userInfo.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            // to={option.linkTo}
            // component={RouterLink}
            onClick={() => handleProfile(option.linkTo)}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
                color: get_root_value("--portal-theme-primary"),
              }}
            />

            {option.label}
          </MenuItem>
        ))}
        <MenuItem
          key=""
          // to={option.linkTo}
          // component={RouterLink}
          onClick={() => {
            handleClose();
            setopenPasswordModal(true);
          }}
          sx={{ typography: "body2", py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={unlockFill}
            sx={{
              mr: 2,
              width: 24,
              height: 24,
              color: get_root_value("--portal-theme-primary"),
            }}
          />
          Change Password
        </MenuItem>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
