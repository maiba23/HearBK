import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import MusicianComponent from "../../components/Musicians/MusicianComponent";
import {
  submitPayment,
  uploadAudioFileToIPFS,
} from "../../state/actions/orderActions";
import {
  getGenres,
  getStylesForGenre,
} from "../../state/actions/preferencesActions";
import { ENUMS } from "../../utils";

const UserMusician = ({
  getGenresDispatchAction,
  genres,
  styles,
  getStylesDispatchAction,
}) => {
  const [state, setState] = React.useState({
    artistName: "",
    trackName: "",
    isAdvertisingCookieEnabled:
      localStorage.getItem("is-advertising-cookie-enabled") === "true",
    isAnalyticsCookieEnabled:
      localStorage.getItem("is-analytics-cookie-enabled") === "true",
    isCookieAccepted: localStorage.getItem("is-cookies-accepted") === "true",
  });

  const [errors, setErrors] = useState({
    artistName: false,
    trackName: false,
    selectedFile: false,
    selectedGenre: false,
  });

  const setErrorsFields = (state) => {
    setErrors({
      artistName: state.artistName.trim() === "",
      trackName: state.trackName.trim() === "",
      selectedFile: Boolean(!selectedFile),
      selectedGenre: Boolean(!selectedGenre),
    });
  };

  var history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [showStylesMenu, setShowStylesMenu] = useState(false);
  const [showPersonalizeContainer, setPersonalizeContainer] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  const handleChange = useCallback(
    (event) => {
      if (event.target.name) {
        setState({ ...state, [event.target.name]: event.target.checked });
      } else {
        setState({ ...state, [event.target.id]: event.target.value });
      }
    },
    [setState, state]
  );

  const handleOnAcceptAllCookies = useCallback(() => {
    localStorage.setItem("is-cookies-accepted", true);
    localStorage.setItem("is-advertising-cookie-enabled", true);
    localStorage.setItem("is-analytics-cookie-enabled", true);
    setPersonalizeContainer(false);
    setState({ ...state, isCookieAccepted: true });
  }, [state, setPersonalizeContainer]);

  const handleOnSavePreferences = useCallback(
    (data) => {
      localStorage.setItem("is-cookies-accepted", true);
      localStorage.setItem(
        "is-advertising-cookie-enabled",
        data.isAdvertisingCookieEnabled
      );
      localStorage.setItem(
        "is-analytics-cookie-enabled",
        data.isAnalyticsCookieEnabled
      );
      setPersonalizeContainer(false);
    },
    [setPersonalizeContainer]
  );

  useEffect(() => {
    getGenresDispatchAction();
  }, [getGenresDispatchAction]);

  useEffect(() => {
    if (selectedGenre) {
      getStylesDispatchAction(selectedGenre?._id);
    }
  }, [getStylesDispatchAction, selectedGenre]);

  useEffect(() => {
    if (styles?.length > 0) {
      setShowStylesMenu(true);
    }
  }, [styles.length]);

  const handleTrackDetailsUpdate = useCallback(
    (e) => {
      if (
        e &&
        e.target.id === "fileUpload" &&
        e.target.files &&
        e.target.files.length > 0
      ) {
        if (!e.target.files[0].name.endsWith(".mp3")) {
          toast.error("File type should be .mp3");
          return;
        }
        if (e.target.files[0].size / 1024 / 1024 >= 15) {
          toast.error("File size should be within 15mb");
          return;
        }
        setSelectedFile(e.target.files[0]);
      } else {
        setSelectedFile(null);
      }
    },
    [setSelectedFile]
  );

  const handleStylesSelect = useCallback(
    (styleId) => {
      if (selectedStyles.includes(styleId)) {
        setSelectedStyles(selectedStyles.filter((x) => x !== styleId));
      } else {
        setSelectedStyles([...selectedStyles, styleId]);
      }
    },
    [selectedStyles]
  );

  const handleGenreSelection = useCallback(
    (genre) => {
      setSelectedGenre(genre);
    },
    [setSelectedGenre]
  );

  const areFieldsValid = () => {
    const isValid =
      state.artistName.trim() !== "" &&
      state.trackName.trim() !== "" &&
      selectedFile &&
      selectedGenre;

    setErrorsFields(state);

    return isValid;
  };

  const handleOnSubmit = () => {
    if (!areFieldsValid()) {
      return;
    }
    submitPayment({
      tracks: [
        {
          trackTitle: state.trackName,
          mediaType: ENUMS.MEDIA_TYPE_FILEUPLOAD,
          genreId: [selectedGenre._id],
          styleId: selectedStyles
        },
      ],
      paymentToken: "CONNECT",
      genreId: selectedGenre._id,
      ...(selectedStyles?.length > 0 && { stylesId: selectedStyles }),
    }).then((data) => {
      const formData = new FormData();
      formData.append("trackUpload", selectedFile);
      uploadAudioFileToIPFS(formData, data[0].feedbackId, false).then(() => {
        setOpenSuccess(true);
      });
    });
  };

  const handleClickGotIt = useCallback(() => {
    setOpenSuccess(false);
    history.push("/");
  }, [setOpenSuccess, history]);

  const resetOtpError = useCallback(() => {
    setErrors({ ...errors, otp: false })
  }, [errors])

  return (
    <MusicianComponent
      genres={genres}
      state={state}
      styles={styles}
      setState={setState}
      showStylesMenu={showStylesMenu}
      handleChange={handleChange}
      selectedFile={selectedFile}
      handleTrackDetailsUpdate={handleTrackDetailsUpdate}
      handleOnSubmit={handleOnSubmit}
      selectedGenre={selectedGenre}
      selectedStyles={selectedStyles}
      handleGenreSelection={handleGenreSelection}
      handleStylesSelect={handleStylesSelect}
      closeStylesMenu={() => setShowStylesMenu(false)}
      showPersonalizeContainer={showPersonalizeContainer}
      setPersonalizeContainer={setPersonalizeContainer}
      handleOnAcceptAllCookies={handleOnAcceptAllCookies}
      handleOnSavePreferences={handleOnSavePreferences}
      navigateToFans={() => history.push("/")}
      openSuccess={openSuccess}
      setOpenSuccess={setOpenSuccess}
      handleClickGotIt={handleClickGotIt}
      errors={errors}
      userMusician={true}
      resetOtpError={resetOtpError}
    />
  );
};

const mapState = (state) => {
  return {
    genres: state.preferences.genres,
    styles: state.preferences.styles,
  };
};

const mapActions = (dispatch) => ({
  getGenresDispatchAction: () => dispatch(getGenres()),
  getStylesDispatchAction: (genreId) => dispatch(getStylesForGenre(genreId)),
});

export default connect(
  mapState,
  mapActions
)(UserMusician);
