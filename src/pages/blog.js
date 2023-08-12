import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../components/ui";
import SEOHead from "../components/head";

export default function Blog(props) {
  const { nodes: posts } = props.data.allBlogPost;
  const featuredPosts = posts.filter((p) => p.category === "Featured");
  // const regularPosts = posts.filter((p) => p.category !== "Featured");

  return (
    <Layout>
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">Blog</Heading>
          <FlexList variant="start" gap={0} gutter={3} responsive>
            {featuredPosts.map((post) => (
              <Box as="li" key={post.id} padding={3} width="half">
                <PostCard {...post} />
              </Box>
            ))}
          </FlexList>
        </Box>
        {/* <Box paddingY={4}>
          <Subhead>Older Posts</Subhead>
          <FlexList responsive wrap gap={0} gutter={3} variant="start">
            {regularPosts.map((post) => (
              <Box as="li" key={post.id} padding={3} width="third">
                <PostCardSmall {...post} />
              </Box>
            ))}
          </FlexList>
        </Box> */}
      </Container>
    </Layout>
  );
}

function PostCard({
  slug,
  header,
  heading,
  excerpt,
  author,
  category,
  ...props
}) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {header && (
        <>
          <GatsbyImage alt={header.alt} image={header.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {heading}
      </Subhead>
      <Text as="p">{excerpt}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )}
    </BlockLink>
  );
}

// function PostCardSmall({ slug, header, heading, category, ...props }) {
//   return (
//     <BlockLink {...props} to={`/blog/${slug}`}>
//       {header && (
//         <>
//           <GatsbyImage alt={header.alt} image={header.gatsbyImageData} />
//           <Space size={3} />
//         </>
//       )}
//       <Subhead>
//         <Kicker>{category}</Kicker>
//         {heading}
//       </Subhead>
//     </BlockLink>
//   );
// }

export const Head = () => {
  return <SEOHead title="Double Loop Coaching - Blog" />;
};

export const query = graphql`
  {
    allBlogPost {
      nodes {
        id
        slug
        title
        description
        heading
        excerpt
        category
        image {
          id
          gatsbyImageData
        }
        header {
          id
          gatsbyImageData
          alt
        }
      }
    }
  }
`;
