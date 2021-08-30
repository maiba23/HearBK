import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileTab from "../../../../components/MyProfile/tabs/ProfileTab";
import { getRoles } from "../../../../state/actions/listenerActions";
import { uploadUserProfile, getUserDetails, sendVerificationSMS, verifyOtp, updateUserData } from "../../../../state/actions/userActions";
import { getAllRooms, roomSubscription } from "../../../../state/actions/roomActions";
import { toast } from "react-toastify";
import { trackMixpanel } from "../../../../mixpanel";
import mixpanel_constant from "../../../../mixpanel/mixpanel.constants";
import { doFollow, doUnFollow } from "../../../../state/actions/profileActions";

const ProfileTabComponent = () => {
  const dispatch = useDispatch();
  const rolesList = useSelector((state) => state.listeners.rolesList || []);
  const userData = useSelector((state) => state.userDetails?.user || {});
  const roomData = useSelector((state) => state.roomDetails?.allRooms || []);
  const [showBioEditor, setShowBioEditor] = useState(false);
  const [openDrawer, setOpenDrawer] = useState({ isOpen: false, type: "" });
  const [showUserMode, setShowUserMode] = useState(""); // show user list => following / follower
  const [userList, setUserList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFollowingDrawerTab, setSelectedFollowingDrawerTab] = useState(0);
  const [selectedRole, setSelectedRole] = React.useState([]);
  const [selectedSubRole, setSelectedSubRole] = React.useState([]);
  const [roleChanged, setRoleChanged] = React.useState(null);
  const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);

  const checkIfFollowed = React.useCallback(
    (user_id) => {
      const followUser = userData?.following?.find((el) => el?.id === user_id);
      console.log("follow user", user_id, followUser);
      if (followUser) return true;
      else return false;
    },
    [userData]
  );

  React.useEffect(() => {
    if (userData?.listener_roles && !!userData?.listener_roles?.length) {
      setSelectedRole(userData?.listener_roles);
    }
    if (userData?.listener_sub_roles && !!userData?.listener_sub_roles?.length) {
      setSelectedSubRole(userData?.listener_sub_roles.map((el) => ({ _id: el })));
    }
  }, [userData]);

  const handleRoleSelect = React.useCallback(
    (roleItem) => {
      const isRoleSelected = selectedRole?.includes(roleItem?._id);
      if (isRoleSelected) {
        setSelectedRole(selectedRole?.filter((el) => el !== roleItem?._id));
        let subRolestoRemoveList = roleItem?.subRoles?.map(subRoleItem => subRoleItem?._id) || []
        setSelectedSubRole(selectedSubRole?.filter((el) => !subRolestoRemoveList.includes(el?._id) ));
      } else {
        trackMixpanel(mixpanel_constant.profile_select_roles, { ...roleItem });
        let prevRoles = [...selectedRole];
        if (selectedRole.length > 1) {
          let allSubRole = rolesList?.find((el) => el._id === prevRoles[0])?.subRoles;
          allSubRole = allSubRole?.map((item) => item._id);
          setSelectedSubRole(selectedSubRole?.filter((el) => !allSubRole?.includes(el._id)));
          prevRoles = prevRoles?.filter((_, index) => index > 0);
        }
        setSelectedRole([...prevRoles, roleItem?._id]);
      }
      setTimeout(() => setRoleChanged((pC) => !!!pC), 150);
    },
    [
      selectedRole,
      trackMixpanel,
      mixpanel_constant,
      selectedSubRole,
      setSelectedRole,
      setSelectedSubRole,
      setRoleChanged,
      setTimeout,
      rolesList,
    ]
  );

  const handleSubroleSelect = React.useCallback(
    (subroleItem, isRoleSelected, roleId, subRolesList) => {
      const isSubRoleSelected = selectedSubRole.find((el) => el?._id === subroleItem?._id);
      if (isSubRoleSelected) {
        setSelectedSubRole(selectedSubRole.filter((el) => el?._id !== subroleItem?._id));
      } else {
        if (!isRoleSelected) {
          subRolesList = subRolesList.map(subRole => subRole._id)

          let selectedRolesArray = JSON.parse(JSON.stringify(selectedRole))
          let selectedSubRolesArray = JSON.parse(JSON.stringify(selectedSubRole))
          if (selectedRolesArray.length === 2) {
   
            subRolesList =  rolesList?.find((el) => el._id === selectedRolesArray[0])?.subRoles
            subRolesList = subRolesList.map(subRole => subRole._id)
            selectedSubRolesArray = selectedSubRolesArray?.filter((el) => !subRolesList.includes(el?._id))
            selectedRolesArray.shift()
            selectedRolesArray.push(roleId)
            selectedSubRolesArray.push({ _id: subroleItem?._id })
            setSelectedSubRole(selectedSubRolesArray);
            setSelectedRole(selectedRolesArray);
          } else {
            selectedRolesArray.push(roleId)
            selectedSubRolesArray.push({ _id: subroleItem?._id })
            setSelectedRole(selectedRolesArray);
            setSelectedSubRole(selectedSubRolesArray)
          }

        } else {
          trackMixpanel(mixpanel_constant.profile_select_sub_roles, { ...subroleItem });
          setSelectedSubRole((pR) => [...pR, subroleItem]);
        }
      }
      setTimeout(() => setRoleChanged((pC) => !!!pC), 150);
    },
    [setSelectedSubRole, trackMixpanel, mixpanel_constant, selectedSubRole, setTimeout, setRoleChanged,rolesList]
  );

  const [editProfileData, setEditProfileData] = useState({
    countryCode: "",
    phoneNumber: "",
    type: "editData", // editData or verifyPhone
  });

  const toggleBioEditor = useCallback(() => {
    if (!showBioEditor) {
      trackMixpanel(mixpanel_constant.click_edit_bio, {});
    }
    setShowBioEditor(!showBioEditor);
  }, [showBioEditor, trackMixpanel, mixpanel_constant]);

  const toggleDrawer = (open, type) => {
    if (type === "editProfile") {
      const phoneNumber = userData?.phone_number?.substr(userData.phone_number.length - 10);
      const countryCode = userData?.phone_number?.split(phoneNumber)[0];

      const editProfilePayload = {
        countryCode,
        phoneNumber,
        type: "editData",
        email: userData.email,
        userName: userData.user_name,
        displayName: userData.display_name,
      };
      setEditProfileData(editProfilePayload);
      trackMixpanel(mixpanel_constant.edit_profile_open, editProfilePayload);

      if (isInvalidPhoneNumber) setIsInvalidPhoneNumber(false);
    }

    setOpenDrawer({ isOpen: open, type });
  };

  const handleOnCloseDrawer = () => {
    setOpenDrawer({ isOpen: false, type: "" });
  };

  const toggleFollowerOrFollowingDrawer = (type = "following") => {
    setUserList(userData[type]);
    if (type === "following") {
      trackMixpanel(mixpanel_constant.view_following_list, {});
      dispatch(getAllRooms());
    } else {
      trackMixpanel(mixpanel_constant.view_followers_list, {});
    }

    setShowUserMode(type);
    setOpenDrawer({ isOpen: true, type: "viewUsers" });
  };

  const handleOnChangeSearchText = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOnChangeFollowDrawerTab = (event, value) => {
    setSelectedFollowingDrawerTab(value);
  };

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    if (showUserMode) {
      if (searchValue?.length) {
        const userDataArray = JSON.parse(JSON.stringify(userData));

        setUserList(
          userDataArray[showUserMode]?.filter((userItem) =>
            userItem?.display_name?.toLowerCase()?.includes(searchValue?.toLowerCase() || "")
          )
        );
      } else {
        setUserList(userData[showUserMode]);
      }
    }
  }, [searchValue, userData, showUserMode]);

  useEffect(() => {
    setRoomList(roomData?.filter((el) => el?.room_title?.toLowerCase()?.includes(searchValue?.toLowerCase() || "")));
  }, [roomData, searchValue]);

  const uploadUserImage = async (imageFile) => {
    if (!imageFile) {
      return;
    }
    trackMixpanel(mixpanel_constant.change_profile_picture_submit, { name: imageFile[0]?.name, size: imageFile[0]?.size });
    try {
      await uploadUserProfile(imageFile[0], userData._id);
      dispatch(getUserDetails(true));
      trackMixpanel(mixpanel_constant.change_profile_picture_success, { name: imageFile[0]?.name, size: imageFile[0]?.size });
    } catch (error) {
      trackMixpanel(mixpanel_constant.change_profile_picture_error, {
        name: imageFile[0]?.name,
        size: imageFile[0]?.size,
        error: JSON.stringify(error),
      });
    }
  };

  const handleOnResend = async (shouldTrackResend = true) => {
    const { countryCode, phoneNumber } = editProfileData;
    const number = `${countryCode}${phoneNumber}`;

    if (shouldTrackResend) {
      trackMixpanel(mixpanel_constant.edit_profile_change_phone_resend_otp, { phoneNumber: number });
    }

    try {
      await sendVerificationSMS(number);
      trackMixpanel(mixpanel_constant.edit_profile_change_phone_send_otp_success, { phoneNumber: number });
    } catch (error) {
      trackMixpanel(mixpanel_constant.edit_profile_change_phone_send_otp_error, { phoneNumber: number, error: JSON.stringify(error) });
      toast.error("Failed to send the verification code. Please try again!");
    }
  };

  const handlePhoneVerify = async (OTP) => {
    const { countryCode, phoneNumber, email } = editProfileData;
    const number = `${countryCode}${phoneNumber.trim()}`;

    try {
      await verifyOtp(number, OTP, email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnEditUserData = (e, type) => {
    setEditProfileData({ ...editProfileData, [type]: e.target.value });
    if (type === "phoneNumber" && isInvalidPhoneNumber) {
      setIsInvalidPhoneNumber(false);
    }
  };

  const handleOnSaveEditProfile = () => {
    const { userName, email, displayName, countryCode, phoneNumber } = editProfileData;

    if (phoneNumber.length !== 10) {
      setIsInvalidPhoneNumber(true);
      return;
    }

    if (userData.phone_number !== countryCode + phoneNumber) {
      setEditProfileData({ ...editProfileData, type: "verifyPhone" });
      trackMixpanel(mixpanel_constant.edit_profile_change_phone, {
        newNumber: countryCode + phoneNumber,
        oldNumber: userData?.phone_number,
      });
      handleOnResend(false);
    } else {
      setOpenDrawer({ isOpen: false, type: "" });
      const payload = { user_name: userName, email, display_name: displayName };
      trackMixpanel(mixpanel_constant.edit_profile_submit, payload);
      dispatch(updateUserData(payload, true));
    }
  };

  const handleSubmitRoles = () => {
    const payload = {
      listener_roles: selectedRole,
      listener_sub_roles: selectedSubRole?.map((el) => el?._id),
    };
    dispatch(updateUserData(payload));
  };

  React.useEffect(() => {
    if (roleChanged !== null) handleSubmitRoles();
    console.log("role changed", roleChanged);
  }, [roleChanged]);

  const handleOnUpdateBio = (bio) => {
    dispatch(updateUserData({ bio }, true));
    trackMixpanel(mixpanel_constant.change_bio_submit, { bio });
    toggleBioEditor();
  };

  const handleOnFollow = (user_id, isFollow) => {
    console.log(isFollow);
    if (isFollow) {
      doFollow(user_id).then(() => dispatch(getUserDetails(true)));
    } else {
      doUnFollow(user_id).then(() => dispatch(getUserDetails(true)));
    }
  };

  const handleRoomSubscribe = (roomId, subscription) => {
    dispatch(roomSubscription(roomId, subscription));
    dispatch(getAllRooms());
  };

  return (
    <ProfileTab
      showBioEditor={showBioEditor}
      toggleBioEditor={toggleBioEditor}
      rolesList={rolesList}
      userData={userData}
      handleOnFollow={handleOnFollow}
      checkIfFollowed={checkIfFollowed}
      openDrawer={openDrawer}
      toggleDrawer={toggleDrawer}
      handleOnCloseDrawer={handleOnCloseDrawer}
      userList={userList}
      toggleFollowerOrFollowingDrawer={toggleFollowerOrFollowingDrawer}
      showUserMode={showUserMode}
      searchValue={searchValue}
      handleOnClearSearch={() => setSearchValue("")}
      handleOnChangeSearchText={handleOnChangeSearchText}
      handleOnChangeFollowDrawerTab={handleOnChangeFollowDrawerTab}
      selectedFollowingDrawerTab={selectedFollowingDrawerTab}
      openEditProfileDrawer={toggleDrawer}
      uploadUserImage={uploadUserImage}
      handleOnResend={handleOnResend}
      handlePhoneVerify={handlePhoneVerify}
      editProfileData={editProfileData}
      handleOnEditUserData={handleOnEditUserData}
      handleOnSaveEditProfile={handleOnSaveEditProfile}
      handleOnUpdateBio={handleOnUpdateBio}
      roomData={roomList}
      handleRoomSubscribe={handleRoomSubscribe}
      selectedRole={selectedRole}
      selectedSubRole={selectedSubRole}
      handleRoleSelect={handleRoleSelect}
      handleSubroleSelect={handleSubroleSelect}
      isInvalidPhoneNumber={isInvalidPhoneNumber}
    />
  );
};

export default ProfileTabComponent;
