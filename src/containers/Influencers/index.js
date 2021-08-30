import { Drawer } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfluencerComponent from "../../components/InfluencerComponent";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { setOpenProfileDispatch, setSelectedProfile } from "../../state/actions/homeAction";
import { getInfluencers, getRoles, getSuggestedListeners } from "../../state/actions/listenerActions";
import Profile from "../Profile";
import RequestReview from "./RequestReview";

const Influencers = () => {
  const dispatch = useDispatch();
  const influencers = useSelector(state => state.listeners.influencers);
  const openProfile = useSelector(state => state.home.openProfile);
  const user = useSelector(state => state.userDetails.user);
  const [showRequestReview, setShowRequestReview] = React.useState(false);

  const [state, setState] = useState({
    searchValue: "",
    allData: [],
  });

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    dispatch(getInfluencers());
  }, []);

  useEffect(() => {
      const influencerList = influencers?.filter(el=>el?._id !== user?._id);
      setState({ ...state, allData: influencerList });
  }, [influencers, user]);

  const handleOpenProfile = useCallback(
    userData => {
      if (userData) {
        dispatch(setSelectedProfile({ ...userData }));
        trackMixpanel(mixpanel_constant.view_influencer_profile, { ...userData });
      }
      dispatch(setOpenProfileDispatch(!openProfile));
    },
    [openProfile, trackMixpanel, mixpanel_constant]
  );

  const handleCloseProfile = () => {
    dispatch(setOpenProfileDispatch(null));
  };

  const searchData = event => {
    let text = event.target.value;
    trackMixpanel(mixpanel_constant.search_influencer, { searchTest: text });
    if (text) {
      var tempData = JSON.parse(JSON.stringify(influencers));
      tempData = tempData.filter(data => data.display_name.toLowerCase().includes(text.toLowerCase()));
      setState({ ...state, allData: tempData, searchValue: event.target.value });
    } else {
      setState({ ...state, allData: influencers, searchValue: event.target.value });
    }
  };

  const handleOpenReviewRequest = React.useCallback(() => {
    setShowRequestReview(true);
    trackMixpanel(mixpanel_constant.influencer_request_review_open, { ...openProfile });
  }, [setShowRequestReview, trackMixpanel, mixpanel_constant, openProfile]);

  const handleClearSearch = () => {
    dispatch(getSuggestedListeners());
    setState({ ...state, searchValue: "" });
  };

  return (
    <>
      <InfluencerComponent
        state={state}
        handleOnChange={searchData}
        handleOpenProfile={handleOpenProfile}
        handleClearSearch={handleClearSearch}
      />
      <Drawer anchor="right" open={!!openProfile} onClose={handleCloseProfile}>
        <Profile onClose={handleCloseProfile} handleOpenReviewRequest={handleOpenReviewRequest} />
      </Drawer>
      <RequestReview open={showRequestReview} handleClose={() => setShowRequestReview(false)} />
    </>
  );
};

export default Influencers;
