import { connect } from "react-redux";

import { fetchOffices } from "actions/offices";
import OfficesSection from "components/routes/home/OfficesSection";

const mapStateToProps = state => ({
  offices: state.domainData.offices.result
});

const mapDispatchToProps = dispatch => ({
  fetchOffices: () => {
    for (let i = 1; i < 4; i++) {
      dispatch(fetchOffices(i));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficesSection);
