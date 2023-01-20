// here we add all base urls and keys

// Base URLS
// export const baseUri = process.env.REACT_APP_API_BASE_URL;
// export const s3baseUrl = process.env.REACT_APP_PIC_BASE_URL;

// Keys
// export const secret_key = process.env.REACT_APP_API_SECRET_KEY;
// here we add all base urls and keys

import {
  appLogoIcon,
  appLogoIcon2,
  danielleLogo,
  pgiLogo,
  pgiFav,
  hinaKhanLogo,
  danielleSidebarLogo,
} from "src/assets";
import { _get_consultant_from_localStorage } from "src/DAL/localstorage/LocalStorage";
import { useContentSetting } from "src/Hooks/ContentSettingState";
import { update_root_value } from "src/utils/domUtils";
export const project_name = process.env.REACT_APP_PROJECT_NAME;
const get_consultant = _get_consultant_from_localStorage();

// Base URLS
export const baseUri = process.env.REACT_APP_API_BASE_URL;
export const s3baseUrl = process.env.REACT_APP_PIC_BASE_URL;

// export const project_name = "HINA_KHAN";
// export const project_name = "DANIELLE";
// export const project_name = "DD";

//console.log(get_consultant, "clg");
//console.log(get_consultant?.meta_title, "clg2");

// const { consultantInfo } = useContentSetting();

export const material_theme_palate = {
  lighter: "#d4bff2",
  light: "#ede7f6",
  main: "#1a93a9",
  dark: "#198BA8",
  darker: "#198BA8",
  contrastText: "#fff",
};
export const OwnerName = () => {
  if (project_name == "DD") {
    return "Kim";
  } else if (project_name == "HINA_KHAN") {
    return "Hina";
  } else if (project_name == "DANIELLE") {
    return "Danielle";
  } else if (project_name == "PGI_DEV") {
    return "PGI";
  }
};

export const ownerName = OwnerName() + "'s";
export const ownerCompleteName = OwnerName();

export const get_app_logo = () => {
  if (project_name == "DD") {
    //console.log(appLogoIcon, "appLogoIcon");
    return get_consultant?.brand_logo;
  } else if (project_name == "HINA_KHAN") {
    return get_consultant?.brand_logo;
  } else if (project_name == "DANIELLE") {
    return get_consultant?.brand_logo;
  } else if (project_name == "BASIC_DEV") {
    return get_consultant?.brand_logo;
  } else if (project_name == "PGI_DEV") {
    return get_consultant?.brand_logo;
  }
};

export const get_app_headers = () => {
  if (project_name == "DD") {
    return {
      title: get_consultant?.meta_title,
      description: get_consultant?.meta_description,
      fav_icon: get_consultant?.brand_favicon,
    };
  } else if (project_name == "HINA_KHAN") {
    return {
      title: get_consultant?.meta_title,
      description: get_consultant?.meta_description,
      fav_icon: get_consultant?.brand_favicon,
    };
  } else if (project_name == "DANIELLE") {
    return {
      title: get_consultant?.meta_title,
      description: get_consultant?.meta_description,
      fav_icon: get_consultant?.brand_favicon,
    };
  } else if (project_name == "BASIC_DEV") {
    return {
      title: get_consultant?.meta_title,
      description: get_consultant?.meta_description,
      fav_icon: get_consultant?.brand_favicon,
    };
  } else if (project_name == "PGI_DEV") {
    return {
      title: get_consultant?.meta_title,
      description: get_consultant?.meta_description,
      fav_icon: get_consultant?.brand_favicon,
    };
  }
};

if (project_name == "DD") {
  material_theme_palate.main = "#f6bd4b";
} else {
  material_theme_palate.main = "#1a93a9";
}

