import { connect } from "react-redux";
import { format } from "date-fns";

import BrowseView from "../browse/BrowseView";
import { fetchEvents } from "../actions/events";
import { fetchVenues } from "../actions/venues";

const mapStateToProps = state => ({
  entities: state.entities,
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: ({
    host,
    tags,
    dateRange,
    query,
    page
  }) => {
    let params = {};

    params = withParam(host, params, (newParams) => {
      if (host.hostGroupId) {
        newParams["host_query"] = host.hostGroupId;
      } else {
        newParams["host"] = host.id;
      }

      return newParams;
    });
    params = withParam(tags, params, (newParams) => ({
      ...newParams,
      tags,
    }));
    params = withParam(dateRange, params, (newParams) => {
      if (dateRange.startDate) {
        newParams["start_date"] = format(dateRange.startDate, "YYYY-MM-DD");
      }

      if (dateRange.endDate) {
        newParams["end_date"] = format(dateRange.endDate, "YYYY-MM-DD");
      }

      return newParams;
    });
    params = withParam(query, params, (newParams) => ({
      ...newParams,
      search: query,
    }));
    params = withParam(page, params, (newParams) => ({
      ...newParams,
      page,
    }));

    dispatch(fetchEvents(params))
  },
  fetchVenues: () => dispatch(fetchVenues())
});

const withParam = (param, paramsObject, callback) => {
  paramsObject = { ...paramsObject };

  if (!param) {
    return paramsObject;
  } else {
    return callback(paramsObject);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseView);
