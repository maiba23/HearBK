import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AddTrackComponent from "../../components/AddTrackComponent/AddTrackComponent";
import { submitPayment, uploadTrackCover, uploadTrackDetails, uploadTrackToS3BucketAxiosModified } from "../../state/actions/orderActions";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { getGenres, getStylesForGenre } from "../../state/actions/preferencesActions";
import { cancelUserPremiumSubscription, getUserDetails, verifyPromoCode } from "../../state/actions/userActions";
import { decodeErrorMessage } from "../../utils";

export default function AddTrack() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedCover, setSelectedCover] = React.useState(null);

  const [selectedGenre, setSelectedGenre] = React.useState(null);
  const [selectedGenreMultiple, setSelectedGenreMultiple] = React.useState([]);

  const [activateProAccount, setActivateProAccount] = React.useState(false);
  const [activateProYearly, setActivateProYearly] = React.useState(false);

  const [errors, setErrors] = React.useState({
    file: false,
    cover: false,
    trackName: false,
    fileType: false,
    fileErrorMessage: "",
    propCodeStatus: false,
  });
  const trackNameRef = React.useRef(null);
  const trackAuthorRef = React.useRef(null);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.preferences.genres);
  const styles = useSelector((state) => state.preferences.styles);
  const user = useSelector((state) => state.userDetails.user);
  const premiumUser = user?.premiumSubscriptionId || false;
  const firstTime = useSelector((state) => state.userDetails?.user?.connect_available);
  const firstTimeUpload = firstTime > 0;
  const [selectedStyles, setSelectedStyles] = React.useState([]);
  const [showStylesMenu, setShowStylesMenu] = React.useState(false);
  const [showPaymentMenu, setShowPaymentMenu] = React.useState(false);
  const uploadTrackRef = React.useRef(null);
  const uploadTrackThumbRef = React.useRef(null);
  const [promoCode, setPromoCode] = React.useState({
    code: "",
    amount: 0,
    isValidPromoCode: false,
  });
  const [paymentPlan, setPaymentPlan] = React.useState({
    isOneTimeUpload: true,
    isPromoCode: false,
  });
  const [cancelTrackUpload, setCancelTrackUpload] = React.useState(false);

  const [fileUploadLoading, setFileUploadLoading] = React.useState(false);
  const [addTrackLoading, setAddTrackLoading] = React.useState(false);
  const [uploadDetails, setUploadDetails] = React.useState({
    trackId: null,
    uploadUrl: null,
    fileUploadError: null,
    coverUploadError: null,
    fileUploadProgress: 0,
    coverUploadProgress: 0,
  });
  const [addSuccess, setAddSuccess] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    dispatch(getUserDetails(true));
    dispatch(getGenres());
  }, [dispatch]);

  React.useEffect(() => {
    if (selectedGenre && selectedGenre?._id) {
      dispatch(getStylesForGenre(selectedGenre?._id));
    }
  }, [dispatch, selectedGenre]);

  // React.useEffect(() => {
  //   if (styles?.length > 0 && !!selectedGenre?._id) {
  //     setShowStylesMenu(true);
  //   }
  // }, [styles.length, selectedGenre]);

  const handleErrors = React.useCallback(
    (name, condition) => {
      setErrors((pErrors) => ({ ...pErrors, [name]: condition }));
    },
    [setErrors]
  );

  const hasErrors = React.useCallback(() => {
    let error = false;
    if (!selectedFile) error = true;
    //if (!selectedCover) error = true;
    if (trackNameRef.current.value.trim() === "") error = true;
    return error;
  }, [selectedFile]);

  const computeAmount = React.useCallback(() => {
    let amount = 0;
    if (!premiumUser && activateProAccount) amount += 15;
    if (!premiumUser && activateProYearly) amount += 100;
    if (firstTimeUpload) {
    } else if (premiumUser || activateProAccount) {
      amount += 5;
    } else {
      amount += 9;
    }
    amount = amount - promoCode.amount;
    return amount.toFixed(2);
  }, [premiumUser, activateProAccount, activateProYearly, firstTimeUpload, promoCode]);

  const computeAmountToPay = React.useCallback(() => {
    let amount = 0;
    if (firstTimeUpload) {
    } else if (premiumUser || activateProAccount || activateProYearly) {
      amount += 5;
    } else {
      amount += 9;
    }
    amount = amount - promoCode.amount;
    return amount.toFixed(2);
  }, [firstTimeUpload, premiumUser, activateProAccount, activateProYearly, promoCode]);

  const handleActivateProAccount = React.useCallback(() => {
    if (activateProAccount) {
      trackMixpanel(mixpanel_constant.add_track_unselect_premium_plan, {});
    } else {
      trackMixpanel(mixpanel_constant.add_track_select_premium_plan, {});
    }
    setActivateProAccount((preVal) => !preVal);
    setActivateProYearly(false);
  }, [setActivateProAccount, setActivateProYearly]);

  const handleActivateProYearlyAccount = React.useCallback(() => {
    setActivateProYearly((preVal) => !preVal);
    setActivateProAccount(false);
  }, [setActivateProAccount, setActivateProYearly]);

  const handleClearFile = React.useCallback(() => {
    setSelectedFile(null);
  }, [setSelectedFile]);

  const handleClearCover = React.useCallback(() => {
    setSelectedCover(null);
  }, [setSelectedCover]);

  React.useEffect(() => {
    console.log("uploadDetails.coverUploadProgress:===>", uploadDetails.coverUploadProgress);
    if (
      uploadDetails.fileUploadError === null &&
      uploadDetails.coverUploadError === null &&
      uploadDetails.fileUploadProgress === 100 &&
      uploadDetails.coverUploadProgress === 100 &&
      !addSuccess
    ) {
      setAddSuccess(true);
    }
  }, [history, uploadDetails, addSuccess]);

  const handleUploadDetails = React.useCallback(
    (key, value) => {
      setUploadDetails((pV) => ({ ...pV, [key]: value }));
    },
    [setUploadDetails]
  );

  const handleTrackFileUpload = React.useCallback(
    async (uploadUrl = null, trackId = null, file = null) => {
      handleUploadDetails("fileUploadProgress", 0);
      setAddSuccess(false);
      setCancelTrackUpload(false);
      try {
        setFileUploadLoading(true);
        handleUploadDetails("fileUploadError", null);
        await uploadTrackToS3BucketAxiosModified(trackId, file || selectedFile, (progress) => {
          if (!cancelTrackUpload) handleUploadDetails("fileUploadProgress", progress);
        });
        handleUploadDetails("fileUploadError", null);
        await uploadTrackDetails({ uploadStatus: "DONE" }, trackId || uploadDetails.trackId);
        // if (uploadTrackThumbRef?.current) window.scrollTo(0, uploadTrackThumbRef?.current?.offsetTop);
      } catch (err) {
        await uploadTrackDetails({ uploadStatus: "FAILED" }, trackId || uploadDetails.trackId);
        setFileUploadLoading(false);
        setAddTrackLoading(false);
        handleUploadDetails("fileUploadProgress", 0);
        handleUploadDetails("fileUploadError", decodeErrorMessage(err, "Error uploading the file"));
      }
    },
    [setFileUploadLoading, selectedFile, handleUploadDetails, uploadDetails, cancelTrackUpload, setCancelTrackUpload]
  );

  const handleTrackCoverUpload = React.useCallback(
    async (trackId) => {
      try {
        const coverFormData = new FormData();
        coverFormData.append("coverImage", selectedCover);

        await uploadTrackCover(coverFormData, trackId, (progress) => handleUploadDetails("coverUploadProgress", progress));
      } catch (err) {
        handleUploadDetails("coverUploadError", decodeErrorMessage(err, "Error uploading track thumb"));
      }
      setAddTrackLoading(false);
    },
    [selectedCover, handleUploadDetails, setAddTrackLoading]
  );

  const handleAddTrack = React.useCallback(
    async (payload) => {
      const detailData = {
        trackTitle: trackNameRef.current.value.trim(),
        trackAuthor: trackAuthorRef.current.value.trim(),
        genreId: selectedGenreMultiple,
        ...(selectedStyles?.length > 0 && { styleId: selectedStyles }),
      };
      try {
        setAddTrackLoading(true);
        setShowPaymentMenu(false);
        const pay = await submitPayment(payload);
        const trackId = pay[0].feedbackId;
        const uploadUrl = pay[0].preSignedUrlForUpload;
        handleUploadDetails("trackId", trackId);
        handleUploadDetails("uploadUrl", uploadUrl);
        setFileUploadLoading(true);
        if (uploadTrackRef?.current) window.scrollTo(0, uploadTrackRef?.current?.offsetTop);
        await uploadTrackDetails(detailData, trackId);
        await handleTrackFileUpload(uploadUrl, trackId, selectedFile);
        if (selectedCover) {
          await handleTrackCoverUpload(trackId);
        } else {
          handleUploadDetails("coverUploadProgress", 100);
        }
      } catch (err) {
        setAddTrackLoading(false);
        toast.error(decodeErrorMessage(err));
      }
    },
    [selectedGenre?._id, selectedStyles, handleUploadDetails, selectedFile, handleTrackCoverUpload]
  );

  const handleAddFromConnect = React.useCallback(() => {
    const payload = {
      saveCardDetails: false,
      paymentFromSavedCard: false,
      paymentToken: "CONNECT",
      isAddPremium: activateProAccount || activateProYearly,
      isYearlySubscription: activateProYearly,
      promoCode: promoCode.code,
      amount: 0,
      currency: "USD",
      tracks: [
        {
          id: 0,
          mediaType: "FILE_UPLOAD",
          selectedFeedback: 5,
          trackTitle: trackNameRef.current.value.trim(),
          trackAuthor: trackAuthorRef.current.value.trim(),
          genreId: selectedGenreMultiple,
          ...(selectedStyles?.length > 0 && { stylesId: selectedStyles }),
        },
      ],
    };
    handleAddTrack(payload);
  }, [activateProAccount, activateProYearly, promoCode, selectedGenre, selectedStyles, handleAddTrack]);

  const handleSubmit = React.useCallback(() => {
    selectedFile ? handleErrors("file", false) : handleErrors("file", true);
    //selectedCover ? handleErrors("cover", false) : handleErrors("cover", true);
    trackNameRef.current.value.trim() === "" ? handleErrors("trackName", true) : handleErrors("trackName", false);
    if (!selectedGenre) {
      toast.error("You must select genre");
      return;
    }
    if (!hasErrors()) {
      if (computeAmount() == 0.0) {
        handleAddFromConnect();
      } else {
        setShowPaymentMenu(true);
      }
    }
  }, [selectedFile, handleErrors, selectedCover, selectedGenre, hasErrors, computeAmount, handleAddFromConnect]);

  const handlePaymentTokenReceive = React.useCallback(
    ({ token, saveCardDetails, paymentFromSavedCard }) => {
      const payload = {
        saveCardDetails: saveCardDetails,
        paymentFromSavedCard: paymentFromSavedCard,
        paymentToken: token,
        isAddPremium: activateProAccount || activateProYearly,
        isYearlySubscription: activateProYearly,
        amount: computeAmountToPay() !== 0.0 && parseFloat(computeAmountToPay()),
        currency: "USD",
        tracks: [
          {
            id: 0,
            mediaType: "FILE_UPLOAD",
            selectedFeedback: 5,
            trackTitle: trackNameRef.current.value.trim(),
            trackAuthor: trackAuthorRef.current.value.trim(),
            genreId: selectedGenreMultiple,
            ...(selectedStyles?.length > 0 && { stylesId: selectedStyles }),
          },
        ],
      };

      handleAddTrack(payload);
    },
    [activateProAccount, activateProYearly, selectedGenre, selectedStyles, handleAddTrack, computeAmountToPay]
  );

  const handleGenre = React.useCallback(
    (genre) => {
      setSelectedGenre(genre);
       // for multiple genres
      if (selectedGenreMultiple.find((el) => el.id === genre?._id)) {
        setSelectedGenreMultiple((pV) => pV.filter((el) => el?.id !== genre?._id));
      } else {
        setSelectedGenreMultiple((pV) => [...pV, { id: genre?._id, styleId: [] }]);
        setShowStylesMenu(true);
      }
      // end for multiple genres
      // setSelectedStyles([]);
      trackMixpanel(mixpanel_constant.add_track_select_genre, { ...genre });
    },
    [setSelectedGenre, selectedGenreMultiple, setSelectedGenreMultiple, setShowStylesMenu]
  );

  const handleStylesSelect = React.useCallback(
    (styleId) => {

      // multiple genres
      let findGenre = selectedGenreMultiple.find((el) => el.id === selectedGenre?._id);
      if (findGenre && findGenre?.styleId?.includes(styleId)) {
        findGenre.styleId = findGenre.styleId.filter((sid) => sid != styleId);
      } else {
        findGenre.styleId = [...findGenre.styleId, styleId];
      }
      setSelectedGenreMultiple((pV) => [...pV.filter((el) => el.id !== selectedGenre?._id), findGenre]);
      // multiple genres

      if (selectedStyles.includes(styleId)) {
        setSelectedStyles(selectedStyles.filter((x) => x !== styleId));
      } else {
        setSelectedStyles([...selectedStyles, styleId]);
        trackMixpanel(mixpanel_constant.add_track_select_styles, { styleId });
      }
    },
    [selectedStyles, selectedGenre, selectedGenreMultiple, setSelectedGenreMultiple]
  );

  const handleCancelSubscription = React.useCallback(async () => {
    try {
      await cancelUserPremiumSubscription();
      trackMixpanel(mixpanel_constant.add_track_cancel_premium_plan, {});
      dispatch(getUserDetails(true));
    } catch (err) {}
  }, [dispatch]);

  const handleBack = () => {
    history.push("/dashboard");
  };

  const handleFileDrop = React.useCallback(
    async (files) => {
      if (!files?.length) {
        setSelectedFile(null);
        return;
      }

      if (files.length > 1) {
        setErrors({
          ...errors,
          fileType: true,
          file: true,
          fileErrorMessage: "You can only upload one file",
        });
        return;
      }

      const file = files[0];
      if (!file.name.endsWith(".mp3")) {
        setErrors({
          ...errors,
          fileType: true,
          file: true,
          fileErrorMessage: "This file is not a MP3 file. Please retry with a new file.",
        });
        return;
      }
      if (file.size / 1024 / 1024 >= 15) {
        setErrors({
          ...errors,
          fileType: true,
          file: true,
          fileErrorMessage: "File size should be within 15mb",
        });
        return;
      }

      setErrors({
        ...errors,
        fileType: false,
      });

      setSelectedFile(file);
      if (uploadDetails?.trackId) {
        await handleTrackFileUpload(null, null, file);
        setAddSuccess(true);
      }
    },
    [errors, uploadDetails.trackId, handleTrackFileUpload, setAddSuccess]
  );

  const handleCoverDrop = React.useCallback(
    (files) => {
      if (!files?.length) {
        setSelectedCover(null);
        return;
      }

      if (files.length > 1) {
        toast.error("You can only upload one file");
        return;
      }

      const file = files[0];
      const name = file?.name?.toLowerCase();
      if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
        toast.error("Only image of type png, jpg, jpeg are allowed");
        return;
      }
      if (file.size / 1024 / 1024 >= 15) {
        toast.error("File size should be within 15mb");
        return;
      }
      setSelectedCover(file);
    },
    [setSelectedCover]
  );

  const handleCancelTrackUpload = React.useCallback(() => {
    setCancelTrackUpload(true);
    setAddTrackLoading(false);
  }, [setCancelTrackUpload, setAddTrackLoading]);

  const intiVerifyPromoCode = async (event) => {
    verifyPromoCode(event.target.value)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setPromoCode({
            code: data.code,
            amount: data.amount ? data.amount : 0,
            isValidPromoCode: true,
          });
          setErrors({
            ...errors,
            propCodeStatus: false,
          });
        } else {
          setPromoCode({
            code: "",
            amount: 0,
            isValidPromoCode: false,
          });
          setErrors({
            ...errors,
            propCodeStatus: true,
          });
        }
      });
  };

  const handlePaymentPlan = (event, checked, name) => {
    setPaymentPlan({
      ...paymentPlan,
      [name]: !checked,
    });
    setPromoCode({ code: "", amount: 0, isValidPromoCode: false });
  };
  return (
    <AddTrackComponent
      selectedFile={selectedFile}
      selectedCover={selectedCover}
      addSuccess={addSuccess}
      handleCoverDrop={handleCoverDrop}
      firstTimeUpload={firstTimeUpload}
      premiumUser={premiumUser}
      trackNameRef={trackNameRef}
      trackAuthorRef={trackAuthorRef}
      activateProAccount={activateProAccount}
      selectedGenre={selectedGenre}
      selectedGenreMultiple={selectedGenreMultiple}
      paymentPlan={paymentPlan}
      verifyPromoCode={intiVerifyPromoCode}
      handleActivateProAccount={handleActivateProAccount}
      handleClearFile={handleClearFile}
      handleClearCover={handleClearCover}
      handleFileDrop={handleFileDrop}
      handleGenre={handleGenre}
      computeAmount={computeAmount}
      promoCode={promoCode}
      handleSubmit={handleSubmit}
      addTrackLoading={addTrackLoading}
      fileUploadLoading={fileUploadLoading}
      selectedStyles={selectedStyles}
      handleStylesSelect={handleStylesSelect}
      closeStylesMenu={() => setShowStylesMenu(false)}
      showStylesMenu={showStylesMenu}
      handlePaymentPlan={handlePaymentPlan}
      handleBack={handleBack}
      handleCancelSubscription={handleCancelSubscription}
      genres={genres}
      styles={styles}
      errors={errors}
      showPaymentMenu={showPaymentMenu}
      handlePaymentMenu={() => setShowPaymentMenu((oldVal) => !oldVal)}
      handlePaymentTokenReceive={handlePaymentTokenReceive}
      uploadDetails={uploadDetails}
      uploadTrackRef={uploadTrackRef}
      uploadTrackThumbRef={uploadTrackThumbRef}
      handleTrackFileUpload={handleTrackFileUpload}
      cancelTrackUpload={cancelTrackUpload}
      handelCancelTrackUpload={handleCancelTrackUpload}
      handleActivateProYearlyAccount={handleActivateProYearlyAccount}
      activateProYearly={activateProYearly}
    />
  );
}
