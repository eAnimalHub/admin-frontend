import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
import MenuPopover from "../components/MenuPopover";
//
import account from "../_mocks_/account";
import { logout } from "../DAL/Login/Login";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ProgramPopover(props) {
  console.log(props, "slugs data");
  const params = useParams();
  const anchorRef = useRef(null);
  const navigate = useNavigate();
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
  const handleLessons = () => {
    navigate(`/programmes/lessons_listing/${params.id}`);
  };

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
  const MENU_OPTIONS = [
    {
      label: "Lessons",
      icon: homeFill,
      linkTo: `/programmes/lessons_listing/${params.id}`,
    },
    {
      label: "Reviews",
      icon: settings2Fill,
      linkTo: "#",
    },
    {
      label: "Resources",
      icon: settings2Fill,
      linkTo: "#",
    },

    {
      label: "Recordings",
      icon: personFill,
      linkTo: "/profile",
    },

    {
      label: "BOB Videos",
      icon: settings2Fill,
      linkTo: "#",
    },
  ];

  return (
    <>
      <IconButton
        className="float-end"
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
              //   bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {/* <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {localStorage.getItem("first_name")}{" "}
            {(" ", localStorage.getItem("last_name"))}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {localStorage.getItem("email")}
          </Typography>
        </Box> */}
        {/* <MenuItem onClick={handleLessons}>Lessons</MenuItem>
        <MenuItem>Reviews</MenuItem>
        <MenuItem>Resources</MenuItem>
        <MenuItem>Recordings</MenuItem>
        <MenuItem>BOB Videos</MenuItem> */}

        {props.data.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
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
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        {/* <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}
