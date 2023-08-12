import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import * as sections from "../../components/sections";
import Fallback from "../../components/fallback";
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../../components/ui";

import SEOHead from "../../components/head";

export default function BlogPost(props) {
  const { blogPost } = props.data;
  return (
    <Layout>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            {blogPost.heading}
          </Heading>
          <Space size={4} />
          {blogPost.author && (
            <Box center>
              <Flex>
                {blogPost.author.avatar && (
                  <Avatar
                    {...blogPost.author.avatar}
                    image={blogPost.author.avatar.gatsbyImageData}
                  />
                )}
                <Text variant="bold">{blogPost.author.name}</Text>
              </Flex>
            </Box>
          )}
          <Space size={4} />
          <Text center>{blogPost.date}</Text>
          <Space size={4} />
          {blogPost.header && (
            <GatsbyImage
              alt={blogPost.header.alt}
              image={blogPost.header.gatsbyImageData}
            />
          )}
          <Space size={5} />
          {blogPost.blocks.map((block) => {
            const { id, blocktype, ...componentProps } = block;
            const Component = sections[blocktype] || Fallback;
            return <Component key={id} {...componentProps} />;
          })}
        </Box>
      </Container>
    </Layout>
  );
}
export const Head = (props) => {
  const { blogPost } = props.data;
  return <SEOHead {...blogPost} />;
};
export const query = graphql`
  query blogPageContent($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      title
      slug
      description
      image {
        id
        url
      }
      heading
      header {
        id
        gatsbyImageData
        alt
      }
      author {
        name
        avatar {
          alt
          gatsbyImageData
          url
        }
      }
      blocks: content {
        id
        blocktype
        ...BlogContentContent
        ...BlogImageContent
        ...HomepageCtaContent
      }
    }
  }
`;
