export const SELECT_HOST = "SELECT_HOST";
export const selectHost = host => ({
  type: SELECT_HOST,
  host: buildHostObject(host)
});

export const SELECT_AUDIENCE = "SELECT_AUDIENCE";
export const selectAudience = audience => ({
  type: SELECT_AUDIENCE,
  audience
});

export const TOGGLE_TAG = "TOGGLE_TAG";
export const toggleTag = tagId => ({
  type: TOGGLE_TAG,
  id: tagId
});

export const SET_DATE_RANGE = "SET_DATE_RANGE";
export const setDateRange = dateRange => ({
  type: SET_DATE_RANGE,
  dateRange
});

export const UPDATE_QUERY = "UPDATE_QUERY";
export const updateQuery = query => ({
  type: UPDATE_QUERY,
  query
});

const buildHostObject = host => {
  const nameToHostGroupIdMap = {
    Sanggunian: 1,
    Offices: 2,
    "Student Organizations": 3,
    "Confederation of Publications": 4,
    "Council of Organizations of the Ateneo": 5,
    "Analysis & Discourse Cluster": 6,
    "Business Cluster": 7,
    "Faith Formation Cluster": 8,
    "Health & Environment Cluster": 9,
    "Intercultural Relations Cluster": 10,
    "Media & The Creative Arts Cluster": 11,
    "Performing Arts Cluster": 12,
    "Sector-Based Cluster": 13,
    "Science & Technology Cluster": 14
  };

  return {
    name: host.name,
    hostGroupId: nameToHostGroupIdMap[host.name],
    id: host.id,
    abbreviation: host.abbreviation
  };
};
