import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";
//

import { consultantSettingApi, login, loginApi } from "../DAL/Login/Login";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { LoginForm } from "../components/authentication/login";
import AuthSocial from "../components/authentication/AuthSocial";
import { get_app_headers, project_name } from "../config/config";
import { useContentSetting } from "src/Hooks/ContentSettingState";
import { GetProfileApi } from "src/DAL/Profile/Profile";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const headers = get_app_headers();
  // const { handleSetUserInfo } = useContentSetting();
  const {
    userInfo,
    handleSetUserInfo,
    handleConsultantInfo,
    handleAdminTimeZone,
    setUserProfile,
    setAdminTimeZone,
  } = useContentSetting();
  // console.log(contentSettingData, "contentSettingData");

  const getContentSetting = async () => {
    // const result = await consultantSettingApi();
    console.log(result, "consultantSettingApi");
    if (result.code == 200) {
      handleConsultantInfo(result.consultant_setting);
    } else {
      // enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  const consultantProfile = async () => {
    const result = await GetProfileApi(userInfo._id);
    if (result.code === 200) {
      console.log(result, "GetProfileApiGetProfileApiGetProfileApi");
      localStorage.setItem("admin_time_zone", JSON.stringify(result.time_zone));
      setUserProfile(result.consultant);
      handleSetUserInfo(result.consultant);
      handleAdminTimeZone(result.time_zone);
      setAdminTimeZone(result.time_zone);
      // setUserInfo(result.consultant);
    }
  };

  const handleSubmitLogin = async (data) => {
    setLoading(true);
    const result = await loginApi(data);
    if (result.code == 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      localStorage.setItem(`Admin`, "Admin");
      localStorage.setItem(`user`, JSON.stringify(result.customer));
      localStorage.setItem(`token`, result.token);
      navigate("/dashboard", { replace: true });
      setLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <RootStyle>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Animal Hub
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your details below.
            </Typography>
          </Stack>

          <LoginForm isLoading={loading} onhandleLogin={handleSubmitLogin} />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              {/* <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link> */}
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
