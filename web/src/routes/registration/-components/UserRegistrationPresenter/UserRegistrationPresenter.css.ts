import { themeVars } from "@/styles/theme";
import { style } from "@vanilla-extract/css";

export const userRegistrationStyle = {
  wrapper: style({
    backgroundColor: themeVars.colors.gray[1],
    minHeight: "100dvh",
  }),
};
