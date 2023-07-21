import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Facebook, Twitter, Instagram, Linkedin } from "react-feather";
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Subhead,
  Text,
  IconLink,
  VisuallyHidden,
} from "./ui";
import CookieNotice from "./cookie-banner";

const socialMedia = {
  FACEBOOK: {
    url: "https://facebook.com",
    name: "Facebook",
    icon: <Facebook />,
  },
  TWITTER: {
    url: "https://facebook.com",
    name: "Twitter",
    icon: <Twitter />,
  },
  INSTAGRAM: {
    url: "https://instagram.com",
    name: "Instagram",
    icon: <Instagram />,
  },
  LINKEDIN: {
    url: "https://linkedin.com",
    name: "LinkedIn",
    icon: <Linkedin />,
  },
};

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url;
  if (!domain) return false;
  return `${domain}/${username}`;
};

const getSocialIcon = ({ service }) => {
  return socialMedia[service]?.icon;
};

const getSocialName = ({ service }) => {
  return socialMedia[service]?.name;
};

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      layout {
        footer {
          id
          links {
            id
            href
            text
          }
          meta {
            id
            href
            text
          }
          copyright
          socialLinks {
            id
            service
            username
          }
        }
      }
    }
  `);

  const { links, meta, socialLinks, copyright } = data.layout.footer;

  return (
    <Box as="footer" paddingY={4}>
      <Container>
        <Flex variant="start" responsive>
          <Space />
          <FlexList>
            {socialLinks &&
              socialLinks.map((link) => {
                const url = getSocialURL(link);
                return (
                  url && (
                    <li key={link.id}>
                      <IconLink to={url}>
                        <VisuallyHidden>{getSocialName(link)}</VisuallyHidden>
                        {getSocialIcon(link)}
                      </IconLink>
                    </li>
                  )
                );
              })}
          </FlexList>
        </Flex>
        <Space size={5} />
        <Flex variant="start" responsive>
          <FlexList variant="start" responsive>
            {links &&
              links.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>{link.text}</NavLink>
                </li>
              ))}
          </FlexList>
          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>
                    <Text variant="small">{link.text}</Text>
                  </NavLink>
                </li>
              ))}
          </FlexList>
          <Text variant="small">{copyright}</Text>
        </Flex>
      </Container>
      <Space size={3} />
      <CookieNotice>
        <Subhead>This website uses cookies</Subhead>
        <Text as="p" variant="body">
          We use cookies to improve the performance of our site, analyse our
          traffic and measure the success of our advertising campaigns.
        </Text>
      </CookieNotice>
    </Box>
  );
}
