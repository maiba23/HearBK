import api, { authHeaders, genericHeaders } from "../../config";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosInstance";
export const UPDATE_DATA = "UPDATE_DATA";
export const UPDATE_TRACK_DETAILS = "UPDATE_TRACK_DETAILS";
export const ADD_ANOTHER_TRACK = "ADD_ANOTHER_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RESET_STATE = "RESET_STATE";
const orderFeedbackPostUrl = "/orders/feedback";
const orderConnectFeedbackPostUrl = "/orders/connect-feedback";
const renewSubscriptionPostUrl = "/orders/upgrade-premium";
const orderInfluencerReviewUrl = "/orders/influencer-review";

export const orderInfluencerReview = (paymentInfo) => {
  return fetch(`${api}${orderInfluencerReviewUrl}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(paymentInfo),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    toast.error("Couldn't complete your request, please try again");
    throw new Error(res);
  });
};

export const orderPreviewAgain = (orderPayload) => {
  return fetch(`${api}/orders/preview-track`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(orderPayload),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    throw new Error(res);
  });
};

export const updateOrderData = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_DATA,
    payload,
  });
export const updateTrackDetails = (payload, index) => (dispatch) =>
  dispatch({
    type: UPDATE_TRACK_DETAILS,
    payload,
    index,
  });

export const submitPayment = (paymentInfo) => {
  return axiosInstance.post(orderFeedbackPostUrl, paymentInfo);
};

export const upgradeTrackToPremium = (trackId, paymentInfo) => {
  return fetch(`${api}/orders/connect-feedback/${trackId}/payment`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(paymentInfo),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    throw new Error(res);
  });
};

export const uploadConnectFile = (payload) => {
  return fetch(`${api}${orderConnectFeedbackPostUrl}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(payload),
  });
};

export const renewSubscription = (paymentInfo) => {
  return fetch(`${api}${renewSubscriptionPostUrl}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(paymentInfo),
  });
};

export const addAnotherTrack = () => ({ type: ADD_ANOTHER_TRACK });

export const removeTrack = (index) => ({ type: REMOVE_TRACK, payload: index });

export const uploadAudioFileToIPFS = (formData, feedbackId, cb) => {
  const config = {
    onUploadProgress: (p) => {
      var uploaded = Math.round((p.loaded / p.total) * 100);
      cb && cb(uploaded);
    },
  };
  return axiosInstance.post(`/tracks/${feedbackId}/upload`, formData, config);
};

export const uploadTrackCover = (formData, feedbackId, cb) => {
  const config = {
    onUploadProgress: (p) => {
      var uploaded = Math.round((p.loaded / p.total) * 100);
      //cb && cb(uploaded);
    },
  };
  return axiosInstance.post(`/tracks/${feedbackId}/cover`, formData, config).then((res) => {
    cb(100);
  });
};

export const uploadTrackDetails = (formData, feedbackId) => {
  return axiosInstance.put(`/tracks/${feedbackId}`, formData);
};

export const resetState = () => ({ type: RESET_STATE });

//@DEPRICATED: no more using presigned url for mp3 upload
export const uploadTrackToS3BucketAxios = (url, file, cb) => {
  const config = {
    onUploadProgress: (p) => {
      var uploaded = Math.round((p.loaded / p.total) * 100);
      cb && cb(uploaded);
    },
  };
  return axiosInstance.put(url, file, config);
};

export const uploadTrackToS3BucketAxiosModified = (trackId, file, cb) => {
  const url = `${api}/tracks/${trackId}/upload-track`;
  const config = {
    onUploadProgress: (p) => {
      var uploaded = Math.round((p.loaded / p.total) * 100);
      cb && cb(uploaded);
    },
  };
  const fd = new FormData();
  fd.append("trackUpload", file);
  return axiosInstance.post(url, fd, config);
};

export const uploadTrackToS3Bucket = (url, file, trackId) =>
  fetch(url, { method: "PUT", body: file })
    .then((res) => {
      if (res.ok) {
        return uploadTrackDetails({ uploadStatus: "DONE" }, trackId);
      }
      uploadTrackDetails({ uploadStatus: "FAILED" }, trackId);
      throw new Error({ message: "Upload failed" });
    })
    .catch((e) => {
      uploadTrackDetails({ uploadStatus: "FAILED" }, trackId);
      throw new Error({ message: "Upload failed" });
    });
