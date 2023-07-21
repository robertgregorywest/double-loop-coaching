import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as sections from "../components/sections";
import Fallback from "../components/fallback";
import SEOHead from "../components/head";

export default function Service(props) {
  const { servicePage } = props.data;

  return (
    <Layout>
      {servicePage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block;
        const Component = sections[blocktype] || Fallback;
        return <Component key={id} {...componentProps} />;
      })}
    </Layout>
  );
}
export const Head = (props) => {
  const { servicePage } = props.data;
  return <SEOHead {...servicePage} />;
};
export const query = graphql`
  query servicePage($id: String!) {
    servicePage(id: { eq: $id }) {
      id
      slug
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...AboutHeroContent
        ...AboutStatListContent
        ...HomepageProductListContent
        ...AboutLeadershipContent
        ...HomepageBenefitListContent
        ...AboutLogoListContent
        ...HomepageCtaContent
      }
    }
  }
`;
