import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Link,
} from "@mui/material";
import { get_root_value } from "src/utils/domUtils";
// import { memberDetail } from "src/DAL/Profile/Profile";
import { useSnackbar } from "notistack";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupIcon from "@mui/icons-material/Group";

// import { DashboardIcons } from "src/assets";

import {
  DashboardIcons,
  AffirmationIcons,
  GoalStatmentIcons,
  GratitudeIcons,
  MemoriesIcons,
  PodsIcons,
  ProfileIcons,
  ProgrammeIcons,
  QuotesIcons,
  VaultIcons,
  DayPlanIcons,
} from "src/assets";
import { project_name } from "src/config/config";
import { consultantSettingApi } from "src/DAL/Login/Login";
import { useContentSetting } from "src/Hooks/ContentSettingState";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  // color: theme.palette.text.secondary, //by Mohad bhai
  color: get_root_value("--sidebars-text-color"),
  // color: "white",
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: get_root_value("--portal-theme-primary"),
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);
  const [openDropMenu, setopenDropMenu] = useState(true);

  const handleClick = () => {
    setopenDropMenu(!open);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const getImageIcon = (name) => <img src={name} width={22} height={22} />;

  const activeRootStyle = {
    // color: get_root_value("--sidebar-selected-color"),
    color: get_root_value("--portal-theme-primary"),
    // color: "gold",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle className="sidebar-icon">
            {icon && icon}
          </ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const { userInfo, handleSetUserInfo, handleConsultantInfo } =
    useContentSetting();
  const { enqueueSnackbar } = useSnackbar();
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const navigate = useNavigate();
  const [planActive, setPlanActive] = React.useState(false);
  const [trackerActive, setTrackerActive] = React.useState(false);

  const handleClickDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  const getContentSetting = async () => {
    // const result = await consultantSettingApi();
    //console.log(result, "consultantSettingApi");
    if (result.code == 200) {
      // handleConsultantInfo(result.consultant_setting);
      // localStorage.setItem(
      //   `consultant_data`,
      //   JSON.stringify(result.consultant_setting)
      // );
    }
  };

  const getImageIcon = (name) => <img src={name} width={22} height={22} />;
  const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

  // const DayPlanIcon =
  //   project_name == "DD" ? getImageIcon(DayPlanIcons) : getIcon(fileTextFill);
  // const getMemberDetail = async () => {
  //   const result = await memberDetail();
  //   if (result.code === 200) {
  //     localStorage.setItem(`user_data`, JSON.stringify(result.member));
  //   } else {
  //     enqueueSnackbar(result.message, { variant: "error" });
  //   }
  // };
  const handleNavigatePlan = () => {
    navigate(`/ninety-day-plan`);
  };
  const handleNavigateTracker = () => {
    navigate(`/ninety-day-tracker`);
  };
  const handleNavigateGroups = () => {
    navigate("/groups");
  };
  const handleNavigateEvent = () => {
    navigate("/calender");
  };

  useEffect(() => {
    // getMemberDetail();
    getContentSetting();
  }, []);

  const match = ({ path, matches }) => {
    if (matches) {
      let is_active = false;
      matches.forEach((match_path) => {
        const match = match_path
          ? !!matchPath({ path: match_path, end: false }, pathname)
          : false;

        if (match) {
          is_active = true;
        }
      });

      //console.log(is_active, "is_active");
      return is_active;
    }
    return path ? !!matchPath({ path, end: false }, pathname) : false;
  };

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item, i) => {
          if (i === 4) {
            return (
              <>
                <NavItem
                  key={item.title}
                  item={item}
                  active={match}
                  setPlanActive={setPlanActive}
                  setTrackerActive={setTrackerActive}
                />
                <ListItemButton
                  onClick={handleClickDropDown}
                  component="a"
                  sx={{
                    pl: 5,
                    color: get_root_value("--input-text-color"),
                    fontSize: "14px",
                  }}
                >
                  <ListItemIcon>
                    {project_name == "HINA_KHAN" || project_name == "DANIELLE"
                      ? getIcon(fileTextFill)
                      : getImageIcon(DashboardIcons)}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "14px" }}
                    primary="Calender"
                  />
                  {openDropDown ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openDropDown} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      component="a"
                      sx={{
                        pl: 7,
                        color: get_root_value("--input-text-color"),
                        fontSize: "14px",
                      }}
                      onClick={handleNavigateGroups}
                      className={match({ path: "/groups" }) ? "menuActive" : ""}
                    >
                      <ListItemIcon>
                        <GroupIcon />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: "14px" }}
                        primary="Groups"
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      sx={{
                        pl: 7,
                        color: get_root_value("--input-text-color"),
                      }}
                      onClick={handleNavigateEvent}
                      className={
                        match({ path: "/calender" }) ? "menuActive" : ""
                      }
                    >
                      <ListItemIcon>
                        <RemoveRedEyeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: "14px" }}
                        primary="Calender Events"
                      />
                    </ListItemButton>
                    {/* <NavItem
                      key={item.title}
                      item={item}
                      active={match}
                      setPlanActive={setPlanActive}
                      setTrackerActive={setTrackerActive}
                    /> */}
                  </List>
                </Collapse>
              </>
            );
          }
          return <NavItem key={item.title} item={item} active={match} />;
        })}
      </List>
    </Box>
  );
}
