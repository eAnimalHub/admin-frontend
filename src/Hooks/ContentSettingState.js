import React, { useContext, useEffect, useState } from "react";
import {
  _get_admin_time_zone_localStorage,
  _get_consultant_from_localStorage,
  // get_project_info_localStorage,
  // _get_admin_time_zone_localStorage,
  // _get_client_dashboard_setting_localStorage,
  // _get_content_setting_localStorage,
  // _get_home_event_localStorage,
  // _get_testmonial_localStorage,
  _get_user_from_localStorage,
} from "../DAL/localstorage/LocalStorage";
// import { ProjectInfoApi } from "src/DAL/Profile/Profile";

const CreateContentSetting = React.createContext();
// const content_setting = _get_content_setting_localStorage();
// const client_dashboard_setting = _get_client_dashboard_setting_localStorage();
// const get_testmonial_localStorage = _get_testmonial_localStorage();
// const get_home_event_localStorage = _get_home_event_localStorage();
const get_admin_time_zone_localStorage = _get_admin_time_zone_localStorage();
// const get_project_info = get_project_info_localStorage();
const get_user = _get_user_from_localStorage();
const get_consultant = _get_consultant_from_localStorage();

export const useContentSetting = () => useContext(CreateContentSetting);

export function ContentSettingState({ children }) {
  /* ------------------------------------------------------
  ------------------| States |--------------------
  ------------------------------------------------------- */

  const [adminTimeZone, setAdminTimeZone] = useState(
    _get_admin_time_zone_localStorage
  );

  //console.log(adminTimeZone, "adminTimeZone1");
  // console.log(
  //   get_consultant,
  //   "get_consultantget_consultantget_consultantget_consultantget_consultant"
  // );
  const [userInfo, setUserInfo] = useState(get_user);
  const [consultantInfo, setConsultantInfo] = useState(get_consultant);

  // const [contentSettingData, setContentSettingData] = useState(content_setting);
  // const [projectInfo, setProjectInfo] = useState(get_project_info);
  // const [dashboardEventData, setDashboardEventData] = useState(
  //   get_home_event_localStorage
  // );
  // const [dashboardTestimonialData, setDashboardTestimonialData] = useState(
  //   get_testmonial_localStorage
  // );
  // const [dashboardSettingData, setDashboardSettingData] = useState(
  //   client_dashboard_setting
  // );

  /* ------------------------------------------------------
------------------/ Hooks Functions /-------------------
  ------------------------------------------------------- */

  // const handleContentSettingData = (val) => {
  //   setContentSettingData(val);
  // };
  // const handleDashboardSettingData = (val) => {
  //   setDashboardSettingData(val);
  // };
  // const handleDashboardTestimonialData = (val) => {
  //   setDashboardTestimonialData(val);
  // };
  // const handleDashboardEventData = (val) => {
  //   setDashboardEventData(val);
  // };
  const handleAdminTimeZone = (val) => {
    setAdminTimeZone(val);
  };
  const handleSetUserInfo = (val) => {
    setUserInfo(val);
  };
  const handleConsultantInfo = (val) => {
    setConsultantInfo(val);
  };

  //Getting Project Info from API
  // const getProjectInfo = async () => {
  //   const result = "";
  //   if (result.code === 200) {
  //     localStorage.setItem(
  //       `project_info`,
  //       JSON.stringify(result.member_setting)
  //     );
  //     setProjectInfo(result.member_setting);
  //   }
  // };

  //console.log(adminTimeZone, "adminTimeZoneadminTimeZone");
  const collection = {
    adminTimeZone,
    setAdminTimeZone,
    // projectInfo,
    // dashboardEventData,
    // contentSettingData,
    // dashboardSettingData,
    // dashboardTestimonialData,
    // handleContentSettingData,
    // handleDashboardSettingData,
    // handleDashboardTestimonialData,
    handleSetUserInfo,
    userInfo,
    setUserInfo,
    consultantInfo,
    handleConsultantInfo,
    handleAdminTimeZone,
  };

  // useEffect(() => {
  //   getProjectInfo();
  // }, []);
  //console.log(consultantInfo, "consultantInfo");
  return (
    <CreateContentSetting.Provider value={collection}>
      {children}
    </CreateContentSetting.Provider>
  );
}
