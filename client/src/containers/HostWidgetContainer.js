import { connect } from "react-redux";
import { selectHost } from "../actions/filters";
import { fetchHosts } from "../actions/hosts";

import HostWidget from "../browse/HostWidget";

const mapStateToProps = state => ({
  hosts: structureHosts(state.entities.hosts)
});

const mapDispatchToProps = dispatch => ({
  selectHost: host => dispatch(selectHost(host)),
  fetchHosts: () => dispatch(fetchHosts())
});

const structureHosts = hosts => {
  if (!hosts.items.length) return [];

  const structuredHosts = groupHosts(
    "event_host",
    hosts.event_hosts,
    hosts.items
  );

  return restructureHostsData(hosts, structuredHosts);
};

const restructureHostsData = (hosts, originalStructure) => {
  const orgsIndex = originalStructure.findIndex(
    host => host.name === "Student Organizations"
  );
  const structuredOrgs = groupHosts(
    "org_type",
    hosts.org_types,
    originalStructure[orgsIndex].items
  );
  originalStructure[orgsIndex].items = structuredOrgs;

  const coaIndex = structuredOrgs.findIndex(
    host => host.name === "Council of Organizations of the Ateneo"
  );
  const structuredCoa = groupHosts(
    "cluster",
    hosts.clusters,
    structuredOrgs[coaIndex].items
  );
  originalStructure[orgsIndex].items[coaIndex].items = structuredCoa;

  return originalStructure;
}

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
