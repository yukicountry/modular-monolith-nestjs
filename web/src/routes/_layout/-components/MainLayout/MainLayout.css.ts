import { themeVars } from "@/styles/theme";
import { style } from "@vanilla-extract/css";

export const mainLayoutStyle = {
  wrapper: style({
    // paddingTop: "60px",
    minWidth: "1080px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  }),
  main: style({
    backgroundColor: themeVars.colors.gray[1],
    flex: 1,
  }),
};
