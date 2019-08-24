import {
  POST_EVENT_REQUEST,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  PUT_EVENT_REQUEST,
  PUT_EVENT_SUCCESS,
  PUT_EVENT_FAILURE
} from "actions/eventsCreateEdit";

const eventsCreateEdit = (
  state = {
    hasInitiatedPost: false,
    isPosting: false,
    failedToPost: false,
    hasInitiatedPut: false,
    isPutting: false,
    failedToPut: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case POST_EVENT_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedPost: true,
        isPosting: true
      });
    case POST_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        result: action.event
      });
    case POST_EVENT_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        failedToPost: true
      });
    case PUT_EVENT_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedPut: true,
        isPutting: true
      });
    case PUT_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isPutting: false,
        result: action.event
      });
    case PUT_EVENT_FAILURE:
      return Object.assign({}, state, {
        isPutting: false,
        failedToPut: true
      });
    default:
      return state;
  }
};

export default eventsCreateEdit;
