import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfluencerSettingComponent from "../../../../components/MyProfile/tabs/InfluencerSetting";
import { trackMixpanel } from "../../../../mixpanel";
import mixpanel_constant from "../../../../mixpanel/mixpanel.constants";
import { updateUserData } from "../../../../state/actions/userActions";

const InfluencerSettingContainer = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    headline: "",
    price: "",
    filter: "",
  });
  const userDetails = useSelector((state) => state.userDetails.user);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [showQualityControlDetails, setShowQualityControlDetails] = React.useState(false);

  useEffect(() => {
    setState({
      ...state,
      headline: userDetails?.headline || "",
      price: userDetails?.price || "",
      filter: userDetails?.required_review_rating || "0",
    });
  }, [userDetails]);

  const handleChangeState = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const handleSetFilterValue = (event, newValue) => {
    setState({ ...state, filter: newValue });
  };

  const handleUpdateProfile = () => {
    const payload = {
      headline: state.headline || "",
      price: state.price || "",
      required_review_rating: parseInt(state.filter || 0),
    };
    setSaveLoading(true);
    trackMixpanel(mixpanel_constant.profile_influencer_tab_edit_details_submit, payload);
    dispatch(updateUserData(payload))
      .then((res) => {
        setSaveLoading(false);
        trackMixpanel(mixpanel_constant.profile_influencer_tab_edit_details_success, payload);
      })
      .catch((err) => {
        setSaveLoading(false);
        trackMixpanel(mixpanel_constant.profile_influencer_tab_edit_details_error, { ...payload, error: JSON.stringify(err) });
      });
  };

  return (
    <InfluencerSettingComponent
      handleSetFilterValue={handleSetFilterValue}
      handleChangeState={handleChangeState}
      state={state}
      showQualityControlDetails={showQualityControlDetails}
      setShowQualityControlDetails={setShowQualityControlDetails}
      handleUpdateProfile={handleUpdateProfile}
      waitlist={userDetails?.waitlist}
      saveLoading={saveLoading}
    />
  );
};

export default InfluencerSettingContainer;
