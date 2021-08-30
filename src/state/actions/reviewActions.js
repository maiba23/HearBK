import api, { authHeaders } from "../../config";

const rateInfluencerReviewURI = "/influencer/feedback/";

export const rateInfluencerReview = (reviewId, payload) =>
  fetch(`${api}${rateInfluencerReviewURI}${reviewId}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(response);
  });
