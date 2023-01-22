import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import barchartfill from "@iconify/icons-eva/bar-chart-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import personFill from "@iconify/icons-eva/person-fill";
import {
  _get_user_from_localStorage,
  _get_content_setting_localStorage,
  _get_client_dashboard_setting_localStorage,
  _get_testmonial_localStorage,
  _get_home_event_localStorage,
  _get_admin_time_zone_localStorage,
  get_project_info_localStorage,
} from "src/DAL/localstorage/LocalStorage";
import outlinePrivacyTip from "@iconify/icons-ic/outline-privacy-tip";
import outlinePolicy from "@iconify/icons-ic/outline-policy";

// ----------------------------------------------------------------------
const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const getImageIcon = (name) => <img src={name} width={22} height={22} />;
// const userInfo = useContentSetting();
// console.log(userInfo, "userProfile on login");
let sidebarConfigLogout = ({ recording_name = "", type }) => {
  sidebarConfigLogout = [
    {
      title: `About Us`,
      path: "/about-us",
      icon: getIcon(personFill),
    },
    {
      title: "Terms & Condition",
      path: "/terms",
      icon: getIcon(outlinePolicy),
    },
    {
      title: `Privacy & Policy`,
      path: "/privacy",
      icon: getIcon(outlinePrivacyTip),
    },
  ];
  return sidebarConfigLogout;
};
export default sidebarConfigLogout;
