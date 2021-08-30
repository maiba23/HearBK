import React, { useCallback, useState } from 'react';
import ForMusicPage from '../../components/ForMusic';

const Fan = () => {

    const [state, setState] = useState({
        isAdvertisingCookieEnabled: localStorage.getItem("is-advertising-cookie-enabled") === "true",
        isAnalyticsCookieEnabled: localStorage.getItem("is-analytics-cookie-enabled") === "true",
        isCookieAccepted: localStorage.getItem("is-cookies-accepted") === "true"
    });
    const [showPersonalizeContainer, setPersonalizeContainer] = useState(false);

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

    const handleChange = (event) => {
        if (event.target.name) {
          setState({ ...state, [event.target.name]: event.target.checked });
        } else {
          setState({ ...state, [event.target.id]: event.target.value });
        }
      };

    const handleRedirectTo = (link) => {
        window.open(link, '_blank')
    }

    return (
        <ForMusicPage
            state={state}
            setState={setState}
            showPersonalizeContainer={showPersonalizeContainer}
            setPersonalizeContainer={setPersonalizeContainer}
            handleOnAcceptAllCookies={handleOnAcceptAllCookies}
            handleOnSavePreferences={handleOnSavePreferences}
            handleChange={handleChange}
            handleRedirectTo={handleRedirectTo}
        />
    )
}

export default Fan