import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const theme = createTheme({
  // fontFamily: "Noto Sans JP",
  primaryColor: "cyan",
});

export const themeVars = themeToVars(theme);
