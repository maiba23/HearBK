import React, { useState } from "react";
import { useLocation } from "react-use";
import { notification } from 'antd';
import moment from "moment";
import cx from 'classnames';
import DefaultTrack from "../../../../assets/img/dashboard/default-track.png";
import DefaultUserPic from "../../../../assets/img/dashboard/default-user-pic.png";
import { ReactComponent as Share } from '../../../../assets/icon/share.svg';
import { ReactComponent as Bell } from '../../../../assets/icon/bell.svg';
import "./profiletab.style.scss";

const CustomRoomCard = ({ userData, roomData, handleRoomSubscribe }) => {
  const { _id, has_started, room_banner_image, room_title, start_time, owner_details, subscribed_to_start } = roomData;
  const isSubscribed = subscribed_to_start?.includes(userData._id);
  const [subscribed, setSubscribed] = useState(isSubscribed);

  const location = useLocation();

  const handleShare = () => {
    const roomUrl = `${location.origin}/event/${roomData._id}`;
    if (navigator.share) {
      navigator.share({
        title: 'Share this room',
        url: roomUrl
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      notification.open({
        className: 'notification',
        message: 'Share this room',
        duration: 0,
        description: <p>
          Please copy and share this link:<br />
          <strong style={{ wordWrap: 'break-word' }}>{roomUrl}</strong>
        </p>,
        placement: 'topRight',
        getContainer: () => document.getElementsByClassName('room-list-container')[0]
      });
    }
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    if (handleRoomSubscribe) {
      handleRoomSubscribe(roomData._id, !subscribed)
    }
  };

  return (
    <div
      className="room-card-root-container"
      style={{ background: `url(${room_banner_image || DefaultTrack})` }}
    >
      <div className="bottomFade" />
      <div className="room-card-view-container">
        <div className="room-card-header-container">
          <div className="room-card-header-item">
            <img className="userpic" alt="Room Owner" src={roomData.owner_details.profile_image || DefaultUserPic} />
          </div>
          <div className="flexRow">
            <div className="room-card-header-item" onClick={handleShare} style={{ marginRight: "0.75rem" }}>
              <Share className="room-card-header-icon" />
            </div>
            <div className={cx("room-card-header-item", subscribed && "room-card-header-item-active")} onClick={handleSubscribe}>
              <Bell />
            </div>
          </div>
        </div>
        <div className="room-info-container">
          <span className="room-title-text">{room_title}</span>
          <span className="room-by-text">By: {owner_details.display_name}</span>
          <span className="room-time-text">{moment.utc(start_time, 'YYYY-MM-DD HH:mm:ss').local().format('MMMM DD, YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomRoomCard;
