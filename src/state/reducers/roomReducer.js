import { SET_ALL_ROOM } from "../actions/roomActions";

const initialState = {
  allRooms: [],
};

const reducer = (state = initialState, { type, payload }) => {
  const handlers = {
    [SET_ALL_ROOM]: { ...state, allRooms: payload },
  };
  return handlers[type] || state;
};

export default reducer;
