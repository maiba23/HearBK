import { Drawer } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentDrawer from "../../components/PaymentDrawer";
import RequestReviewTrackComponent from "../../components/TrackDetailsComponent/RequestReviewTrackComponent/RequestReviewTrackComponent";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { getInfluencers } from "../../state/actions/listenerActions";
import { orderInfluencerReview } from "../../state/actions/orderActions";

export default function RequestReviewForTrack({ open, handleClose, selectedTrack }) {
  const influencers = useSelector(state => state.listeners.influencers);
  const dispatch = useDispatch();

  const [influencerData, setInfluencerData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [selectedInfluencer, setSelectedInfluencer] = React.useState([]);
  const [showPayment, setShowPayment] = React.useState(false);

  React.useEffect(() => {
    dispatch(getInfluencers(selectedTrack?._id));
  }, [selectedTrack?._id]);

  React.useEffect(() => {
    setInfluencerData(influencers);
  }, [influencers]);

  const handleSearch = e => {
    let text = e?.target?.value;
    if (text) {
      var tempData = JSON.parse(JSON.stringify(influencers));
      tempData = tempData.filter(data => data.display_name.toLowerCase().includes(text.toLowerCase()));
      setInfluencerData(tempData);
      setSearchText(e.target.value);
    } else {
      setInfluencerData(influencers);
      setSearchText("");
    }
  };

  const handleInfluencerSelect = React.useCallback(
    influencerId => {
      if (selectedInfluencer.includes(influencerId)) {
        setSelectedInfluencer(selectedInfluencer.filter(x => x !== influencerId));
      } else {
        setSelectedInfluencer([...selectedInfluencer, influencerId]);
      }
    },
    [selectedInfluencer]
  );

  const computeAmountFromSelectedInfluencer = () => {
    const influencerData = selectedInfluencer.map(item => influencers?.find(el => el._id === item));
    let amount = 0;

    for (let i = 0; i < influencerData.length; i++) {
      amount += parseFloat(influencerData[i]?.price || 0);
    }

    return amount;
  };

  const handleRequest = () => {
    setShowPayment(true);
    trackMixpanel(mixpanel_constant.track_details_request_review_from_influencer_payment_open, {
      trackId: selectedTrack?._id,
      reviewAmount: parseFloat(computeAmountFromSelectedInfluencer()),
    });
  };

  const handlePaymentTokenReceive = async ({ token, saveCardDetails, paymentFromSavedCard }) => {
    const payload = {
      tracks: [
        {
          trackId: selectedTrack?._id,
          influencersIds: selectedInfluencer,
        },
      ],
      saveCardDetails: saveCardDetails,
      paymentFromSavedCard: paymentFromSavedCard,
      paymentToken: token,
      amount: parseFloat(computeAmountFromSelectedInfluencer()),
      currency: "USD",
    };

    trackMixpanel(mixpanel_constant.track_details_request_review_from_influencer_submit, {
      trackId: selectedTrack?._id,
      saveCardDetails: saveCardDetails,
      paymentFromSavedCard: paymentFromSavedCard,
      paymentToken: token,
      amount: parseFloat(computeAmountFromSelectedInfluencer()),
      currency: "USD",
      influencersIds: JSON.stringify(selectedInfluencer),
    });

    try {
      const res = await orderInfluencerReview(payload);
      trackMixpanel(mixpanel_constant.track_details_request_review_from_influencer_success, {
        trackId: selectedTrack?._id,
        paymentToken: token,
        amount: parseFloat(computeAmountFromSelectedInfluencer()),
      });
      setShowPayment(false);
      handleClose();
    } catch (err) {
      trackMixpanel(mixpanel_constant.track_details_request_review_from_influencer_error, {
        trackId: selectedTrack?._id,
        paymentToken: token,
        amount: parseFloat(computeAmountFromSelectedInfluencer()),
        error: JSON.stringify(err),
      });
      toast.error("Couldn't complete your request, please try again");
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <RequestReviewTrackComponent
          handleSearch={handleSearch}
          handleInfluencerSelect={handleInfluencerSelect}
          computeAmountFromSelectedInfluencer={computeAmountFromSelectedInfluencer}
          influencers={influencerData}
          searchText={searchText}
          selectedInfluencer={selectedInfluencer}
          handleClose={handleClose}
          handleRequest={handleRequest}
        />
      </Drawer>
      <PaymentDrawer
        open={showPayment}
        amount={computeAmountFromSelectedInfluencer()}
        handlePaymentTokenReceived={handlePaymentTokenReceive}
        handleClose={() => setShowPayment(pV => !pV)}
      />
    </>
  );
}
