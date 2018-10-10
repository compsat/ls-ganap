import { connect } from "react-redux";
import { selectHost, fetchHosts } from "../actions/hosts";

import HostWidget from "../browse/HostWidget";

const mapStateToProps = state => ({
  hosts: structureHosts(state.hosts)
});

const mapDispatchToProps = dispatch => ({
  selectHost: hostName => dispatch(selectHost(hostName)),
  fetchHosts: () => dispatch(fetchHosts())
});

const structureHosts = hosts => {
  if (!hosts.items.length) return [];

  const structuredHosts = groupHosts(
    "event_host",
    hosts.event_hosts,
    hosts.items
  );
  
  const orgsIndex = structuredHosts.findIndex(
    host => host.name === "Student Organizations"
  );
  const structuredOrgs = groupHosts(
    "org_type",
    hosts.org_types,
    structuredHosts[orgsIndex].items
  );
  structuredHosts[orgsIndex].items = structuredOrgs;

  const coaIndex = structuredOrgs.findIndex(
    host => host.name === "Council of Organizations of the Ateneo"
  );
  const structuredCoa = groupHosts(
    "cluster",
    hosts.clusters,
    structuredOrgs[coaIndex].items
  );
  structuredHosts[orgsIndex].items[coaIndex].items = structuredCoa;

  return structuredHosts;
};

const groupHosts = (hostKey, hosts, items) => {
  return items.reduce((current, item) => {
    const hostGroup = current.find(host => host.id === item[hostKey]);
    const hostName = hosts.find(host => host.id === item[hostKey]).name;

    hostGroup
      ? hostGroup.items.push(item)
      : current.push({
          id: item[hostKey],
          name: hostName,
          items: [item]
        });

    return current;
  }, []);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostWidget);
