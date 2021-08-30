import api, { authHeaders } from "../../config";

const getAllRoomURI = "/rooms/all";
export const GET_ALL_ROOM = "GET_ALL_ROOM";
export const SET_ALL_ROOM = "SET_ALL_ROOM";

export const getAllRooms = () => (dispatch) =>
  fetch(`${api}${getAllRoomURI}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((requestData) => {
      dispatch({
        type: SET_ALL_ROOM,
        payload: requestData,
      });
    });

export const getRoomPreview = (roomId) => (dispatch) =>
  fetch(`${api}/rooms/event/${roomId}`, { method: "GET" })
    .then(res => res.json());

export const roomSubscription = (roomId, subscribe) => (dispatch) =>
  fetch(`${api}/rooms/${roomId}/subscription`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ subscribe })
    }
  );
