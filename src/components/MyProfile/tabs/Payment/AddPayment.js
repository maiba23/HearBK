import React, { useState } from "react";
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from "react-stripe-elements";
import content from "../InfluencerSetting/content";
import "rc-checkbox/assets/index.css";
import InputField from "../../../../common/InputField";
import Button from "../../../../common/Button";

const AddPayment = ({ stripe, handleAddPaymentMethod }) => {
  const [accountName, setAccountName] = useState("");

  const handleClickAdd = async () => {
    const { token } = await stripe.createToken({ name: accountName });
    if (token) {
      handleAddPaymentMethod(token);
    }
  };

  const onInputChange = (e) => {
    setAccountName(e.target.value);
  };

  return (
    <div className="paymentInputContainer">
      <span className="addPaymentHeader">{content.ADD_PAYMENT}</span>
      <label className="titleLabel">{content.NAME_ON_CARD}</label>
      <InputField
        id="accountName"
        value={accountName}
        onChange={onInputChange}
        className="titleInput"
        placeholder={content.NAME_PLACEHOLDER}
        style={{ base: { color: "#fff" } }}
      />
      <label className="titleLabel">{content.CARD_NUMBER_LABEL}</label>
      <CardNumberElement className="titleInput" placeholder={content.CARD_NUMBER_PLACEHOLDER} style={{ base: { color: "#fff" } }} />
      <div className="cardDetailsContainer">
        <div className="expiry-container">
          <label className="titleLabel">{content.EXPIRY_DATE_LABEL}</label>
          <CardExpiryElement className="titleInput" placeholder={content.EXPIRY_DATE_PLACEHOLDER} style={{ base: { color: "#fff" } }} />
        </div>
        <div style={{ width: 120 }}>
          <label className="titleLabel">{content.CVC_LABEL}</label>
          <CardCVCElement className="titleInput" style={{ base: { color: "#fff" } }} placeholder={content.CVC_PLACEHOLDER} />
        </div>
      </div>
      <Button buttonText="ADD" className="payment-add-btn" onClick={handleClickAdd} />
    </div>
  );
};

export default injectStripe(AddPayment);
