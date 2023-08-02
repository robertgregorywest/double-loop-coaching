import * as React from "react";
import { graphql } from "gatsby";
import { Text } from "./ui";
import * as styles from "./blog-content.css";

export default function BlogContent(props) {
  return (
    <Text
      className={styles.blogPost}
      dangerouslySetInnerHTML={{
        __html: props.html,
      }}
    />
  );
}

export const query = graphql`
  fragment BlogContentContent on BlogContent {
    id
    html
  }
`;
