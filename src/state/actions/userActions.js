import history from "../../history";
import api, { genericHeaders, authHeaders, magicLinkHeader } from "../../config";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import { identifyMixpanel, setPeopleMixpanel } from "../../mixpanel";
import { axiosInstance } from "../../../src/utils/axiosInstance";
import LogRocket from "logrocket";

import Axios from "axios";
const postRegisterUserURI = "/users/register";
const postAuthenticateUserURI = "/users/authenticate";
const postPreferencesURI = "/users/details";
const postAddHeadlineURI = "/users/headline";
const getOrderHistoryUrl = "/orders/history";
const getUserDetailsURI = "/users/details";
const uploadDisplayPicURI = "/users/upload/profile-image";
const addSendPulseEmailURI = "/users/addSendpulseEmail";
const getPaymentMethodURI = "/users/payment-methods";
const getTokenDetailsURI = "/users/token";
const deleteSubscriptionURI = "/users/subscription";
const forgotPasswordURI = "/users/forgot-password";
const resetPasswordURI = "/users/reset-password";
const verificationSmsURI = "/users/verification-sms";
const authenticatePhoneURI = "/users/authenticate/phone";
const phoneVerifyURI = "/users/authenticate/phone/verify";
const verifyOtpURI = "/users/verify-otp";
const authenticateMagicURI = "/users/authenticate/magic-link";
const promoVerificationURI = "/orders/verify/promo-code";
const userTrackStats = "/tracks/stats";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS";
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS";
export const GET_USER_DETAILS_FAILURE = "GET_USER_DETAILS_FAILURE";
export const GET_USER_PAYMENT_METHODS_SUCCESS = "GET_USER_PAYMENT_METHODS_SUCCESS";

export const REMOVE_USER_PAYMENT_METHOD = "REMOVE_USER_PAYMENT_METHOD";
export const SET_USER_TRACKS_STATS = "SET_USER_TRACKS_STATS";

export const SET_USER_SUBSCRIPTION = "SET_USER_SUBSCRIPTION";



export const registerUserAction = (requestData) => (dispatch) => {
  return Axios.post(`${api}${postRegisterUserURI}`, requestData);
};

export const authenticateUser = (requestData) => (dispatch) =>
  fetch(`${api}${postAuthenticateUserURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("Login failed ! Please check credentials!!");
        return undefined;
      }
    })
    .then((data) => {
      if (data) {
        const { token, isFirstUserLogin, isPremiumUser, expireTime = 3600000 } = data;
        localStorage.setItem("x-access-token", token);
        localStorage.setItem("access-token-verified", "true");
        if (isPremiumUser) {
          localStorage.setItem("isPremiumUser", String(isPremiumUser));
        }
        if (isFirstUserLogin) {
          localStorage.setItem("isFirstUserLogin", String(isFirstUserLogin));
        }

        setTimeout(() => history.push(isFirstUserLogin ? "/welcome" : "/home"), 2000);
        dispatch({ type: AUTHENTICATE_USER_SUCCESS, payload: token });
      }
    });

export const uploadUserProfile = (fileToUpload, id) => {
  const formData = new FormData();
  formData.append("profileImage", fileToUpload);
  return fetch(`${api}${uploadDisplayPicURI}/${id}`, {
    method: "POST",
    body: formData,
  });
};
export const addSendPulseEmail = (email) => {
  const payload = { email: email };
  return fetch(`${api}${addSendPulseEmailURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(payload),
  });
};

export const sendVerificationSMS = (phoneNumber) => {
  const payload = { phoneNumber: phoneNumber };
  return fetch(`${api}${verificationSmsURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(payload),
  });
};

export const authenticatePhone = (phone) => {
  return fetch(`${api}${authenticatePhoneURI}?phone=${phone}`, {
    method: "POST",
    headers: genericHeaders(),
  });
};


export const phoneVerification = (data) => {
  return axiosInstance.post(`${api}${phoneVerifyURI}`, data);
};

export const verifyOtp = (phoneNumber, Otp) => {
  const payload = { phoneNumber: phoneNumber, OTP: Otp };
  return fetch(`${api}${verifyOtpURI}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const phoneAuthenticationVerify = (payload) => {
  return fetch(`${api}${verifyOtpURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res);
  });
};

export const authenticateMagicLink = (token) => {
  return fetch(`${api}${authenticateMagicURI}`, {
    method: "POST",
    headers: magicLinkHeader(token),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        const { token, isFirstUserLogin, isPremiumUser } = data;
        localStorage.setItem("x-access-token", token);
        localStorage.setItem("access-token-verified", "true");
        if (isPremiumUser) {
          localStorage.setItem("isPremiumUser", String(isPremiumUser));
        }
        if (isFirstUserLogin) {
          localStorage.setItem("isFirstUserLogin", String(isFirstUserLogin));
        }
        history.push(isFirstUserLogin ? "/connectNumber" : "/home");
      }
    });
};

export const postListenerPreferences = (payload, path = "/onboarding-complete") => (dispatch) => {
  const requestHeaders = authHeaders();
  return fetch(`${api}${postPreferencesURI}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      dispatch(getUserDetails());
      localStorage.removeItem("isFirstUserLogin");
      toast.success("Changes saved successfully !!!");
      history.push(path);
    } else {
      toast.error("Failed to save changes !!!");
    }
  });
};

