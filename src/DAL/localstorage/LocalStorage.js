const _get_user_from_localStorage = () => {
  //console.log("localStorage.getItem", localStorage.getItem("user_data"));

  const user_profile = localStorage.getItem("user_data");
  if (
    user_profile &&
    user_profile !== undefined &&
    user_profile !== "undefined" &&
    user_profile !== null
  ) {
    //console.log("if");
    return JSON.parse(localStorage.getItem("user_data"));
  } else {
    //console.log("else");
    return {};
  }
};

const _get_content_setting_localStorage = () => {
  return JSON.parse(localStorage.getItem("content_setting"));
};

const _get_consultant_from_localStorage = () => {
  return JSON.parse(localStorage.getItem("consultant_data"));
};
const _get_client_dashboard_setting_localStorage = () => {
  return JSON.parse(localStorage.getItem("client_dashboard_setting"));
};
const _get_testmonial_localStorage = () => {
  return JSON.parse(localStorage.getItem("testmonial"));
};
const _get_home_event_localStorage = () => {
  return JSON.parse(localStorage.getItem("home_event"));
};
const _get_admin_time_zone_localStorage = () => {
  return JSON.parse(localStorage.getItem("admin_time_zone"));
};
const get_project_info_localStorage = () => {
  return JSON.parse(localStorage.getItem("project_info"));
};

module.exports = {
  _get_user_from_localStorage,
  _get_content_setting_localStorage,
  _get_client_dashboard_setting_localStorage,
  _get_testmonial_localStorage,
  _get_home_event_localStorage,
  _get_admin_time_zone_localStorage,
  _get_consultant_from_localStorage,
  get_project_info_localStorage,
};
