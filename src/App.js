// import { SnackbarProvider } from "notistack";
// import { Slide, StyledEngineProvider } from "@mui/material";

// // routes
// import Routers from "./routes";
// // theme
// import ThemeConfig from "./theme";
// import GlobalStyles from "./theme/globalStyles";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/index.css";
// import "./assets/css/style.css";
// // components
// import ScrollToTop from "./components/ScrollToTop";
// import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
// import { ContextPGIMode } from "./Hooks/PGIModeContext";
// import { Pods } from "./pages";

// // ----------------------------------------------------------------------

// export default function App() {
//   return (
//     <ContextPGIMode>
//       <ThemeConfig>
//         <ScrollToTop />
//         <GlobalStyles />
//         <BaseOptionChartStyle />
//         <SnackbarProvider
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "right",
//           }}
//           TransitionComponent={Slide}
//           maxSnack={3}
//         >
//           <Routers />
//         </SnackbarProvider>
//       </ThemeConfig>
//     </ContextPGIMode>
//   );
// }
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button, Slide, StyledEngineProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
// routes
import Routers from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
//Dark theme like DD
import "./assets/css/index.css";
import "./assets/css/style.css";
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { ContextPGIMode } from "./Hooks/PGIModeContext";
import { Pods } from "./pages";
import { get_app_headers, project_name, s3baseUrl } from "./config/config";
import { Helmet } from "react-helmet";
import {
  ContentSettingState,
  useContentSetting,
} from "./Hooks/ContentSettingState";
import { _get_consultant_from_localStorage } from "./DAL/localstorage/LocalStorage";
import { demoLogo } from "./assets";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { get_site_setting } from "./DAL/Payment/Payment";

// ----------------------------------------------------------------------

function App() {
  const notistackRef = React.createRef();
  const { consultantInfo } = useContentSetting();
  const headers = get_app_headers();
  //console.log(headers, "fav icon");
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  // console.log(
  //   consultantInfo ? consultantInfo : "",
  //   "get_consultant?.brand_faviconget_consultant?.brand_favicon"
  // );
  // const [stripePublicKey, setStripePublicKey] = useState({});

  // const stripePromise = loadStripe(
  //   "pk_test_51H2sBPIxjPbX33fQYlsCToNuBBTlFI12RzD4IPrr3YuEOYSoYaxQNmpbSNi39Pw28YvMHhz3Tfv7vMXmm3wWUXaf00eC2UhFlk"
  // );

  // console.log(stripePromise, "stripePromise");

  // const stripePromise = loadStripe(stripePublicKey);

  // get_site_setting
  // const getStripePublicKey = () => {
  //   // if (!localStorage.getItem("token")) {
  //   //   return loadStripe("");
  //   // }
  //   return new Promise(async (resolve, reject) => {
  //     const result = await get_site_setting();
  //     if (result.code === 200) {
  //       // Testing or live keys
  //       if (result.site_setting.stripe_mode === "sandBox") {
  //         resolve(loadStripe(result.site_setting.sandBox_publish_key));
  //       } else {
  //         resolve(loadStripe(result.site_setting.live_publish_key));
  //       }
  //     } else {
  //       alert(result.message);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   console.log(stripePublicKey, "stripePublicKey");
  // }, [stripePublicKey]);

  return (
    <ContextPGIMode>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <SnackbarProvider
          ref={notistackRef}
          action={(key) => (
            <Button
              className="snackbar-cross-icon"
              onClick={onClickDismiss(key)}
            >
              <CloseIcon />
            </Button>
          )}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
          maxSnack={3}
        >
          <Helmet>
            <title>Animal Hub</title>
            <meta
              name="description"
              content="Admin panel for the Products analysis"
            />
            <link
              rel="icon"
              type="image/x-icon"
              href={demoLogo}
              // href="https://basic-dev-app-bucket.s3.amazonaws.com/consultant_setting/bd7b5c17-3da4-426f-a046-9bd39702be9d.png"
            />
          </Helmet>
          <Routers />
        </SnackbarProvider>
      </ThemeConfig>
    </ContextPGIMode>
  );
}

export default App;
