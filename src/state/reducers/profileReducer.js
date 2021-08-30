import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_QUALIFYING_TRACK_SUCCESS,
  TOGGLE_DASHBOARD_PROFILE_VIEW,
} from "../actions/profileActions";

const initialState = {
  profileDetails: undefined,
  qualifyingTrack: undefined,
  showDashboardProfileView: false,
};

const reducer = (state = initialState, action) => {
  const handlers = {
    [GET_USER_PROFILE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileDetails: payload,
    }),
    [GET_USER_QUALIFYING_TRACK_SUCCESS]: (state, { payload }) => ({
      ...state,
      qualifyingTrack: payload,
    }),
    [TOGGLE_DASHBOARD_PROFILE_VIEW]: (state, { payload }) => ({
      ...state,
      showDashboardProfileView: payload,
    }),
  };

  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

export default reducer;
