import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  alpha,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import { usePGIMode } from "../Hooks/PGIModeContext";
import darkpalette from "./darkpalette";

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const { mode } = usePGIMode();
  // console.log(mode, "update mode");
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography: {
        fontFamily: `"Montserrat", sans-serif`,
        fontSize: 14,
        fontWeight: 500,
      },
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
