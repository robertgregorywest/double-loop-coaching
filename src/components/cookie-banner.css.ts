import { style } from "@vanilla-extract/css";
import { theme } from "../theme.css";

export const backgroundWrapper = style({
  position: "fixed",
  display: "block",
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  padding: 0,
  color: theme.colors.background,
  backgroundColor: theme.colors.primary,
});

export const containerWrapper = style({
  paddingTop: 0,
  paddingBottom: 0,
});

export const sectionWrapper = style({
  paddingTop: theme.space[4],
  paddingBottom: 0,
});