if (project_name == "DDD") {
  material_theme_palate.main = "#f6bd4b";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#f6bd4b");
  update_root_value("--portal-theme-secondary", "rgb(255 218 0 / 8%)");
  update_root_value("--text-primary-color", "white");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "black");
  update_root_value("--background-secondary-color", "#1d1c1d");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "white");
  update_root_value("--sidebars-active-color", "#f6bd4b");
  update_root_value("--sidebars-hover-color:", "#f6bd4b");
  update_root_value("--sidebars-background-color", "#1d1c1d");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#1d1c1d");
  update_root_value("--popup-text-color", "white");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "#fff");
  update_root_value("--input-placeholder-color", "#fff");
  update_root_value("--input-background-primary", "#1d1c1d");
  update_root_value("--input-background-secondary", "#1d1c1d");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */

  update_root_value("--button-background-color", "#1c1c1c");
  update_root_value("--button-text-color", "#f6bd4b");
  update_root_value("--button-outlined-color", "#f6bd4b");
  update_root_value("--button-hover-color", "#f6bd4b");

  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "rgb(56, 54, 54)");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  /* calendar Properties ends*/
} else if (project_name == "BASIC_DEV") {
  material_theme_palate.main = "#f6bd4b";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#f6bd4b");
  update_root_value("--portal-theme-secondary", "rgb(255 218 0 / 8%)");
  update_root_value("--text-primary-color", "white");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "black");
  update_root_value("--background-secondary-color", "#1d1c1d");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "white");
  update_root_value("--sidebars-active-color", "#f6bd4b");
  update_root_value("--sidebars-hover-color:", "#f6bd4b");
  update_root_value("--sidebars-background-color", "#1d1c1d");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#1d1c1d");
  update_root_value("--popup-text-color", "white");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "#fff");
  update_root_value("--input-placeholder-color", "#fff");
  update_root_value("--input-background-primary", "#1d1c1d");
  update_root_value("--input-background-secondary", "#1d1c1d");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */

  update_root_value("--button-background-color", "#1c1c1c");
  update_root_value("--button-text-color", "#f6bd4b");
  update_root_value("--button-outlined-color", "#f6bd4b");
  update_root_value("--button-hover-color", "#f6bd4b");

  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "rgb(56, 54, 54)");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  /* calendar Properties ends*/
} else if (project_name == "PGI_DEV") {
  material_theme_palate.main = "#f6bd4b";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#f6bd4b");
  update_root_value("--portal-theme-secondary", "rgb(255 218 0 / 8%)");
  update_root_value("--text-primary-color", "white");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "black");
  update_root_value("--background-secondary-color", "#1d1c1d");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "white");
  update_root_value("--sidebars-active-color", "#f6bd4b");
  update_root_value("--sidebars-hover-color:", "#f6bd4b");
  update_root_value("--sidebars-background-color", "#1d1c1d");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#1d1c1d");
  update_root_value("--popup-text-color", "white");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "#fff");
  update_root_value("--input-placeholder-color", "#fff");
  update_root_value("--input-background-primary", "#1d1c1d");
  update_root_value("--input-background-secondary", "#1d1c1d");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */

  update_root_value("--button-background-color", "#1c1c1c");
  update_root_value("--button-text-color", "#f6bd4b");
  update_root_value("--button-outlined-color", "#f6bd4b");
  update_root_value("--button-hover-color", "#f6bd4b");

  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "rgb(56, 54, 54)");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  /* calendar Properties ends*/
} else if (project_name == "DD") {
  material_theme_palate.main = "#1a93a9";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#1a93a9");
  update_root_value("--portal-theme-secondary", "rgb(0 171 85 / 8%)");
  update_root_value("--text-primary-color", "black");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "white");
  update_root_value("--background-secondary-color", "white");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "black");
  update_root_value("--sidebars-active-color", "#1a93a9");
  update_root_value("--sidebars-hover-color", "#1a93a9");
  update_root_value("--sidebars-background-color", "white");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#fff");
  update_root_value("--popup-text-color", "black");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "black");
  update_root_value("--input-placeholder-color", "black"); //not yet
  update_root_value("--input-background-primary", "#fff"); //not yet
  update_root_value("--input-background-secondary", "#EAEAEA");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */
  update_root_value("--button-background-color", "#1a93a9");
  update_root_value("--button-text-color", "#fff");
  update_root_value("--button-outlined-color", "#1a93a9");
  update_root_value("--button-hover-color", "#1a93a9");
  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "#F1F3F4");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  /* calendar Properties ends*/
} else if (project_name == "DANIELLE") {
  material_theme_palate.main = "#1a93a9";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#1a93a9");
  update_root_value("--portal-theme-secondary", "rgb(0 171 85 / 8%)");
  update_root_value("--text-primary-color", "black");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "white");
  update_root_value("--background-secondary-color", "white");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "black");
  update_root_value("--sidebars-active-color", "#1a93a9");
  update_root_value("--sidebars-hover-color", "#1a93a9");
  update_root_value("--sidebars-background-color", "white");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#fff");
  update_root_value("--popup-text-color", "black");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "black");
  update_root_value("--input-placeholder-color", "black"); //not yet
  update_root_value("--input-background-primary", "#fff"); //not yet
  update_root_value("--input-background-secondary", "#EAEAEA");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */
  update_root_value("--button-background-color", "#1a93a9");
  update_root_value("--button-text-color", "#fff");
  update_root_value("--button-outlined-color", "#1a93a9");
  update_root_value("--button-hover-color", "#1a93a9");
  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "#F1F3F4");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  /* calendar Properties ends*/
} else if (project_name == "animal") {
  material_theme_palate.main = "#F46521";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#F46521");
  update_root_value(
    "--portal-theme-primary-filter-color",
    "invert(42%) sepia(98%) saturate(369%) hue-rotate(141deg) brightness(94%) contrast(94%)"
  );
  update_root_value("--portal-theme-secondary", "rgb(0 171 85 / 8%)");
  update_root_value("--text-primary-color", "black");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "white");
  update_root_value("--background-secondary-color", "white");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "black");
  update_root_value("--sidebars-active-color", "#1a93a9");
  update_root_value("--sidebars-hover-color", "#1a93a9");
  update_root_value("--sidebars-background-color", "white");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#fff");
  update_root_value("--popup-text-color", "black");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "black");
  update_root_value("--input-placeholder-color", "black"); //not yet
  update_root_value("--input-background-primary", "#fff"); //not yet
  update_root_value("--input-background-secondary", "#EAEAEA");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */
  update_root_value("--button-background-color", "#F46521");
  update_root_value("--button-text-color", "#fff");
  update_root_value("--button-outlined-color", "#F46521");
  update_root_value("--button-hover-color", "#F46521");
  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "#F1F3F4");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  update_root_value("--datepicker-selected-color", "#fff");
  /* calendar Properties ends*/
} else {
  //DD theme in else
  material_theme_palate.main = "#f6bd4b";
  /* Main theme color */
  update_root_value("--portal-theme-primary", "#f6bd4b");
  update_root_value("--portal-theme-secondary", "rgb(255 218 0 / 8%)");
  update_root_value("--text-primary-color", "white");
  update_root_value("--text-secondary-color", "rgb(150, 150, 150)");
  /* Main theme color end */

  /* Main background color*/
  update_root_value("--background-primary-color", "black");
  update_root_value("--background-secondary-color", "#1d1c1d");

  /* Main background color end*/

  /* Sidebar Properties */
  update_root_value("--sidebars-text-color", "white");
  update_root_value("--sidebars-active-color", "#f6bd4b");
  update_root_value("--sidebars-hover-color:", "#f6bd4b");
  update_root_value("--sidebars-background-color", "#1d1c1d");
  /* Sidebar Properties */

  /* Popup / Popover properties  */
  update_root_value("--popup-background-color", "#1d1c1d");
  update_root_value("--popup-text-color", "white");
  /* Popup / Popover properties end  */

  /* Element properties */
  update_root_value("--input-text-color", "#fff");
  update_root_value("--input-placeholder-color", "#fff");
  update_root_value("--input-background-primary", "#1d1c1d");
  update_root_value("--input-background-secondary", "#1d1c1d");
  update_root_value(" --icons-color-allover", "#f6bd4b");
  /* Element properties ends*/

  /* Button Properties */

  update_root_value("--button-background-color", "#1c1c1c");
  update_root_value("--button-text-color", "#f6bd4b");
  update_root_value("--button-outlined-color", "#f6bd4b");
  update_root_value("--button-hover-color", "#f6bd4b");

  /* Button Properties ends*/

  /* Audio Properties */
  update_root_value("--audio-color", "rgb(56, 54, 54)");
  /* Audio Properties ends*/

  /* calendar Properties */
  update_root_value("--calendar-selected-box", "#8b8b8b");
  /* calendar Properties ends*/
}
