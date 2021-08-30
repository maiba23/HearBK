import React from 'react';
import './musician.style.scss';
import { ReactComponent as Close } from '../../assets/img/musician/clear input.svg';
import content from './content';
import ToggleSwitch from '../../common/ToggleSwitch';
import Button from '../../common/Button';

const CookieContainer = ({ onClose, state, handleChange, handleOnSavePreferences }) => {
    return (
        <div className="cookie-main-container">
            <Close className="close-icon" onClick={onClose} style={{ minHeight: '30px' }} />
            <span className="cookie-headers">{content.PRIVACY_PREFRENCE_CENTER}</span>
            <p className="cookie-content">{content.PRIVACY_PREFRENCE_CENTER_CONTENT}</p>
            <span className="cookie-headers">{content.ESSENTIAL_WEBSITE_COOKIES}</span>
            <span className="always-active">{content.ALWAYS_ACTIVE}</span>
            <p className="cookie-content">{content.ESSENTIAL_WEBSITE_COOKIES_CONTENT}</p>
            <div className="header-container" >
                <span className="cookie-headers" style={{ marginTop: '0px' }}>{content.ADVERTISING_COOKIES}</span>
                <ToggleSwitch checked={state.isAdvertisingCookieEnabled} onChange={handleChange} name="isAdvertisingCookieEnabled" />
            </div>
            <p className="cookie-content">{content.ADVERTISING_COOKIES_CONTENT}</p>
            <div className="header-container" >
                <span className="cookie-headers" style={{ marginTop: '0px' }}>{content.ANALYTICS_COOKIES}</span>
                <ToggleSwitch checked={state.isAnalyticsCookieEnabled} onChange={handleChange} name="isAnalyticsCookieEnabled" />
            </div>
            <p className="cookie-content">{content.ANALYTICS_COOKIES_CONTENT}</p>
            <Button
                buttonText={content.ACCEPT}
                className="personalize-choice-btn-2"
                onClick={() => handleOnSavePreferences(state)}
            />
        </div>
    )
}

export default CookieContainer;