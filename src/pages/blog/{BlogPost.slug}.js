import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../../components/ui";
import * as styles from "./blog-post.css";
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
          <div
            className={styles.blogPost}
            dangerouslySetInnerHTML={{
              __html: blogPost.html,
            }}
          />
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
      html
    }
  }
`;
