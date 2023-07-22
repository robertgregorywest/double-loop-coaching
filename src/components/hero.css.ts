import { style } from "@vanilla-extract/css";
import { theme } from "../theme.css";
import { media } from "./ui.css";

export const heroSubhead = style({
  fontSize: theme.fontSizes[4],
  "@media": {
    [media.small]: {
      fontSize: theme.fontSizes[5],
    },
  },
});
