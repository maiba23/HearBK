import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cx from "classnames";
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { Box } from "@material-ui/core";
import { BRANCH_DOMAIN } from '../../config';
import { getRoomPreview } from '../../state/actions/roomActions';
import Logo from '../../assets/img/header_logo.png';
import { ReactComponent as AppleStore } from "../../assets/img/app-store-button.svg";
import { ReactComponent as GoogleStore } from "../../assets/img/gp-button.svg";
import './room.styles.scss';

const RoomPreview = () => {
  const dispatch = useDispatch();
  
  const [roomData, setRoomData] = useState(null);

  const params = useParams();

  useEffect(() => {
    dispatch(getRoomPreview(params.roomId))
      .then((requestData) => {
        setRoomData(requestData);
      });
  }, [params.roomId, dispatch]);

  const handleLink = (link) => {
    window.open(link, '_blank')
  }

  if (!roomData) return null;
  
  return (
    <div className={cx("room_preview")}>
      <Box display="flex" alignItems="center" justifyContent="space-between" className={cx("header")}>
        <img src={Logo} alt="Breaker Nation" className={cx("header_logo")} />
        <a href={`${BRANCH_DOMAIN}/open-in-app?roomId=${roomData._id}`} className={cx("header_link")}>OPEN IN APP</a>
      </Box>  
      <Box className={cx("content")}>
        <div className={cx('wrapper')}>
          <div className={cx("imgWrapper")} style={{ backgroundImage: `url(${roomData.room_banner_image})` }}>
            <div className={cx("bottomFade")} />
            <Box m={3} zIndex={1}>
              <p className={cx("roomTitle")}>{roomData.room_title}</p>
              <p className={cx("roomAuthor")}>By {roomData?.owner_details?.display_name}</p>
              <p className={cx("roomStartTime")}>{moment.utc(roomData?.start_time, 'YYYY-MM-DD HH:mm:ss').local().calendar()}</p>
            </Box>
          </div>
          <p className={cx("subtitle")}>Guests & co-hosts</p>
          <div className={cx("coHosts")}>
            {roomData.co_hosts?.map(user => user?.user_name ? <img className={cx("userPic")} key={user.user_name} alt={user.display_name} src={user.profile_image} /> : null)}
          </div>
          <p className={cx("subtitle")}>Room info</p>
          <p className={cx("roomDescription")}>{roomData.room_description}</p>
          <p className={cx("subtitle")}>Interested</p>
          <div className={cx("coHosts")}>
            {roomData.approved_to_stage?.map(user => <img className={cx("userPic")} key={user.user_name} alt={user.display_name} src={user.profile_image} />)}
          </div>
          <div className={cx("appHint")}>
            <p>
              Don't have a BREAKER NATION account?
              <br/>
              Get the app!
            </p>
            <AppleStore onClick={() => handleLink('https://apps.apple.com/us/app/breaker-nation/id1533950005')} className={cx("store-button")} />
            <GoogleStore onClick={() => handleLink('https://play.google.com/store/apps/details?id=com.breakernation')} className={cx("store-button")} />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default RoomPreview;
