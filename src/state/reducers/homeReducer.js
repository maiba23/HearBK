import {
  GET_ACTIVITY_SUCCESS,
  SET_OPEN_PROFILE,
  SET_SELECTED_PROFILE,
  GET_LATEST_ACTIVITY,
  SET_OPEN_REQUEST_REVIEW,
  SET_OPEN_REQUEST_REVIEW_PAYMENT,
  SET_OPEN_REGISTER,
  SET_SELECTED_TRACK,
} from "../actions/homeAction";

const initialState = {
  activities: [],
  openProfile: false,
  openRequestReview: false,
  openRequestReviewPayment: false,
  selectedUserProfile: {},
  latest_activity: [],
  openRegister: false,
  selectedTrack: null,
};

const reducer = (state = initialState, { type, payload }) => {
  const handlers = {
    [GET_ACTIVITY_SUCCESS]: { ...state, activities: payload },
    [SET_OPEN_PROFILE]: { ...state, openProfile: payload },
    [SET_SELECTED_PROFILE]: { ...state, selectedUserProfile: payload },
    [GET_LATEST_ACTIVITY]: { ...state, latest_activity: payload },
    [SET_OPEN_REQUEST_REVIEW]: { ...state, openRequestReview: payload },
    [SET_SELECTED_TRACK]: { ...state, selectedTrack: payload },
    [SET_OPEN_REQUEST_REVIEW_PAYMENT]: { ...state, openRequestReviewPayment: payload },
    [SET_OPEN_REGISTER]: { ...state, openRegister: payload },
  };
  return handlers[type] || state;
};

export default reducer;
