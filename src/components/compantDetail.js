import * as React from "react";
import { graphql } from "gatsby";
import { Container, Section, Box, Heading, Text, Space } from "./ui";

export default function CompanyDetail(props) {
  return (
    <Section>
      <Container width="tight">
        <Box center>
          <Heading>{props.organisationName}</Heading>
        </Box>
        <Space size={5} />
        <Box center>
          <Text as="p" variant="heroText">
            {props.addressLineOne}
            <br />
            {props.addressLineTwo}
            <br />
            {props.addressTown}
            <br />
            {props.addressPostcode}
          </Text>
          <Text as="p" variant="heroText">
            Company number: {props.companyNumber}
            <br />
            VAT number: {props.vatNumber}
          </Text>
        </Box>
      </Container>
    </Section>
  );
}

export const query = graphql`
  fragment CompanyDetailContent on CompanyDetail {
    id
    organisationName
    addressLineOne
    addressLineTwo
    addressPostcode
    addressTown
    companyNumber
    vatNumber
  }
`;
