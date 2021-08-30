import { Drawer } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PaymentDrawer from "../../components/PaymentDrawer";
import PreviewAgainComponent from "../../components/TrackDetailsComponent/PreviewAgainComponent/PreviewAgainComponent";
import { getSelectedTrack } from "../../state/actions/homeAction";
import { orderPreviewAgain } from "../../state/actions/orderActions";

const previewItems = [
  {
    id: 1,
    count: 100,
    amount: 5,
  },
  {
    id: 2,
    count: 500,
    amount: 20,
  },
  { id: 3, count: 1000, amount: 40 },
];

export default function PreviewAgain({ open, handleClose, selectedTrack }) {
  const [selectedPreviewItem, setSelectedPreviewItem] = React.useState(previewItems[0]);
  const [showPayment, setShowPayment] = React.useState(false);
  const dispatch = useDispatch();

  const handlePay = () => {
    setShowPayment(true);
  };

  const handlePaymentTokenReceive = async ({ token, saveCardDetails, paymentFromSavedCard }) => {
    const payload = {
      trackId: selectedTrack?._id,
      numberOfFeedbacks: selectedPreviewItem.count,
      saveCardDetails: saveCardDetails,
      paymentToken: token,
      amount: selectedPreviewItem.amount,
      currency: "USD",
      paymentFromSavedCard: paymentFromSavedCard,
    };

    try {
      const res = await orderPreviewAgain(payload);
      setShowPayment(false);
      dispatch(getSelectedTrack(selectedTrack?._id));
      handleClose();
    } catch (err) {
      toast.error("Couldn't complete your request, please try again");
    }
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <PreviewAgainComponent
          previewItems={previewItems}
          handleSelectPreview={(item) => setSelectedPreviewItem(item)}
          selectedPreviewItem={selectedPreviewItem}
          handleClose={handleClose}
          handlePay={handlePay}
        />
      </Drawer>
      <PaymentDrawer
        open={showPayment}
        amount={selectedPreviewItem?.amount}
        handlePaymentTokenReceived={handlePaymentTokenReceive}
        handleClose={() => setShowPayment((pV) => !pV)}
      />
    </>
  );
}
