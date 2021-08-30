import { toast } from "react-toastify";
import api, { authHeaders } from "../../config";

export const GET_TOP_LISTENERS = "GET_TOP_LISTENERS";
export const GET_SUGGESTED_LISTENERS = "GET_SUGGESTED_LISTENERS";
export const GET_LISTENER_ROLES_LIST = "GET_LISTENER_ROLES_LIST";
export const GET_INFLUENCERS = "GET_INFLUENCERS";

export const getTopListeners = (userName) => (dispatch) =>
  fetch(`${api}/listeners/topListners`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      toast.error("Failed to fetch top Listeners !!");
    })
    .then((data) => {
      dispatch({
        type: GET_TOP_LISTENERS,
        payload: data,
      });
    });

export const getSuggestedListeners = () => (dispatch) =>
  fetch(`${api}/listeners/suggested`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      toast.error("Failed to fetch top Listeners !!");
    })
    .then((data) => {
      dispatch({
        type: GET_SUGGESTED_LISTENERS,
        payload: data,
      });
    });

export const getInfluencers = (trackId = null) => (dispatch) =>
  fetch(`${api}/listeners/influencers${trackId ? "?trackId=" + trackId : ""}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      dispatch({
        type: GET_INFLUENCERS,
        payload: data,
      });
    });

export const getSearchedListeners = (text) => (dispatch) =>
  fetch(`${api}/listeners/search?searchQuery=${text}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      toast.error("Failed to fetch top Listeners !!");
    })
    .then((data) => {
      dispatch({
        type: GET_SUGGESTED_LISTENERS,
        payload: data,
      });
    });

const capitalizeFirstLetter = (string = "") => {
  if (string?.length > 1) {
    string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  } else if (!string.length) {
    string = string.charAt(0).toUpperCase();
  }

  return string;
};

export const getRoles = () => (dispatch) =>
  fetch(`${api}/listeners/roles/list`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data?.length) {
        data.forEach((roleData) => {
          roleData.name = capitalizeFirstLetter(roleData?.name || "");
        });
      }

      dispatch({
        type: GET_LISTENER_ROLES_LIST,
        payload: data,
      });
    });
