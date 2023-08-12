import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../theme.css";

export const blogPost = style({
  fontSize: theme.fontSizes[3],
});

globalStyle(`${blogPost} img`, {
  maxWidth: "100%",
  height: "auto",
});

globalStyle(`${blogPost} a`, {
  color: "inherit",
  fontWeight: theme.fontWeights.medium,
});

const containedElements = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "pre",
  "ul",
  "ol",
  "dl",
  "blockquote",
  "footer",
]
  .map((el) => blogPost + " " + el)
  .join(", ");

globalStyle(containedElements, {
  maxWidth: theme.sizes.tight,
  marginLeft: "auto",
  marginRight: "auto",
});

globalStyle(`${blogPost} p`, {
  lineHeight: theme.lineHeights.text,
});

globalStyle(`${blogPost} h2`, {
  fontSize: theme.fontSizes[5],
  fontWeight: theme.fontWeights.bold,
});

globalStyle(`${blogPost} h3`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
});

globalStyle(`${blogPost} h4`, {
  fontSize: theme.fontSizes[3],
  fontWeight: theme.fontWeights.bold,
});

globalStyle(`${blogPost} h5, ${blogPost} h6`, {
  fontSize: theme.fontSizes[2],
  fontWeight: theme.fontWeights.bold,
});

globalStyle(`${blogPost} blockquote`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
  color: theme.colors.text,
  position: "relative",
  borderTop: "1px solid",
  borderBottom: "1px solid",
  marginTop: 32,
  marginBottom: 55,
});

globalStyle(`${blogPost} blockquote:after`, {
  position: "absolute",
  content: "”",
  fontSize: "10rem",
  lineHeight: 0,
  bottom: -40,
  right: 30,
});

globalStyle(`${blogPost} footer:before`, {
  content: "—",
});

globalStyle(`${blogPost} footer`, {
  fontSize: theme.fontSizes[3],
  fontStyle: "italic",
  paddingBottom: theme.space[4],
});
