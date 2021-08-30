import { Drawer } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements, StripeProvider } from "react-stripe-elements";
import { STRIPE_KEY } from "../../config";
import { getPaymentMethods } from "../../state/actions/userActions";
import Payment from "./Payment";

export default function PaymentDrawer({ open, handleClose, handlePaymentTokenReceived, amount, loading }) {
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(false);
  const [rememberPaymentMethod, setRememberPaymentMethod] = React.useState(true);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const paymentMethods = useSelector(state => state.userDetails.paymentMethods);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPaymentMethods());
  }, []);

  const handleTokenReceived = token => {
    const payload = {
      token: selectedCard || token?.id,
      saveCardDetails: !addPaymentMethod ? false : rememberPaymentMethod,
      paymentFromSavedCard: selectedCard ? true : false,
    };
    handlePaymentTokenReceived(payload);
  };

  const handleCardSelect = cardId => {
    setSelectedCard(cardId);
    setAddPaymentMethod(false);
  };

  const handleAddPayment = () => {
    if (!addPaymentMethod) setSelectedCard(null);
    setAddPaymentMethod(oldVal => !oldVal);
  };

  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <StripeProvider apiKey={STRIPE_KEY}>
        <Elements>
          <Payment
            handleClose={handleClose}
            amount={amount}
            loading={loading}
            addPaymentMethod={addPaymentMethod}
            handleAddPayment={handleAddPayment}
            rememberPaymentMethod={rememberPaymentMethod}
            handleRememberPayment={() => setRememberPaymentMethod(oldVal => !oldVal)}
            handleCardSelect={handleCardSelect}
            selectedCard={selectedCard}
            handlePaymentTokenReceived={handleTokenReceived}
            paymentMethods={paymentMethods}
          />
        </Elements>
      </StripeProvider>
    </Drawer>
  );
}
