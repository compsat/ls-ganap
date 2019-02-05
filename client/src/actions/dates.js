import { fetchEvents } from "./events";

export const selectDateRange = dateRange => {
  return dispatch => {
    let url = "/events";

    switch (dateRange) {
      case "All":
        return;
      case "Today":
        url += "/on/";
        break;
      case "This Week":
        url += "/week/";
        break;
      case "This Month":
        url += "/month/";
        break;
    }

    url += new Date().toISOString().split("T")[0];

    dispatch(fetchEvents({
      path: url,
      params: {
        page: 1
      }
    }));
  };
};
