import React, { useState } from "react";
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from "react-stripe-elements";
import content from "./content";
import "./payment.style.scss";
import InputField from "../../common/InputField";
import { ReactComponent as Clear } from "../../assets/img/musician/clear input.svg";
import CustomCheckbox from "../../common/CustomCheckBox";
import ToggleSwitch from "../../common/ToggleSwitch";
import Button from "../../common/Button";

const Payment = ({
  stripe,
  handlePaymentTokenReceived,
  handleClose,
  amount,
  rememberPaymentMethod,
  handleRememberPayment,
  addPaymentMethod,
  handleAddPayment,
  paymentMethods,
  handleCardSelect,
  selectedCard,
  loading,
}) => {
  const [accountName, setAccountName] = useState("");

  const handlePay = async () => {
    if (!addPaymentMethod && selectedCard) {
      handlePaymentTokenReceived(selectedCard);
      return;
    }
    const { token } = await stripe.createToken({ name: accountName });
    if (token) {
      handlePaymentTokenReceived(token);
    }
  };

  const onInputChange = e => {
    setAccountName(e.target.value);
  };

  return (
    <div className="payment-container">
      <div className="payment-header-container">
        <Clear onClick={handleClose} />
      </div>
      <div className="payment-main-container">
        <div className="payment-title">{content.PAYMENT_TITLE}</div>

        <section className="payment-amount">
          <div className="payment-amount-title">{content.PAYMENT_AMOUNT_TITLE}</div>
          <div className="payable-amount">${amount}</div>
          <div className="payment-method-title">{content.PAYMENT_METHOD_SELECT}</div>
        </section>

        <section className="card-list">
          {paymentMethods?.map(item => (
            <CardNumber
              key={item?.paymentId}
              cardDetails={item?.cardDetails}
              selected={selectedCard === item?.paymentId}
              handleClick={() => handleCardSelect(item?.paymentId)}
            />
          ))}
        </section>

        <section className="another-card">
          <div className="another-card-item">
            <aside>
              <CustomCheckbox selected={addPaymentMethod} onClick={handleAddPayment} />
            </aside>
            <aside className="another-card-item-right">{content.ADD_ANOTHER_CARD}</aside>
          </div>
        </section>

        {addPaymentMethod && (
          <>
            <section className="card-details-entry">
              <div className="card-name-title">{content.NAME_ON_CARD}</div>
              <InputField
                id="accountName"
                value={accountName}
                onChange={onInputChange}
                className="card-name-title-input"
                placeholder={content.NAME_PLACEHOLDER}
                style={{ base: { color: "#fff" } }}
              />
              <div className="card-name-title pt24">{content.CARD_NUMBER_LABEL}</div>
              <CardNumberElement
                className="card-name-title-input"
                placeholder={content.CARD_NUMBER_PLACEHOLDER}
                style={{ base: { color: "#fff" } }}
              />
              <section className="card-expiry-cvc">
                <aside className="left">
                  <div className="card-name-title">{content.EXPIRY_DATE_LABEL}</div>
                  <CardExpiryElement
                    className="card-name-title-input"
                    placeholder={content.EXPIRY_DATE_PLACEHOLDER}
                    style={{ base: { color: "#fff" } }}
                  />
                </aside>
                <aside className="right">
                  <div className="card-name-title">{content.CVC_LABEL}</div>
                  <CardCVCElement
                    className="card-name-title-input"
                    style={{ base: { color: "#fff" } }}
                    placeholder={content.CVC_PLACEHOLDER}
                  />
                </aside>
              </section>
            </section>

            <section className="remember-card">
              <aside className="left">{content.REMEMBER_CARD_TITLE}</aside>
              <aside className="right">
                <ToggleSwitch checked={rememberPaymentMethod} onChange={handleRememberPayment} />
              </aside>
            </section>
          </>
        )}

        <section className="pay-button">
          <Button onClick={handlePay} loading={loading} className="pay-button-element" buttonText={"PAY $" + amount} />
        </section>
      </div>
    </div>
  );
};

const CardNumber = ({ cardDetails, selected, handleClick }) => {
  return (
    <div className="card-item">
      <aside>
        <CustomCheckbox onClick={handleClick} selected={selected} />
      </aside>
      <aside className="card-item-right">****{cardDetails?.last4}</aside>
    </div>
  );
};

export default injectStripe(Payment);
