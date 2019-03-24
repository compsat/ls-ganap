import React, { Component } from "react";

import AppHeading from "components/common/AppHeading";
import AppSubheading from "components/common/AppSubheading";
import PageContent from "components/common/PageContent";
import HorizontalScroller from "components/common/HorizontalScroller";
import CardsSection from "components/routes/home/CardsSection";
import HostCardContainer from "containers/home/HostCardContainer";

import styled from "styled-components";
import { Link } from "react-router-dom";

const OrgsCardsSection = CardsSection.extend`
  background-color: #ffe5cb;
`;

const SectionHeading = AppHeading.withComponent("h2").extend`
  color: #E09850;
`;

const SectionSubheading = AppSubheading.withComponent("a").extend`
  margin-bottom: 2rem;
  color: #7E6A56;
  text-decoration: none;
`;

const AppCardLink = ({ className, route, children, onClick }) => (
  <Link className={className} to={route} onClick={onClick}>
    {children}
  </Link>
);

const StyledAppCardLink = styled(AppCardLink)`
  text-decoration: none;
  color: black;
`;

class OrgsSection extends Component {
  componentDidMount() {
    this.props.fetchClusters();
  }

  render() {
    return (
      <OrgsCardsSection>
        <PageContent>
          <SectionHeading size="6" align="right">
            Organizations
          </SectionHeading>
          <SectionSubheading caps={true} align="right">
            Browse Events by Organization
          </SectionSubheading>
        </PageContent>
        <HorizontalScroller
          display={5}
          hasLoaded={
            this.props.clusters.hasInitiatedFetch &&
            !this.props.clusters.isFetching
          }
        >
          {this.props.clusters.map(id => (
            <HostCardContainer hostType="clusters" id={id} key={id} />
          ))}
        </HorizontalScroller>
      </OrgsCardsSection>
    );
  }
}

export default OrgsSection;
