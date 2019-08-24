import axios from "axios";
import { normalize } from "normalizr";

import { fetchTags } from "actions/tags";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import { addEntityEvents } from "actions/entities";
import event from "entities/events";

export const POST_EVENT_REQUEST = "POST_EVENT_REQUEST";
export const postEventRequest = () => ({
  type: POST_EVENT_REQUEST
});

export const POST_EVENT_SUCCESS = "POST_EVENT_SUCCESS";
export const postEventSuccess = (event) => ({
  type: POST_EVENT_SUCCESS,
  event
});

export const POST_EVENT_FAILURE = "POST_EVENT_FAILURE";
export const postEventFailure = () => ({
  type: POST_EVENT_FAILURE
});

export const postEvent = (
  name,
  audience,
  description,
  tags,
  poster_url,
  hosts,
  event_logistics,
  history
) => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchTags());
    dispatch(postEventRequest());

    return axios
      .post("/events/", {
        name,
        audience,
        description,
        tags,
        poster_url,
        hosts,
        event_logistics
      })
      .then(response => {
        const payload = response.data;
        const normalizedData = normalize({ payload }, [event]);
        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(postEventSuccess(normalizedData.result[0]));

        history.push("/dashboard");
      })
      .catch(error => {
        dispatch(postEventFailure());
      });
  };
};

export const PUT_EVENT_REQUEST = "PUT_EVENT_REQUEST";
export const putEventRequest = () => ({
  type: PUT_EVENT_REQUEST
});

export const PUT_EVENT_SUCCESS = "PUT_EVENT_SUCCESS";
export const putEventSuccess = (event) => ({
  type: PUT_EVENT_SUCCESS,
  event
});

export const PUT_EVENT_FAILURE = "PUT_EVENT_FAILURE";
export const putEventFailure = () => ({
  type: PUT_EVENT_FAILURE
});

export const putEvent = (
  eventId,
  name,
  audience,
  description,
  tags,
  poster_url,
  hosts,
  event_logistics,
  history
) => {
  return (dispatch, getState) => {
    const {
      domainData: { eventsCreateEdit }
    } = getState();

    if (!eventsCreateEdit.hasInitiatedPut || eventsCreateEdit.failedToPut) {
      dispatch(fetchHosts());
      dispatch(fetchVenues());
      dispatch(fetchTags());
      dispatch(putEventRequest());

      // const {
      //   domainData: { tags: domainTags }
      // } = getState();

      // console.log(domainTags);

      // while((!domainTags.hasInitiatedFetch || domainTags.failedToFetch) || (domainTags.isPosting)) {}

      // if(!tags.hasInitiatedFetch || tags.failedToFetch ) {
      // const {
      //   entities: { tags }
      // } = getState();

      // const stateTagsValues = Object.values(tags);

      // console.log(stateTagsValues);

      // const oldTags = eventTags.filter(tag => !isNaN(tag));
      // const newTags = eventTags.filter(tag => isNaN(tag)).map(tag => stateTagsValues.find(obj => obj.name == tag).id);

      // const finalTags = oldTags.concat(newTags);

      return axios
        .put(`${process.env.REACT_APP_API_URL}/events/${eventId}/`, {
          name,
          audience,
          description,
          tags,
          // tags: finalTags,
          poster_url,
          hosts,
          event_logistics
        })
        .then(response => {
          const payload = response.data;
          const normalizedData = normalize({ payload }, [event]);
          dispatch(putEventSuccess(normalizedData.result[0]));
          history.push("/dashboard");
        })
        .catch(error => {
          dispatch(putEventFailure());
        });
      // }
    }
  };
};