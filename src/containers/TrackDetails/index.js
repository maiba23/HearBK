import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { PaymentState } from "../../components/AddTrackComponent/AddTrackComponent";
import PaymentDrawer from "../../components/PaymentDrawer";
import TrackDetailsComponent from "../../components/TrackDetailsComponent";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { clearSelectedTrack, getSelectedTrack } from "../../state/actions/homeAction";
import { renewSubscription, upgradeTrackToPremium, uploadTrackDetails, uploadTrackToS3BucketAxiosModified } from "../../state/actions/orderActions";
import { handleGetPresignedUrl } from "../../state/actions/trackAction";
import { decodeErrorMessage } from "../../utils";
import RateReview from "./RateReview";
import ReadMoreReview from "./ReadMoreReview";

export default function TrackDetails() {
  const [showRequestReview, setShowRequestReview] = React.useState(false);
  const [showEditTrack, setShowEditTrack] = React.useState(false);
  const [showPreviewAgain, setShowPreviewAgain] = React.useState(false);
  const [selectedReviewForRating, setSelectedReviewForRating] = React.useState(null);
  const [showReadMoreReview, setShowReadMoreReview] = React.useState(null);
  const [showPaymentForTrackUpdate, setShowPaymentForTrackUpdate] = React.useState(false);
  const [uploadState, setUploadState] = React.useState({
    uploadError: null,
    uploadProgress: 0,
    uploadComplete: false,
    uploadStart: false,
    uploadUrl: null,
  });

  const [showPaymentProcessingState, setPaymentProcessingState] = React.useState(false);

  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const history = useHistory();

  const user = useSelector((state) => state.userDetails.user);
  const premiumUser = user?.premiumSubscriptionId || false;

  const [showPayment, setShowPayment] = React.useState(false);
  const [cancelTrackUpload, setCancelTrackUpload] = React.useState(false);
  const selectedTrack = useSelector((state) => state.home.selectedTrack);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [yearlySubscription, setYearlySubscription] = React.useState(false);

  const toggleYearlySubscription = React.useCallback(() => {
    setYearlySubscription((pV) => !pV);
  }, []);

  React.useEffect(() => {
    if (selectedTrack)
      trackMixpanel(mixpanel_constant.view_track_details_success, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
        likes: selectedTrack?.likes,
        status: selectedTrack?.status,
      });
  }, [selectedTrack]);

  const fetchTrackdetails = () => {
    dispatch(getSelectedTrack(params?.trackId));
  };

  React.useEffect(() => {
    dispatch(clearSelectedTrack());
    fetchTrackdetails();
  }, []);

  const handleGoBack = () => {
    history.push("/dashboard");
  };

  const handleFileDrop = React.useCallback(
    (files) => {
      if (!files?.length) {
        setSelectedFile(null);
        return;
      }

      if (files.length > 1) {
        setUploadState((pS) => ({ ...pS, uploadError: "Please select only one file" }));
        return;
      }

      const file = files[0];
      if (!file.name.endsWith(".mp3")) {
        setUploadState((pS) => ({ ...pS, uploadError: "This file is not a MP3 file. Please retry with a new file." }));
        return;
      }
      if (file.size / 1024 / 1024 >= 15) {
        setUploadState((pS) => ({ ...pS, uploadError: "File size should be within 15mb" }));
        return;
      }
      setSelectedFile(file);
      setUploadState((pS) => ({ ...pS, uploadError: null }));
    },
    [setUploadState, setSelectedFile]
  );

  const onUploadMp3 = React.useCallback(async () => {
    setCancelTrackUpload(false);
    try {
      setUploadState((pS) => ({ ...pS, uploadStart: true, uploadProgress: 0, uploadError: null, uploadComplete: false }));
      const preSignedUrl = await handleGetPresignedUrl(selectedTrack?._id);
      setUploadState((pS) => ({ ...pS, uploadUrl: preSignedUrl?.url }));
      await uploadTrackToS3BucketAxiosModified(selectedTrack?._id, selectedFile, (progress) =>
        setUploadState((pS) => ({ ...pS, uploadProgress: progress }))
      );
      await uploadTrackDetails({ uploadStatus: "DONE" }, selectedTrack?._id);
      setUploadState((pS) => ({ ...pS, uploadStart: false, uploadComplete: true, uploadError: null }));
    } catch (err) {
      setUploadState((pS) => ({
        ...pS,
        uploadStart: false,
        uploadProgress: 0,
        uploadError: decodeErrorMessage(err, "Error uploading the file"),
        uploadComplete: false,
      }));
      await uploadTrackDetails({ uploadStatus: "FAILED" }, selectedTrack?._id);
    }
  }, [
    setUploadState,
    handleGetPresignedUrl,
    uploadTrackDetails,
    selectedTrack,
    decodeErrorMessage,
    selectedFile,
    setCancelTrackUpload,
  ]);

  const handleSubscription = React.useCallback(
    ({ token, paymentFromSavedCard }) => {
      const payload = {
        saveCardDetails: paymentFromSavedCard ? false : true,
        paymentToken: token,
        currency: "USD",
        isAddPremium: true,
        isYearlySubscription: yearlySubscription,
        paymentFromSavedCard: paymentFromSavedCard,
      };

      trackMixpanel(mixpanel_constant.track_details_upgrade_to_premium_submit, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
        ...payload,
      });

      renewSubscription(payload)
        .then(() => {
          setShowPayment(false);
          trackMixpanel(mixpanel_constant.track_details_upgrade_to_premium_success, {
            trackId: selectedTrack?._id,
            trackTitle: selectedTrack?.trackTitle,
            ...payload,
          });
        })
        .catch((err) => {
          trackMixpanel(mixpanel_constant.track_details_upgrade_to_premium_error, {
            trackId: selectedTrack?._id,
            trackTitle: selectedTrack?.trackTitle,
            error: JSON.stringify(err),
          });
          toast.error("Couldn't complete your request, please try again");
        });
    },
    [setShowPayment, renewSubscription, trackMixpanel, mixpanel_constant, selectedTrack, yearlySubscription]
  );

  const handleTrackUpdate = React.useCallback(
    ({ token, saveCardDetails, paymentFromSavedCard }) => {
      const payload = {
        saveCardDetails: saveCardDetails,
        paymentToken: token,
        amount: 9,
        currency: "USD",
        paymentFromSavedCard: paymentFromSavedCard,
      };

      trackMixpanel(mixpanel_constant.track_details_upgrade_from_free_to_paid_submit, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
        ...payload,
      });

      setPaymentProcessingState(true);
      setShowPayment(false);
      upgradeTrackToPremium(selectedTrack._id, payload)
        .then(() => {
          setShowPaymentForTrackUpdate(false);
          fetchTrackdetails();
          setPaymentProcessingState(false);
          trackMixpanel(mixpanel_constant.track_details_upgrade_from_free_to_paid_success, {
            trackId: selectedTrack?._id,
            trackTitle: selectedTrack?.trackTitle,
            ...payload,
          });
        })
        .catch((err) => {
          trackMixpanel(mixpanel_constant.track_details_upgrade_from_free_to_paid_error, {
            trackId: selectedTrack?._id,
            trackTitle: selectedTrack?.trackTitle,
            error: JSON.stringify(err),
          });
          setPaymentProcessingState(false);
          toast.error("Couldn't complete your request, please try again");
        });
    },
    [selectedTrack, upgradeTrackToPremium, setShowPaymentForTrackUpdate, fetchTrackdetails, trackMixpanel, mixpanel_constant]
  );

  const handleSelectedReviewForRating = React.useCallback(
    (reviewItem) => {
      setSelectedReviewForRating(reviewItem);
      trackMixpanel(mixpanel_constant.track_details_listener_give_review_feedback_open, reviewItem);
    },
    [setSelectedReviewForRating, trackMixpanel, mixpanel_constant]
  );

  const handleEditTrack = React.useCallback(() => {
    if (!showEditTrack) {
      trackMixpanel(mixpanel_constant.edit_track_open, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
        likes: selectedTrack?.likes,
        status: selectedTrack?.status,
      });
    }
    setShowEditTrack((pV) => !pV);
  }, [setShowEditTrack, showEditTrack, trackMixpanel, mixpanel_constant, selectedTrack]);

  const handleRequestReview = React.useCallback(() => {
    if (!showRequestReview) {
      trackMixpanel(mixpanel_constant.track_details_request_review_from_influencer_open, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
      });
    }
    setShowRequestReview((pV) => !pV);
  }, [setShowRequestReview, trackMixpanel, mixpanel_constant, selectedTrack, showRequestReview]);

  const handleSubscribeToPro = React.useCallback(() => {
    setShowPayment((pV) => !pV);
    if (showPayment) {
      trackMixpanel(mixpanel_constant.track_details_upgrade_to_premium_open, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
      });
    }
  }, [setShowPayment, trackMixpanel, mixpanel_constant, selectedTrack, showPayment]);

  const handleTrackUpgrade = React.useCallback(() => {
    setShowPaymentForTrackUpdate((pV) => !pV);
    if (showPaymentForTrackUpdate) {
      trackMixpanel(mixpanel_constant.track_details_upgrade_from_free_to_paid_open, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
      });
    }
  }, [setShowPaymentForTrackUpdate, trackMixpanel, mixpanel_constant, selectedTrack, showPaymentForTrackUpdate]);

  const handleReadMoreReview = React.useCallback(
    (reviewItem) => {
      setShowReadMoreReview(reviewItem);
      trackMixpanel(mixpanel_constant.read_more_track_review, {
        trackId: selectedTrack?._id,
        trackTitle: selectedTrack?.trackTitle,
        ...reviewItem,
      });
    },
    [setShowReadMoreReview, trackMixpanel, mixpanel_constant, selectedTrack]
  );

  return (
    <>
      <PaymentState visible={showPaymentProcessingState} />
      {selectedTrack && (
        <>
          <TrackDetailsComponent
            selectedTrack={selectedTrack}
            handleGoBack={handleGoBack}
            premiumUser={premiumUser}
            showRequestReview={showRequestReview}
            handleRequestReview={handleRequestReview}
            showEditTrack={showEditTrack}
            handleEditTrack={handleEditTrack}
            handleSubscribeToPro={handleSubscribeToPro}
            toggleYearlySubscription={toggleYearlySubscription}
            yearlySubscription={yearlySubscription}
            showPreviewAgain={showPreviewAgain}
            selectedReviewForRating={selectedReviewForRating}
            handleSelectedReviewForRating={handleSelectedReviewForRating}
            handleShowReadMoreReview={handleReadMoreReview}
            handlePreviewAgain={() => setShowPreviewAgain((pV) => !pV)}
            handleUpgradeTrack={handleTrackUpgrade}
            onUploadMp3={onUploadMp3}
            handleFileDrop={handleFileDrop}
            uploadState={uploadState}
            selectedFile={selectedFile}
            handleClearFile={() => setSelectedFile(null)}
            cancelTrackUpload={cancelTrackUpload}
            handleCancelTrackUpload={setCancelTrackUpload}
          />
          <RateReview
            open={!!selectedReviewForRating}
            fetchTrackdetails={fetchTrackdetails}
            selectedReviewForRating={selectedReviewForRating}
            handleClose={() => setSelectedReviewForRating(null)}
          />
          <ReadMoreReview open={!!showReadMoreReview} handleClose={() => setShowReadMoreReview(null)} reviewItem={showReadMoreReview} />
          {/* Drwer for subscribe to payment */}
          <PaymentDrawer
            open={showPayment}
            amount={yearlySubscription ? 100 : 15}
            handlePaymentTokenReceived={handleSubscription}
            handleClose={() => setShowPayment((pV) => !pV)}
          />
          {/* Drwer for upgrade track to premium */}
          <PaymentDrawer
            open={showPaymentForTrackUpdate}
            amount={9}
            handlePaymentTokenReceived={handleTrackUpdate}
            handleClose={() => setShowPaymentForTrackUpdate((pV) => !pV)}
          />
        </>
      )}
    </>
  );
}
