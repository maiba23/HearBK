import { Drawer } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PaymentState } from "../../components/AddTrackComponent/AddTrackComponent";
import PaymentDrawer from "../../components/PaymentDrawer";
import RequestReviewInfluencer from "../../components/RequestReviewComponent/RequestReviewInfluencer";
import { TRACK_STATUS } from "../../components/TrackComponent/constants";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { orderInfluencerReview } from "../../state/actions/orderActions";
import { getUserTrackStats } from "../../state/actions/userActions";

export default function RequestReview({ open, handleClose }) {
  const dispatch = useDispatch();
  const userTracks = useSelector(state => state.userDetails.userTracks || []);
  const selectedUser = useSelector(state => state.home.selectedUserProfile);
  const [trackList, setTrackList] = useState(userTracks);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [showPayment, setShowPayment] = React.useState(false);

  const [showPaymentProcessingState, setPaymentProcessingState] = React.useState(false);

  const totalAmount = selectedTracks.length * (selectedUser.price || 0);
  const handlePaymentTokenReceive = async ({ token, saveCardDetails, paymentFromSavedCard }) => {
    const tracks = selectedTracks.map(item => ({
      trackId: item,
      influencersIds: [selectedUser._id],
    }));

    const payload = {
      tracks,
      saveCardDetails: saveCardDetails,
      paymentFromSavedCard: paymentFromSavedCard,
      paymentToken: token,
      amount: parseFloat(totalAmount),
      currency: "USD",
    };

    trackMixpanel(mixpanel_constant.influencer_request_review_submit, payload);

    try {
      setShowPayment(false);
      setPaymentProcessingState(true);
      await orderInfluencerReview(payload);
      trackMixpanel(mixpanel_constant.influencer_request_review_success, payload);
      setPaymentProcessingState(false);
      handleClose();
    } catch (err) {
      trackMixpanel(mixpanel_constant.influencer_request_review_error, {
        ...payload,
        error: JSON.stringify(err),
      });
      setPaymentProcessingState(false);
    }
  };

  useEffect(() => {
    // only in queue tracks can request for review
    if (userTracks.length) {
      const TRACKS = JSON.parse(JSON.stringify(userTracks));
      setTrackList(TRACKS.filter(trackItem => trackItem.status === TRACK_STATUS[1].value));
    }
  }, [userTracks]);

  useEffect(() => {
    //if already in redux, don't need to hit api
    if (!userTracks?.length) dispatch(getUserTrackStats());
  }, []);

  const handleTrackSelect = useCallback(
    trackId => {
      if (selectedTracks.includes(trackId)) {
        setSelectedTracks(selectedTracks.filter(x => x !== trackId));
      } else {
        setSelectedTracks([...selectedTracks, trackId]);
      }
    },
    [selectedTracks]
  );

  const handleRequestReview = () => {
    trackMixpanel(mixpanel_constant.influencer_request_review_payment_view, { amount: totalAmount });
    setShowPayment(true);
  };

  return (
    <>
      <PaymentState visible={showPaymentProcessingState} />
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <RequestReviewInfluencer
          onClose={handleClose}
          selectedUser={selectedUser}
          trackList={trackList}
          totalAmount={totalAmount}
          handleTrackSelect={handleTrackSelect}
          handleRequestReview={handleRequestReview}
          selectedTracks={selectedTracks}
        />
      </Drawer>
      <PaymentDrawer
        open={showPayment}
        amount={totalAmount}
        handlePaymentTokenReceived={handlePaymentTokenReceive}
        handleClose={() => setShowPayment(pV => !pV)}
      />
    </>
  );
}
