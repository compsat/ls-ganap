import { connect } from "react-redux";

import { fetchEventsSingle } from "actions/eventsSingle";
import EventDetailSection from "components/routes/event/EventDetailSection";

const mapStateToProps = state => ({
	eventsSingle: state.domainData.eventsSingle.result,
	canDisplayEvents:
		(state.domainData.hosts.officeHosts ||
			state.domainData.hosts.orgHosts ||
			state.domainData.hosts.sangguHosts) &&
		state.domainData.venues.result
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchEventsSingle: () =>
		dispatch(fetchEventsSingle(ownProps.match.params.id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventDetailSection);
