import React from "react";
import CustomSelect from "../../../common/CustomSelect";
import InputField from "../../../common/InputField/index";
import { ReactComponent as DropDown } from "../../../assets/img/musician/Vector 2.svg";
import cx from "classnames";
import "./styles.scss";

const countryCodeList = require("../../Musicians/CountryCode.json");
const countryCodeListFormatted = countryCodeList
  .map((code) => {
    return {
      label: code.name,
      value: code.dial_code,
    };
  })
  .sort((a, b) => String(a.name) - String(b.name));

const PhoneComponent = ({
  phoneNumber,
  handleOnChangePhoneNumber,
  handleOnChangeCountryCode,
  errors,
  countryCode,
  showErrorMessage,
  small,
}) => {
  const isSafariBrowser = Boolean(navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/))
  const isMac = navigator?.platform?.indexOf('Mac') !== -1
  const isIpadOrIphone = (/iPad|iPhone|iPod/.test(navigator.platform))

  return (
    <div className="phone-root-container">
      <div className="phone-number-header">
        <span className="track-input-label">Phone Number</span>
        {showErrorMessage && errors.phoneNumber && <span className="error-message-label">{errors.message}</span>}
      </div>
      <div className="phone-number-container">
        <CustomSelect
          onChange={handleOnChangeCountryCode}
          value={countryCode}
          width={small ? 80 : 120}
          dataProvider={countryCodeListFormatted}
          IconComponent={() => <DropDown className="dropdown-icon" />}
          isSafariBrowser={isSafariBrowser}
        />
        <InputField
          id="phoneNumber"
          className={cx(
            "phone-number-input",
            "phone-number-phone",
            small && "phone-number-phoneSidebar",
            errors?.phoneNumber && "error-border",
            isSafariBrowser && isIpadOrIphone && "phone-number-phone-safari-ipad-iphone",
            isSafariBrowser && isMac && "phone-number-phone-safari-mac",
          )}
          value={phoneNumber}
          onChange={handleOnChangePhoneNumber}
        />
      </div>
    </div>
  );
};

export default PhoneComponent;
