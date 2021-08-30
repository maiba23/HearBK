import { combineReducers } from "redux";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import preferencesReducer from "./preferencesReducer";
import discoverReducer from "./discoverReducer";
import searchReducer from "./searchReducer";
import profileReducer from "./profileReducer";
import rateProFeedbackReducer from "./rateProFeedbackReducer";
import homeReducer from "./homeReducer";
import listemersReducer from "./listenersReducer";
import roomReducer from "./roomReducer";

export default combineReducers({
  userDetails: userReducer,
  orderDetails: orderReducer,
  preferences: preferencesReducer,
  discover: discoverReducer,
  search: searchReducer,
  profile: profileReducer,
  proFeedback: rateProFeedbackReducer,
  home: homeReducer,
  listeners: listemersReducer,
  roomDetails: roomReducer,
});
