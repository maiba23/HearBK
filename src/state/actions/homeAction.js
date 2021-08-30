import api, { genericHeaders, authHeaders } from "../../config";

const getActivityUrl = "/activities";

export const GET_ACTIVITY_SUCCESS = "GET_ACTIVITY_SUCCESS";
export const GET_LATEST_ACTIVITY = "GET_LATEST_ACTIVITY";

export const SET_OPEN_PROFILE = "SET_OPEN_PROFILE";
export const SET_OPEN_REQUEST_REVIEW = "SET_OPEN_REQUEST_REVIEW";
export const SET_OPEN_REQUEST_REVIEW_PAYMENT = "SET_OPEN_REQUEST_REVIEW_PAYMENT";
export const SET_SELECTED_PROFILE = "SET_SELECTED_PROFILE";
export const SET_OPEN_REGISTER = "SET_OPEN_REGISTER";
export const SET_SELECTED_TRACK = "SET_SELECTED_TRACK";

export const getActivities = () => (dispatch) =>
  fetch(`${api}${getActivityUrl}`, {
    method: "GET",
    headers: genericHeaders(),
  })
    .then((res) => res.json())
    .then((requestData) => {
      dispatch({
        type: GET_ACTIVITY_SUCCESS,
        payload: requestData,
      });
    });

export const GetLatestActivities = (queryParam = null) => (dispatch) => {
  return fetch(`${api}/activities/?ids=${queryParam}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((requestData) => {
      dispatch({
        type: GET_LATEST_ACTIVITY,
        payload: requestData,
      });
    });
};

export const getSelectedTrack = (trackId) => (dispatch) => {
  return fetch(`${api}/tracks/${trackId}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((requestData) => {
      dispatch({
        type: SET_SELECTED_TRACK,
        payload: requestData,
      });
    });
};

export const clearSelectedTrack = () => ({
  type: SET_SELECTED_TRACK,
  payload: null,
});

export const setOpenProfileDispatch = (condition) => ({
  type: SET_OPEN_PROFILE,
  payload: condition,
});

export const setSelectedProfile = (userData) => ({
  type: SET_SELECTED_PROFILE,
  payload: userData,
});

export const setOpenRequestReviewDispatch = (condition) => ({
  type: SET_OPEN_REQUEST_REVIEW,
  payload: condition,
});

export const setOpenRequestReviewPaymentDispatch = (condition) => ({
  type: SET_OPEN_REQUEST_REVIEW_PAYMENT,
  payload: condition,
});

export const setOpenRegisterDispatch = (condition) => ({
  type: SET_OPEN_REGISTER,
  payload: condition,
});
