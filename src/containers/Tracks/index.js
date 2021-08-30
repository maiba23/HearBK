import React, { useState, useCallback, useEffect } from "react";
import TrackComponent from "../../components/TrackComponent";
import { TRACK_STATUS } from "../../components/TrackComponent/constants";
import { useSelector, useDispatch } from "react-redux";
import { getUserTrackStats } from "../../state/actions/userActions";
import history from "../../history";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";

const Track = () => {
  const [status, setStatus] = useState(TRACK_STATUS[0]); // ALL TRACKS
  const dispatch = useDispatch();
  const userTracks = useSelector(state => state.userDetails.userTracks || []);
  const [trackList, setTrackList] = useState(userTracks);

  const handleOnStatusChange = useCallback(
    (event, value) => {
      if (value !== status) setStatus(TRACK_STATUS.find(trackItem => trackItem.value === value));
      if (value === TRACK_STATUS[1].value) trackMixpanel(mixpanel_constant.your_tracks_in_queue, {});
      if (value === TRACK_STATUS[2].value) trackMixpanel(mixpanel_constant.your_tracks_completed, {});
      if (value === TRACK_STATUS[0].value) trackMixpanel(mixpanel_constant.your_tracks_all_tracks, {});
    },
    [status]
  );

  useEffect(() => {
    if (userTracks.length) {
      const TRACKS = JSON.parse(JSON.stringify(userTracks));
      setTrackList(status.value !== TRACK_STATUS[0].value ? TRACKS.filter(trackItem => trackItem.status === status.value) : TRACKS);
    }
  }, [status, userTracks]);

  useEffect(() => {
    dispatch(getUserTrackStats());
  }, []);

  const handleOnClickAddTrack = () => {
    history.push("/dashboard/add-track");
  };

  const handleOnTrackClick = React.useCallback(
    trackItem => {
      trackMixpanel(mixpanel_constant.view_track_details, trackItem);
      history.push("/dashboard/tracks/" + trackItem._id);
    },
    [trackMixpanel, mixpanel_constant, history]
  );

  return (
    <>
      <TrackComponent
        selectedStatus={status}
        trackList={trackList}
        handleOnTrackClick={handleOnTrackClick}
        handleOnStatusChange={handleOnStatusChange}
        handleOnClickAddTrack={handleOnClickAddTrack}
      />
    </>
  );
};

export default Track;
