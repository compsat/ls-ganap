import React, { Component } from "react";

import AppHeading from "components/common/AppHeading";
import AppSubheading from "components/common/AppSubheading";
import PageContent from "components/common/PageContent";
import HorizontalScroller from "components/common/HorizontalScroller";
import CardsSection from "components/routes/home/CardsSection";
import HostCardContainer from "containers/home/HostCardContainer";

const OfficesCardsSection = CardsSection.extend`
  background-color: #dff2cb;
`;

const SectionHeading = AppHeading.withComponent("h2").extend`
  color: #7B8C69;
`;

const SectionSubheading = AppSubheading.withComponent("a").extend`
  display: inline-block;
  margin-bottom: 2rem;
  color: #404937;
  text-decoration: none;
`;

class OfficesSection extends Component {
  componentDidMount() {
    this.props.fetchOffices();
  }

  render() {
    return (
      <OfficesCardsSection>
        <PageContent>
          <SectionHeading size="6">Offices</SectionHeading>
          <SectionSubheading caps={true}>
            Browse Events by Office
          </SectionSubheading>
        </PageContent>
        <HorizontalScroller
          display={5}
          hasLoaded={
            this.props.offices.hasInitiatedFetch &&
            !this.props.offices.isFetching
          }
        >
          {this.props.offices.map(id => (
            <HostCardContainer hostType="offices" id={id} key={id} />
          ))}
        </HorizontalScroller>
      </OfficesCardsSection>
    );
  }
}

export default OfficesSection;
