import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container } from "./ui";

export default function BlogImage(props) {
  return (
    <Container width="tight">
      <GatsbyImage
        alt={props.image.alt}
        image={getImage(props.image.gatsbyImageData)}
      />
    </Container>
  );
}

export const query = graphql`
  fragment BlogImageContent on BlogImage {
    id
    image {
      id
      gatsbyImageData
      alt
    }
  }
`;
