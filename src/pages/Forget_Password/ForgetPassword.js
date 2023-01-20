import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";
// api
import {
  confirmEmail,
  confirmPinCode,
  updatePassword,
} from "../../DAL/Login/Login";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import { LoginForm } from "../../components/authentication/login";
import AuthSocial from "../../components/authentication/AuthSocial";
import EmailForm from "./components/EmailForm";
import PinCodeForm from "./components/PinCodeForm";
import NewPasswordForm from "./components/NewPasswordForm";

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

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState(0);
  const [adminEmail, setAdminEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEmail = async (_email) => {
    console.log(_email, "recive email");
    setAdminEmail(_email);
    const formData = new FormData();
    formData.append("email", _email);

    const result = await confirmEmail(formData);
    if (result.code === 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      setIsLoading(false);
      setStatus(1);
    } else {
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  const handleSubmitPinCode = async (pinCode) => {
    console.log(adminEmail, pinCode, "recieve pinCode");
    const formData = new FormData();
    formData.append("email", adminEmail);
    formData.append("verification_code", pinCode);

    const result = await confirmPinCode(formData);
    if (result.code === 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      setIsLoading(false);
      setStatus(2);
    } else {
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  const handleSubmitNewPassword = async (newPassword, confirmPassword) => {
    console.log(
      adminEmail,
      newPassword,
      confirmPassword,
      "recive both Passwords"
    );
    const formData = new FormData();
    formData.append("email", adminEmail);
    formData.append("password", newPassword);
    formData.append("confirm_password", confirmPassword);

    const result = await updatePassword(formData);
    if (result.code === 200) {
      setStatus(0);
      navigate("/login");
      enqueueSnackbar("Password Changed Successfully", { variant: "success" });
    } else {
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "error" });
    }

    // enqueueSnackbar('Password Changed Successfully', { variant: 'success' });
  };
  return (
    <RootStyle title="Forget Password | Task-Portal">
      <AuthLayout>
        Back to Login? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Forget Password
          </Typography> */}
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 2 }}>
            {/* <Typography variant="h4" gutterBottom>
              Forget Password
            </Typography> */}
            {status === 0 ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Forget Password
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Enter your Email.
                </Typography>
              </>
            ) : (
              ""
            )}
            {status === 1 ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Please check your email
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Enter PIN Code here.
                </Typography>
              </>
            ) : (
              ""
            )}
            {status === 2 ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Forget Password
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Enter your New Password.
                </Typography>
              </>
            ) : (
              ""
            )}
          </Stack>
          {status === 0 ? (
            <EmailForm onhandleEmailSubmit={handleSubmitEmail} />
          ) : (
            ""
          )}
          {status === 1 ? (
            <PinCodeForm
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              onhandlePinCodeSubmit={handleSubmitPinCode}
            />
          ) : (
            ""
          )}
          {status === 2 ? (
            <NewPasswordForm
              onhandleNewPasswordSubmit={handleSubmitNewPassword}
            />
          ) : (
            ""
          )}
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Back to Login?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
