import React from "react";

import EventsSectionContainer from "containers/home/EventsSectionContainer";
import FeaturedSectionContainer from "containers/home/FeaturedSectionContainer";
import OfficesSectionContainer from "containers/home/OfficesSectionContainer";
import OrgsSectionContainer from "containers/home/OrgsSectionContainer";

const Home = () => (
  <main>
    <FeaturedSectionContainer />
    <EventsSectionContainer />
    <OrgsSectionContainer />
    <OfficesSectionContainer />
  </main>
);

export default Home;
