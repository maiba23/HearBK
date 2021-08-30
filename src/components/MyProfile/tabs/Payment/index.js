import React from "react";
import content from "../InfluencerSetting/content";
import Button from "../../../../common/Button";
import { ReactComponent as Delete } from "../../../../assets/icon/delete.svg";
import ToggleSwitch from "../../../../common/ToggleSwitch";
import CustomDrawer from "../../../../common/CustomDrawer";
import CloseIcon from "../../../../assets/img/Close.png";
import AddPayment from "./AddPayment";
import { StripeProvider, Elements } from "react-stripe-elements";
import { STRIPE_KEY } from "../../../../config";
import "./payment.style.scss";

const PaymentComponent = ({
  togglePaymentMethodContainer,
  openAddPaymentContainer,
  handleAddPaymentMethod,
  paymentMethods,
  handleOnDeletePaymentMethod,
  handleDefaultPaymentSelect,
  defaultPayment,
  premiumUser,
  defaultCard,
  handleCancelSubscription,
}) => {
  return (
    <div className="payment-tab-container">
      <div className="payment-tab-method-container">
        <div className="title">Payment information</div>
        <div className="header-container">
          <span className="payment-receive-header">Active payment method</span>
        </div>
        {paymentMethods.map((card) => (
          <div key={card.paymentId} className="card-detail-container">
            <section>
              <Delete className="card-detail-delete-icon" onClick={() => handleOnDeletePaymentMethod(card.paymentId)} />
              <span className="card-last-digits">{`**** ${card.cardDetails.last4}`}</span>
            </section>
            <section>
              <span className="default-txt">default</span>
              <ToggleSwitch checked={defaultPayment === card.paymentId} onChange={(e) => handleDefaultPaymentSelect(e, card)} />
            </section>
          </div>
        ))}
      </div>
      <div className="add-tab-another-container">
        <Button buttonText="ADD ANOTHER" className="add-another-btn" onClick={togglePaymentMethodContainer} />
      </div>

      {premiumUser && (
        <section className="active-payment">
          <div className="active-plan-title">Active payment plans</div>
          <section className="cancel-pro-subscription">
            <aside className="cancel-pro-left">
              <div className="cancel-pro-title">Premium Plan</div>
              <div className="cancel-pro-amount">$14/month</div>
            </aside>
            <aside className="default-payment">
              {defaultCard && (
                <>
                  <div className="cancel-pro-title">Payment method</div>
                  <div className="cancel-pro-amount">****{defaultCard?.cardDetails?.last4}</div>
                </>
              )}
            </aside>
            <aside className="cancel-pro-right">
              <Button onClick={handleCancelSubscription} className="cancel-pro-button" buttonText="CANCEL PLAN" />
            </aside>
          </section>
        </section>
      )}

      {/* <div className="transaction-history-container">
          <span className="transaction-history-header">{content.TRANSACTION_HISTORY}</span>
          <div className="transaction-history-card">
            <div className="amount-last-digit">
              <span>{`$5, `}</span>
              <span>**** 1234</span>
            </div>
            <div className="transaction-time-container">
              <span className="time-txt">12 Jun 2020, 12:10</span>
              <span>Track from User name</span>
            </div>
            <Button buttonText="RECEIVED" className="received-btn" />
          </div>
        </div> */}

      <CustomDrawer open={openAddPaymentContainer} handleOnClose={togglePaymentMethodContainer}>
        <div className="roles-drawer">
          <div className="drawer-header">
            <img src={CloseIcon} className="close-icon" onClick={togglePaymentMethodContainer} />
          </div>
          <StripeProvider apiKey={STRIPE_KEY}>
            <Elements>
              <AddPayment handleAddPaymentMethod={handleAddPaymentMethod} />
            </Elements>
          </StripeProvider>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default PaymentComponent;
