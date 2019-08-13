import { connect } from "react-redux";
import { format } from "date-fns";

import { fetchEventsBrowse } from "actions/eventsBrowse";
import Browse from "components/routes/browse/Browse";

const mapStateToProps = state => ({
  eventsBrowse: state.domainData.eventsBrowse,
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  ),
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  fetchEventsBrowse: ({ host, tags, audience, dateRange, query, page }) => {
    let params = {};

    params = withParam(host, params, newParams => {
      if (host.hostGroupId) {
        newParams["host_query"] = host.hostGroupId;
      } else {
        newParams["host"] = host.id;
      }

      return newParams;
    });
    params = withParam(tags, params, newParams => ({
      ...newParams,
      tags
    }));
    params = withParam(dateRange, params, newParams => {
      if (dateRange.startDate) {
        newParams["start_date"] = format(dateRange.startDate, "YYYY-MM-DD");
      }

      if (dateRange.endDate) {
        newParams["end_date"] = format(dateRange.endDate, "YYYY-MM-DD");
      }

      return newParams;
    });
    params = withParam(audience, params, newParams => ({
      ...newParams,
      audience
    }));
    params = withParam(query, params, newParams => ({
      ...newParams,
      search: query
    }));
    params = withParam(page, params, newParams => ({
      ...newParams,
      page
    }));

    dispatch(fetchEventsBrowse(params));
  }
});

const withParam = (param, paramsObject, callback) => {
  paramsObject = { ...paramsObject };

  if (!param) {
    return paramsObject;
  } else {
    return callback(paramsObject);
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
