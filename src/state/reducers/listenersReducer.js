import { GET_TOP_LISTENERS, GET_SUGGESTED_LISTENERS, GET_LISTENER_ROLES_LIST, GET_INFLUENCERS } from "../actions/listenerActions";

const initialState = {
  topListeners: [],
  suggestedListeners: [],
  influencers: [],
  rolesList: [],
};

const reducer = (state = initialState, action) => {
  const handlers = {
    [GET_TOP_LISTENERS]: (state, { payload }) => ({
      ...state,
      topListeners: payload
    }),
    [GET_SUGGESTED_LISTENERS]: (state, { payload }) => ({
      ...state,
      suggestedListeners: payload
    }),
    [GET_INFLUENCERS]: (state, { payload }) => ({
      ...state,
      influencers: payload
    }),
    [GET_LISTENER_ROLES_LIST]: (state, { payload }) => ({
      ...state,
      rolesList: payload
    })
  };

  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state;
};

export default reducer;
