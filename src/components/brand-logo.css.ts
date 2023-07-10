import { style, styleVariants } from "@vanilla-extract/css";
import { theme } from "../theme.css";

const logoBase = style({
  transitionProperty: "fill",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
});

export const logoTopColor = styleVariants({
  primary: [logoBase, { fill: theme.colors.logoTop }],
  reversed: [logoBase, { fill: theme.colors.background }],
});

export const logoMiddleColor = styleVariants({
  primary: [logoBase, { fill: theme.colors.logoMiddle }],
  reversed: [logoBase, { fill: theme.colors.background }],
});

export const logoBottomColor = styleVariants({
  primary: [logoBase, { fill: theme.colors.logoBottom }],
  reversed: [logoBase, { fill: theme.colors.background }],
});
