import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import unlockFill from "@iconify/icons-eva/unlock-fill";
import personFill from "@iconify/icons-eva/person-fill";
import creditCardFilled from "@iconify/icons-eva/credit-card-fill";
import dollarCircleFilled from "@iconify/icons-ant-design/dollar-circle-filled";
import StorageIcon from "@mui/icons-material/Storage";

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
import { logout } from "../../DAL/Login/Login";
import { _get_user_from_localStorage } from "src/DAL/localstorage/LocalStorage";
import { s3baseUrl } from "src/config/config";
import { get_root_value } from "src/utils/domUtils";
// import { ContentSettingApi } from "src/DAL/ContentSetting/ContentSetting";
import moment from "moment";
import { useContentSetting } from "src/Hooks/ContentSettingState";

// import ChangeCard from "src/components/ChangeCard/ChangeCard";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Feed",
    icon: personFill,
    linkTo: "#",
  },
  {
    label: "About",
    icon: personFill,
    linkTo: "#",
  },
  {
    label: "Photos",
    icon: dollarCircleFilled,
    linkTo: "#",
  },
  {
    label: "Friends",
    icon: dollarCircleFilled,
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function TabsPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const [openPasswordModal, setopenPasswordModal] = useState(false);
  const [openChangeCard, setOpenChangeCard] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

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
  const handlePopup = () => {
    console.log("okokokoko");
    // setOpen(false);
  };

  const { userInfo } = useContentSetting();
  const handleLogout = async () => {
    // const formdata = new FormData();
    // formdata.append('token', localStorage.getItem('token'));
    // const result = await logout(formdata);
    // if (result.code === 200) {
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    navigate("/login");
    // } else {
    //   enqueueSnackbar(result.message, { variant: 'error' });
    // }
  };
  const handleChange = () => {
    handleClose();
    navigate(`/dashboard`);
  };
  return (
    <>
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
        <StorageIcon />
      </IconButton>

      <MenuPopover
        Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
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
      </MenuPopover>
    </>
  );
}

// {
//   title: "Billing",
//   path: "/billing",
//   icon: getIcon(peopleFill),
// },
// {
//   title: "CreditCard",
//   path: "/creditcard",
//   icon: getIcon(peopleFill),
// },
// {
//   title: "All Transactions",
//   path: "/transaction",
//   icon: getIcon(peopleFill),
// },
