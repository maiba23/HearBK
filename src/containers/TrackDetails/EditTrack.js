import { Drawer } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Styles from "../../components/Musicians/Styles";
import EditTrackComponent from "../../components/TrackDetailsComponent/EditTrack/EditTrackComponent";
import { getGenres, getStylesForGenre } from "../../state/actions/preferencesActions";
import { handleEditTrack, handleDeleteTrack } from "../../state/actions/trackAction";
import { getSelectedTrack } from "../../state/actions/homeAction";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { useHistory } from "react-router-dom";
import { getUserTrackStats } from "../../state/actions/userActions";
import { decodeErrorMessage } from "../../utils";

export default function EditTrack({ open, handleClose, selectedTrack }) {
  const [trackName, setTrackName] = React.useState("");
  const [trackAuthor, setTrackAuthor] = React.useState("");
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.preferences.genres);
  const styles = useSelector((state) => state.preferences.styles);
  const [showStyles, setShowStyles] = React.useState(false);
  const [selectedStyles, setSelectedStyles] = React.useState([]);
  const history = useHistory();

  const [trackExistingCover, setTrackExistingCover] = React.useState(null);
  const [selectedCover, setSelectedCover] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  const [selectedGenreMultiple, setSelectedGenreMultiple] = React.useState([]);

  const handleCoverDrop = (files) => {
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
  };

  const handleClearCover = () => {
    setSelectedCover(null);
    setTrackExistingCover(null);
  };

  React.useEffect(() => {
    if (open) {
      if(typeof selectedTrack?.genreId[0] !== "string"){
        setSelectedGenreMultiple(selectedTrack?.genreId);
      }
      setTrackName(selectedTrack?.trackTitle);
      setTrackAuthor(selectedTrack?.trackAuthor);
      if (selectedTrack?.trackCoverUrl) setTrackExistingCover(selectedTrack?.trackCoverUrl);
      if (selectedTrack?.genreId && !!selectedTrack?.genreId?.length) setSelectedGenre({ _id: selectedTrack?.genreId[0] });
      if (selectedTrack?.styleId && !!selectedTrack?.styleId?.length) setSelectedStyles(selectedTrack?.styleId);
    }
  }, [selectedTrack, open]);

  const handleTrackName = (e) => {
    setTrackName(e?.target?.value);
  };

  const handleTrackAuthor = (e) => {
    setTrackAuthor(e?.target?.value);
  };

  React.useEffect(() => {
    if (open && !genres?.length) dispatch(getGenres());
  }, [open]);

  React.useEffect(() => {
    if (selectedGenre) {
      dispatch(getStylesForGenre(selectedGenre?._id));
    }
  }, [selectedGenre]);

  const handleGenre = (genre) => {
    setSelectedGenre(genre);

    // for multiple genres
    if (selectedGenreMultiple.find((el) => el.id === genre?._id)) {
      setSelectedGenreMultiple((pV) => pV.filter((el) => el?.id !== genre?._id));
    } else {
      setSelectedGenreMultiple((pV) => [...pV, { id: genre?._id, styleId: [] }]);
      setShowStyles(true);
    }
    // end for multiple genres

    trackMixpanel(mixpanel_constant.edit_track_select_genre, { ...genre, trackTitle: selectedTrack?.trackTitle });
  };

  const handleStyles = () => {
    setShowStyles((pV) => !pV);
  };

  const handleStylesSelect = React.useCallback(
    (styleId) => {
      // multiple genres
      let findGenre = selectedGenreMultiple.find((el) => el.id === selectedGenre?._id);
      if (findGenre && findGenre?.styleId?.includes(styleId)) {
        findGenre.styleId = findGenre.styleId.filter((sid) => sid !== styleId);
      } else {
        findGenre.styleId = [...findGenre.styleId, styleId];
      }
      setSelectedGenreMultiple((pV) => [...pV.filter((el) => el.id !== selectedGenre?._id), findGenre]);
      // multiple genres

      console.log(selectedGenreMultiple);
    },
    [selectedGenreMultiple, selectedGenre, setSelectedGenreMultiple]
  );

  const handleSave = async () => {
    const payload = {
      trackTitle: trackName,
      trackAuthor: trackAuthor,
      genreId: selectedGenreMultiple,
    };

    trackMixpanel(mixpanel_constant.edit_track_submit, { ...payload, trackTitle: selectedTrack?.trackTitle });

    handleEditTrack(payload, selectedTrack, selectedCover)
      .then(() => {
        dispatch(getSelectedTrack(selectedTrack._id));
        trackMixpanel(mixpanel_constant.edit_track_success, { ...payload, trackTitle: selectedTrack?.trackTitle });
        handleClose();
      })
      .catch((err) => {
        trackMixpanel(mixpanel_constant.edit_track_error, {
          ...payload,
          trackTitle: selectedTrack?.trackTitle,
          error: JSON.stringify(err),
        });
      });
  };

  const handleTrackDelete = React.useCallback(async () => {
    setDeleteLoading(true);
    try {
      await handleDeleteTrack(selectedTrack?._id);
      setDeleteLoading(false);
      dispatch(getUserTrackStats());
      history.push("/dashboard");
    } catch (err) {
      setDeleteLoading(false);
      toast.error(decodeErrorMessage(err));
    }
  }, [selectedTrack, handleDeleteTrack, setDeleteLoading, decodeErrorMessage, getUserTrackStats, dispatch, history]);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <EditTrackComponent
          handleClose={handleClose}
          trackName={trackName}
          handleTrackName={handleTrackName}
          handleTrackAuthor={handleTrackAuthor}
          trackAuthor={trackAuthor}
          genres={genres}
          selectedGenre={selectedGenre}
          styles={styles}
          deleteLoading={deleteLoading}
          handleTrackDelete={handleTrackDelete}
          selectedStyles={selectedStyles}
          handleGenre={handleGenre}
          handleSave={handleSave}
          handleCoverDrop={handleCoverDrop}
          selectedCover={selectedCover}
          trackExistingCover={trackExistingCover}
          handleClearCover={handleClearCover}
          selectedGenreMultiple={selectedGenreMultiple}
        />
      </Drawer>
      <Drawer anchor="right" open={showStyles} onClose={handleStyles}>
        <Styles
          onClose={handleStyles}
          handleStylesSelect={handleStylesSelect}
          styles={styles}
          selectedStyles={selectedGenreMultiple.find((el) => el?.id == selectedGenre?._id)?.styleId}
          selectedGenre={selectedGenre}
        />
      </Drawer>
    </>
  );
}