export const getOrderHistory = () => (dispatch) =>
  fetch(`${api}${getOrderHistoryUrl}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((requestData) => {
      dispatch({
        type: GET_HISTORY_SUCCESS,
        payload: requestData,
      });
    });

const oneSignalSubscription = async (resp) => {
  try {
    await window?.OneSignal?.setExternalUserId(resp?._id);
    await window?.OneSignal?.setEmail(resp?.email);
    await window?.OneSignal?.sendTag("name", resp?.display_name);
  } catch (err) {}
};

const addLogRocket = (resp) => {
  LogRocket.identify(resp._id, {
    name: resp.display_name,
    email: resp.email,
    subscriptionType: resp.premiumSubscriptionId ? "PRO" : "BASIC",
  });
};

export const getUserDetails = (refreshingUserData = false, updateToOnesignal = false, addLogRocketCond = false) => (dispatch, getState) => {
  const state = getState();
  if (isEmpty(state?.userDetails?.user) || refreshingUserData) {
    fetch(`${api}${getUserDetailsURI}`, {
      method: "GET",
      headers: authHeaders(),
    })
      .then(async (res) => {
        if (res.ok) {
          const resp = await res.json();
          if (updateToOnesignal) {
            oneSignalSubscription(resp);
          }
          if (addLogRocketCond) {
            addLogRocket(resp);
          }
          identifyMixpanel(resp?._id);
          setPeopleMixpanel({ email: resp?.email, name: resp?.display_name, username: resp?.user_name });
          return resp;
        }
        console.log(res);
      })
      .then((requestData) => {
        dispatch({
          type: GET_USER_DETAILS_SUCCESS,
          payload: requestData,
        });
      });
  }
};

// update user details action starts here

export const updateUserData = (payload, refreshingUserData) => (dispatch) =>
  fetch(`${api}${postPreferencesURI}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      dispatch(getUserDetails(refreshingUserData));
      return res;
    }
    if (res.status === 409) {
      toast.error("User Name already exist");
    } else {
      toast.error("Failed to save changes !!!");
    }
  });

// ends here

export const addUserHeadline = (payload) => (dispatch) =>
  fetch(`${api}${postAddHeadlineURI}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
  });

export const getPaymentMethods = () => (dispatch) =>
  fetch(`${api}${getPaymentMethodURI}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) =>
      dispatch({
        type: GET_USER_PAYMENT_METHODS_SUCCESS,
        payload: data,
      })
    );

export const addPaymentMethods = (payload) => (dispatch) =>
  fetch(`${api}${getPaymentMethodURI}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });

export const deletePaymentMethod = (paymentInfo) => (dispatch) => {
  return fetch(`${api}${getPaymentMethodURI}`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify(paymentInfo),
  }).then((res) => {
    if (res.ok) {
      dispatch(getPaymentMethods());
    }
  });
};

export const getTokenDetails = (token) =>
  fetch(`${api}${getTokenDetailsURI}`, {
    method: "GET",
    headers: authHeaders(),
  });

export const setUserSubscription = (condition) => ({
  type: SET_USER_SUBSCRIPTION,
  payload: condition,
});

export const cancelUserPremiumSubscription = () =>
  fetch(`${api}${deleteSubscriptionURI}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then(async (res) => {
    if (res.ok) {
      return res;
    } else {
      toast.error("Failed to cancel your subscription");
    }
  });

export const forgotPassword = (email) =>
  fetch(`${api}${forgotPasswordURI}?email=${email}`, {
    method: "POST",
  });

export const resetPassword = (payload) =>
  fetch(`${api}${resetPasswordURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(payload),
  });

export const updateTrackInfo = (trackId, payload) =>
  fetch(`${api}/tracks/${trackId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

export const getUserTrackStats = () => (dispatch) =>
  fetch(`${api}${userTrackStats}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) =>
      dispatch({
        type: SET_USER_TRACKS_STATS,
        payload: data,
      })
    );

    export const verifyPromoCode = (promoCode) => {
      return fetch(`${api}${promoVerificationURI}?promoCode=${promoCode}`, {
        method: "POST",
        headers: authHeaders(),
      });
    };