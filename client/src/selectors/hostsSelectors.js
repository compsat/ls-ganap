import { createSelector } from "reselect";

const getHostTypesItems = state => [
  {
    id: 1,
    name: "Student Organizations"
  },
  {
    id: 2,
    name: "Sanggunian"
  },
  {
    id: 3,
    name: "Offices"
  }
];
const getOrgTypesItems = state => state.entities.orgTypes.items;
const getClustersItems = state => state.entities.clusters.items;
const getOrgHostsItems = state => state.entities.hosts.orgHosts;
const getSangguHostsItems = state => state.entities.hosts.sangguHosts;
const getOfficeHostsItems = state => state.entities.hosts.officeHosts;

export const makeFlattenHostList = () => {
  return createSelector(
    [getOrgHostsItems, getSangguHostsItems, getOfficeHostsItems],
    (orgHosts, sangguHosts, officeHosts) => {
      return {
        ...orgHosts,
        ...sangguHosts,
        ...officeHosts
      };
    }
  );
};

const makeDecorateHostList = (selector, decoration) => {
  return createSelector(
    selector,
    selected =>
      Object.values(selected).map(item => Object.assign(item, decoration))
  );
};

export const makeStructureHosts = () => {
  return createSelector(
    [
      getHostTypesItems,
      getOrgTypesItems,
      getClustersItems,
      makeDecorateHostList(getOrgHostsItems, {
        host_type: 1,
        active: false
      }),
      makeDecorateHostList(getSangguHostsItems, {
        host_type: 2,
        active: false
      }),
      makeDecorateHostList(getOfficeHostsItems, {
        host_type: 3,
        active: false
      })
    ],
    (hostTypes, orgTypes, clusters, orgHosts, sangguHosts, officeHosts) => {
      orgTypes = Object.values(orgTypes);
      clusters = Object.values(clusters);
      orgHosts = Object.values(orgHosts);
      sangguHosts = Object.values(sangguHosts);
      officeHosts = Object.values(officeHosts);

      if (
        orgTypes.length === 0 ||
        clusters.length === 0 ||
        orgHosts.length === 0
      ) {
        return [];
      }

      const clusterMap = makeMapByProp(orgHosts, "cluster");
      const structuredClusters = clusters.map(cluster => {
        cluster["items"] = clusterMap[cluster.id];
        cluster["org_type"] = 1;
        return cluster;
      });

      const orgTypeMap = makeMapByProp(
        [
          ...orgHosts.filter(orgHost => typeof orgHost.cluster === undefined),
          ...structuredClusters
        ],
        "org_type"
      );
      const structuredOrgs = orgTypes.map(orgType => {
        orgType["items"] = orgTypeMap[orgType.id];
        orgType["host_type"] = 1;
        return orgType;
      });

      const hostTypeMap = makeMapByProp(
        [...structuredOrgs, ...sangguHosts, ...officeHosts],
        "host_type"
      );

      const structuredHosts = hostTypes.map(hostType => {
        hostType["items"] = hostTypeMap[hostType.id];
        return hostType;
      });

      return structuredHosts;
    }
  );
};

const makeMapByProp = (list, prop) => {
  return list.reduce((map, item) => {
    if (item[prop]) {
      const mapList = map[item[prop]];
      map[item[prop]] = mapList ? [...mapList, item] : [item];
    }
    return map;
  }, {});
};
