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
import {
  phoneAuthenticationVerify,
  sendVerificationSMS,
} from "../../state/actions/userActions";
import { ENUMS, validateRegex } from "../../utils";

const Musician = ({
  getGenresDispatchAction,
  genres,
  styles,
  getStylesDispatchAction,
}) => {
  const [state, setState] = React.useState({
    artistName: "",
    phoneNumber: "",
    emailAddress: "",
    trackName: "",
    displayName: "",
    isAdvertisingCookieEnabled:
      localStorage.getItem("is-advertising-cookie-enabled") === "true",
    isAnalyticsCookieEnabled:
      localStorage.getItem("is-analytics-cookie-enabled") === "true",
    isCookieAccepted: localStorage.getItem("is-cookies-accepted") === "true",
    userName: "",
  });

  const [errors, setErrors] = useState({
    artistName: false,
    phoneNumber: false,
    emailAddress: false,
    trackName: false,
    displayName: false,
    selectedFile: false,
    userName: false,
    selectedGenre: false,
    otp: false,
  });

  const setErrorsFields = (state) => {
    setErrors({
      artistName: state.artistName.trim() === "",
      phoneNumber: (!validateRegex("phoneNumber", Number(state.phoneNumber.trim())) || state.phoneNumber === ""),
      emailAddress: !validateRegex("email", state.emailAddress),
      trackName: state.trackName.trim() === "",
      displayName: state.displayName.trim() === "",
      userName: state.userName.trim() === "",
      selectedFile: Boolean(!selectedFile),
      selectedGenre: Boolean(!selectedGenre)
    });
  }

  var history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [showStylesMenu, setShowStylesMenu] = useState(false);
  const [showPersonalizeContainer, setPersonalizeContainer] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [countryCode, setCountyCode] = useState('+1');

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [])

  const handleChange = (event) => {
    if (event.target.name) {
      setState({ ...state, [event.target.name]: event.target.checked });
    } else {
      setState({ ...state, [event.target.id]: event.target.value });
    }
  };

  const handleOnAcceptAllCookies = useCallback(() => {
    localStorage.setItem("is-cookies-accepted", true);
    localStorage.setItem("is-advertising-cookie-enabled", true);
    localStorage.setItem("is-analytics-cookie-enabled", true);
    setPersonalizeContainer(false);
    setState({ ...state, isCookieAccepted: true });
  }, [state])

  const handleOnSavePreferences = useCallback((data) => {
    localStorage.setItem("is-cookies-accepted", true);
    localStorage.setItem("is-advertising-cookie-enabled", data.isAdvertisingCookieEnabled);
    localStorage.setItem("is-analytics-cookie-enabled", data.isAnalyticsCookieEnabled);
    setPersonalizeContainer(false)
  }, [])

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

  const handleTrackDetailsUpdate = (e) => {
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
  };

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

  const handleGenreSelection = useCallback((genre) => {
    setSelectedGenre(genre);
  }, []);

  const areFieldsValid = () => {
    const isValid =
      state.artistName.trim() !== "" &&
      validateRegex("email", state.emailAddress) &&
      state.trackName.trim() !== "" &&
      (validateRegex("phoneNumber", Number(state.phoneNumber.trim())) || state.phoneNumber !== "") &&
      state.displayName.trim() !== "" &&
      state.userName.trim() !== "" &&
      selectedFile &&
      selectedGenre

    setErrorsFields(state);

    return isValid;
  };

  const handleOnSubmit = () => {
    if (!areFieldsValid()) {
      return;
    }
    const number = `${countryCode}${state.phoneNumber}`;

    sendVerificationSMS(number).then((resp) => {
      if (resp.ok) {
        setShowPhoneModal(true);
      } else {
        toast.error("Failed to send the verification code. Please try again!");
      }
    });
  };

  const handlePhoneVerify = (phoneNumber, otp) => {
    const number = `${countryCode}${phoneNumber.trim()}`;

    const payload = {
      email: state.emailAddress.trim(),
      user_name: state.userName.trim(),
      display_name: state.displayName.trim(),
      phoneNumber: number,
      OTP: otp,
    };

    phoneAuthenticationVerify(payload)
      .then((resp) => {
        if (resp) {
          localStorage.setItem("x-access-token", resp.token);
          submitPayment({
            tracks: [
              {
                trackTitle: state.trackName,
                mediaType: ENUMS.MEDIA_TYPE_FILEUPLOAD,
              },
            ],
            paymentToken: "CONNECT",
            genreId: selectedGenre._id,
            ...(selectedStyles?.length > 0 && { stylesId: selectedStyles }),
          }).then((data) => {
            const formData = new FormData();
            formData.append("trackUpload", selectedFile);
            uploadAudioFileToIPFS(formData, data[0].feedbackId, false).then(
              () => {
                setOpenSuccess(true)
              }
            );
          });
        }
      })
      .catch(() => {
        setErrors({ ...errors, otp: true })
      });
  };

  const handleClickGotIt = () => {
    setOpenSuccess(false)
    history.push('/')
  }

  const handleChangeCountryCode = (e) => {
    setCountyCode(e.target.value)
  }

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
      phoneModal={showPhoneModal}
      setPhoneModal={setShowPhoneModal}
      handlePhoneVerify={handlePhoneVerify}
      selectedGenre={selectedGenre}
      selectedStyles={selectedStyles}
      handleGenreSelection={handleGenreSelection}
      handleStylesSelect={handleStylesSelect}
      closeStylesMenu={() => setShowStylesMenu(false)}
      showPersonalizeContainer={showPersonalizeContainer}
      setPersonalizeContainer={setPersonalizeContainer}
      handleOnAcceptAllCookies={handleOnAcceptAllCookies}
      handleOnSavePreferences={handleOnSavePreferences}
      navigateToFans={() => history.push('/')}
      openSuccess={openSuccess}
      setOpenSuccess={setOpenSuccess}
      handleClickGotIt={handleClickGotIt}
      errors={errors}
      handleChangeCountryCode={handleChangeCountryCode}
      countryCode={countryCode}
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
)(Musician);
