import React from "react";
import PeopleCard from "./PeopleCard";
import { ReactComponent as Search } from "../../../../assets/img/dashboard/search.svg";
import { ReactComponent as Clear } from "../../../../assets/img/musician/clear input.svg";
import CustomSliderTab from "../../../../common/CustomSliderTab";
import CustomRoomCard from "./CustomRoomCard";
import { FOLLOWING_TABS } from "../../constants";
import cx from "classnames";
import "./profiletab.style.scss";

const PeopleListComponent = ({
  userData,
  userList = [],
  onClose,
  type,
  handleOnChangeSearchText,
  handleClearSearch,
  searchValue,
  handleOnChangeFollowDrawerTab,
  selectedFollowingDrawerTab,
  roomData,
  handleRoomSubscribe,
  handleOnFollow,
  checkIfFollowed,
}) => {
  const isFollower = type === "followers";

  return (
    <>
      <span className="people-list-header-text">{isFollower ? "Followers" : "Following"}</span>
      <div className="search-bar-root-container">
        <div className="search-input-container">
          <span>
            <Search />
          </span>
          <input
            type="text"
            id="searchValue"
            className="search-input"
            value={searchValue}
            onChange={handleOnChangeSearchText}
            placeholder="Search by name..."
          />
          {searchValue?.length ? <Clear className="clear-button" onClick={handleClearSearch} /> : <div />}
        </div>
      </div>
      {!isFollower && (
        <div>
          <CustomSliderTab
            tabList={FOLLOWING_TABS}
            value={selectedFollowingDrawerTab}
            handleOnChange={handleOnChangeFollowDrawerTab}
            customStyle={"sliderContainer"}
          />
        </div>
      )}
      <div className={cx("profile-list-container", selectedFollowingDrawerTab === 1 && "room-list-container")}>
        {selectedFollowingDrawerTab === 0
          ? userList.map((user) => (
              <PeopleCard
                key={user?.id}
                user_id={user?.id}
                checkIfFollowed={() => checkIfFollowed(user?.id)}
                handleOnFollow={handleOnFollow}
                displayName={user?.display_name || ""}
                profileImage={user?.profile_image || null}
              />
            ))
          : roomData.map((room) => (
              <CustomRoomCard
                userData={userData}
                key={room._id}
                roomData={room}
                handleRoomSubscribe={handleRoomSubscribe}
              />
            ))}
      </div>
    </>
  );
};

export default PeopleListComponent;
