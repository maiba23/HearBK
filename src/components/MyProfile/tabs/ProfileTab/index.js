import React from "react";
import ProfileSection from "./ProfileSection";
import BioSection from "./BioSection";
import RoleSection from "./RoleSection";
import RoleListComponent from "./RoleListComponent";
import CustomDrawer from "../../../../common/CustomDrawer";
import CloseIcon from "../../../../assets/img/Close.png";
import PeopleListComponent from "./PeopleListComponent";
import "./profiletab.style.scss";
import EditProfileContainer from "./EditProfileDrawer";

const ProfileTab = ({
  showBioEditor,
  toggleBioEditor,
  rolesList,
  userData,
  openDrawer,
  handleOnCloseDrawer,
  userList,
  toggleFollowerOrFollowingDrawer,
  showUserMode,
  searchValue,
  handleOnClearSearch,
  handleOnChangeSearchText,
  handleOnChangeFollowDrawerTab,
  selectedFollowingDrawerTab,
  openEditProfileDrawer,
  uploadUserImage,
  handleOnResend,
  handlePhoneVerify,
  editProfileData,
  handleOnEditUserData,
  handleOnSaveEditProfile,
  handleOnUpdateBio,
  roomData,
  handleRoomSubscribe,
  selectedRole,
  selectedSubRole,
  handleRoleSelect,
  handleSubroleSelect,
  handleOnFollow,
  checkIfFollowed,
  isInvalidPhoneNumber
}) => {
  const renderDrawerComponent = (type) => {
    switch (type) {
      case "viewUsers":
        return (
          <PeopleListComponent
            userData={userData}
            userList={userList}
            handleOnFollow={handleOnFollow}
            checkIfFollowed={checkIfFollowed}
            onClose={handleOnCloseDrawer}
            type={showUserMode}
            handleOnChangeSearchText={handleOnChangeSearchText}
            handleClearSearch={handleOnClearSearch}
            searchValue={searchValue}
            handleOnChangeFollowDrawerTab={handleOnChangeFollowDrawerTab}
            selectedFollowingDrawerTab={selectedFollowingDrawerTab}
            roomData={roomData}
            handleRoomSubscribe={handleRoomSubscribe}
          />
        );
      case "editProfile":
        return (
          <EditProfileContainer
            handleOnResend={handleOnResend}
            handlePhoneVerify={handlePhoneVerify}
            countryCode={editProfileData.countryCode}
            handleOnEditData={handleOnEditUserData}
            handleOnSaveEditProfile={handleOnSaveEditProfile}
            data={editProfileData}
            isInvalidPhoneNumber={isInvalidPhoneNumber}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="profiletab-root-container">
        <div>
          <ProfileSection
            displayName={userData?.display_name || ""}
            followers={userData?.followers || []}
            following={userData?.following || []}
            notesScore={userData?.musicNotes || 0}
            profileImage={userData?.profile_image || null}
            toggleFollowerOrFollowingDrawer={toggleFollowerOrFollowingDrawer}
            openEditProfileDrawer={openEditProfileDrawer}
            uploadUserImage={uploadUserImage}
            listenerLevel={userData?.listener_level || {}}
            tracksRated={userData?.tracksRated || 0}
          />
          <BioSection
            bioData={userData?.bio || ""}
            showBioEditor={showBioEditor}
            toggleBioEditor={toggleBioEditor}
            handleOnUpdateBio={handleOnUpdateBio}
            listenerStartTimeline={userData?.listener_start_timeline || []}
          />
          <RoleSection
            rolesList={rolesList}
            selectedRole={selectedRole}
            selectedSubRole={selectedSubRole}
            handleRoleSelect={handleRoleSelect}
            handleSubroleSelect={handleSubroleSelect}
          />
        </div>
      </div>
      <CustomDrawer open={openDrawer.isOpen} handleOnClose={handleOnCloseDrawer}>
        <div className="roles-drawer">
          <div className="drawer-header">
            <img src={CloseIcon} className="close-icon" onClick={handleOnCloseDrawer} />
          </div>
          {renderDrawerComponent(openDrawer.type)}
        </div>
      </CustomDrawer>
    </>
  );
};

export default ProfileTab;
