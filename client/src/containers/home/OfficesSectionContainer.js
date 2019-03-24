import { connect } from "react-redux";

import { fetchOffices } from "actions/offices";
import { selectHost } from "actions/filters";
import OfficesSection from "components/routes/home/OfficesSection";

const mapStateToProps = state => ({
  offices: state.domainData.offices.result
});

const mapDispatchToProps = dispatch => ({
  fetchOffices: () => {
    for (let i = 1; i < 4; i++) {
      dispatch(fetchOffices(i));
    }
  },
  selectHost: (host) => dispatch(selectHost(host))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficesSection);
