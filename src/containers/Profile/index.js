import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileComponent from "../../components/Profile";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { getUserProfile, doFollow, doUnFollow } from "../../state/actions/profileActions";

const Profile = ({ onClose, handleOpenReviewRequest }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.home.selectedUserProfile);
  const profileDetails = useSelector((state) => state.profile.profileDetails || {});
  const userDetails = useSelector((state) => state.userDetails.user);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(selectedUser.user_name));
  }, [selectedUser]);

  useEffect(() => {
    if (profileDetails?.followers?.length > 0) {
      const data = profileDetails.followers.filter((obj) => userDetails?._id === obj?.id);
      setFollow(data.length > 0);
    } else {
      setFollow(false);
    }
  }, [profileDetails, userDetails]);

  const handleOnFollow = () => {
    if (!follow) {
      doFollow(profileDetails._id).then(() => dispatch(getUserProfile(selectedUser.user_name)));
      trackMixpanel(mixpanel_constant.influencer_follow, { ...profileDetails });
    } else {
      doUnFollow(profileDetails._id).then(() => dispatch(getUserProfile(selectedUser.user_name)));
      trackMixpanel(mixpanel_constant.influencer_unfollow, { ...profileDetails });
    }
  };

  return (
    <ProfileComponent
      onClose={onClose}
      handleOpenReviewRequest={handleOpenReviewRequest}
      profileDetails={profileDetails}
      follow={follow}
      handleOnFollow={handleOnFollow}
    />
  );
};

export default Profile;
