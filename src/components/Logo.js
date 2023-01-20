import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";
import { demoLogo } from "../assets";
import { get_app_logo, project_name, s3baseUrl } from "../config/config";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};
export default function Logo({ sx, consultantInfo }) {
  // const logo = get_app_logo();
  const logo = consultantInfo?.brand_logo;
  //console.log(consultantInfo, "logo");
  return <Box component="img" src={demoLogo} sx={{ ...sx }} height={100} />;
}
