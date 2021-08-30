export default {
  REVIEW_GOAL_TITLE_QUEUE: "Your track is previewing in queue",
  TRACK_STATUS_BACK_ACTION: "To track list",
  REVIEW_GOAL_TITLE_COMPLETED: "Previewing complete",
  REVIEW_GOAL_DESC_FIRST_ROW: "We shared your track with 100 music fans who like Hip-Hop.",
  REVIEW_GOAL_DESC_SECOND_ROW:
    "Each fan will rate your track on a scale of 1 to 5 — with a rating of 1 being the lowest and 5 the highest.",
  TRACK_PROMOTERS_TITLE: "Promoters",
  TRACK_PROMOTERS_DESCRIPTION: "This is the total number of listeners who said they would promote your track on social media.",
  TRACK_LIKES_TITLE: "Likes",
  TRACK_LIKES_DESCRIPTION: "This is the total number of listeners who rated your track 3 stars or above.",
  TRACK_PLAYLISTERS_TITLE: "Playlisters",
  TRACK_PLAYLISTERS_DESCRIPTION: "This is the total number of listeners who said they would add your track to a streaming playlist.",
  INFLUENCER_SCORE_TITLE: "Quality Control Filter",
  INFLUENCER_SCORE_DESCRIPTION: "Percentage of people who liked your track!",
  INFLUENCER_WAITING_TITLE: "Influencers Waiting",
  INFLUENCER_WAITING_DESCRIPTION: (recScore, totalScore, eiligibleInfluencer) =>
    `Congratulations! Since this track received ${recScore} of ${totalScore ||
      100}% score, you meet the qualifications to request feedback from ${eiligibleInfluencer} verified music influencers.`,
  INFLUENCER_COMPLIMENTARY: "We share 3 comments complimentary.",
  INFLUENCER_NOT_AVAILABLE: "So far, your track has not reached the required score rating.",
  INFLUENCER_REQUEST_REVIEW: "Request a review",
  COMMENT_NAME: "Comments",
  COMMENT_DESCRIPTION: (fansCount, commentCount) =>
    `Of the ${fansCount} music fans who listened to this track, ${commentCount} wrote comments. `,
  PRICING_TITLE: "To view all comments, please, unlock a full report",
  PRICING_TYPE_ONE_NAME: "Pro Account",
  PRICING_TYPE_ONE_RATE: "$ 15 / month",
  PRICING_TYPE_ONE_FEATURE_APPLIES: "features applies to all your tracks!",
  PRICING_TYPE_ONE_DESCRIPTION:
    "Get instant access to all listener comments Identify fans willing to promote your track Identify fans willing to playlist your track Discover your average star rating",
  PRICING_TYPE_ONE_FEATURE_1: "PRO Account Benefits",
  PRICING_TYPE_ONE_FEATURE_2: "Future uploads - $5 per track",
  PRICING_TYPE_ONE_FEATURE_3: "Priority submission to influencers",
  PRICING_TYPE_ONE_FEATURE_4: "new submission opportunities",
  PRICING_TYPE_ONE_ACTION_BUTTON: "unlock full report",

  PRICING_TYPE_TWO_NAME: "One Time Purchase",
  PRICING_TYPE_TWO_RATE: "$ 9",
  PRICING_TYPE_TWO_FEATURE_APPLIES: "features applies to this exact track",
  PRICING_TYPE_TWO_DESCRIPTION:
    "Get instant access to all listener comments Identify fans willing to promote your track Identify fans willing to playlist your track Discover your average star rating",
  PRICING_TYPE_TWO_FEATURE_1: "Future uploads - $9 per track",
  PRICING_TYPE_TWO_ACTION_BUTTON: "unlock full report",

  COMMENT_RATING_TITLE: "Track rating",
  COMMENT_WILL_PROMOTE: "Will promote",
  COMMENT_WILL_PLAYLIST: "Will playlist",
  COMMENT_READ_MORE: "Read More",
};
