import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentComponent from "../../../../components/MyProfile/tabs/Payment";
import { trackMixpanel } from "../../../../mixpanel";
import mixpanel_constant from "../../../../mixpanel/mixpanel.constants";
import {
  updateUserData,
  getPaymentMethods,
  addPaymentMethods,
  deletePaymentMethod,
  getUserDetails,
  cancelUserPremiumSubscription,
} from "../../../../state/actions/userActions";

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails.user);
  const [openAddPaymentContainer, setOpenAddPaymentContainer] = useState(false);
  const [defaultPayment, setDefaultPayment] = useState("");
  const paymentMethods = useSelector(state => state.userDetails.paymentMethods);
  const [state, setState] = useState({
    headline: "",
    price: "",
    filter: "",
  });
  const userDetails = useSelector(state => state.userDetails.user);
  const premiumUser = React.useMemo(() => user?.premiumSubscriptionId || false, [user]);
  const defaultCard = React.useMemo(() => paymentMethods?.find(el => el?.paymentId === defaultPayment) || false, [
    paymentMethods,
    defaultPayment,
  ]);

  useEffect(() => {
    dispatch(getPaymentMethods());
    dispatch(getUserDetails(true));
  }, []);

  useEffect(() => {
    setState({
      ...state,
      headline: userDetails?.headline || "",
      price: userDetails?.price || "",
      filter: userDetails?.filter || "0",
    });
    userDetails.default_payment_id && setDefaultPayment(userDetails.default_payment_id);
  }, [userDetails]);

  const togglePaymentMethodContainer = useCallback(() => {
    if (!openAddPaymentContainer) {
      trackMixpanel(mixpanel_constant.profile_payment_tab_add_payment_method_open, {});
    }
    setOpenAddPaymentContainer(!openAddPaymentContainer);
  }, [openAddPaymentContainer]);

  const handleAddPaymentMethod = useCallback(
    cardDetail => {
      const payload = {
        paymentToken: cardDetail.id,
      };

      trackMixpanel(mixpanel_constant.profile_payment_tab_add_payment_method_submit, payload);

      dispatch(addPaymentMethods(payload))
        .then(resp => {
          if (!userDetails.default_payment_id) {
            dispatch(updateUserData({ default_payment_id: resp.id }, { refresh: true }));
          }
          dispatch(getPaymentMethods());
          setOpenAddPaymentContainer(false);
          trackMixpanel(mixpanel_constant.profile_payment_tab_add_payment_method_success, { ...payload, ...resp });
        })
        .catch(err => {
          trackMixpanel(mixpanel_constant.profile_payment_tab_add_payment_method_error, { ...payload, error: JSON.stringify(err) });
        });
    },
    [
      addPaymentMethods,
      dispatch,
      trackMixpanel,
      mixpanel_constant,
      updateUserData,
      getPaymentMethods,
      setOpenAddPaymentContainer,
      userDetails,
    ]
  );

  const handleOnDeletePaymentMethod = useCallback(
    paymentId => {
      dispatch(deletePaymentMethod({ id: paymentId }));
      trackMixpanel(mixpanel_constant.profile_payment_tab_delete_payment_method, { paymentId });
    },
    [deletePaymentMethod, dispatch, trackMixpanel, mixpanel_constant]
  );

  const handleDefaultPaymentSelect = useCallback(
    (event, data) => {
      if (event.target.checked) {
        setDefaultPayment(data.paymentId);
        const payload = {
          default_payment_id: data.paymentId,
        };
        trackMixpanel(mixpanel_constant.profile_payment_tab_change_default_payment, payload);
        dispatch(updateUserData(payload));
      }
    },
    [dispatch, updateUserData, setDefaultPayment, trackMixpanel, mixpanel_constant]
  );

  const handleCancelSubscription = useCallback(() => {
    trackMixpanel(mixpanel_constant.profile_payment_tab_cancel_premium_plan_submit, {});
    cancelUserPremiumSubscription()
      .then(() => {
        trackMixpanel(mixpanel_constant.profile_payment_tab_cancel_premium_plan_success, {});
      })
      .catch(err => {
        trackMixpanel(mixpanel_constant.profile_payment_tab_cancel_premium_plan_error, { error: JSON.stringify(err) });
      });
  }, [cancelUserPremiumSubscription, trackMixpanel, mixpanel_constant]);

  return (
    <PaymentComponent
      handleCancelSubscription={handleCancelSubscription}
      premiumUser={premiumUser}
      defaultCard={defaultCard}
      togglePaymentMethodContainer={togglePaymentMethodContainer}
      openAddPaymentContainer={openAddPaymentContainer}
      handleAddPaymentMethod={handleAddPaymentMethod}
      paymentMethods={paymentMethods}
      handleOnDeletePaymentMethod={handleOnDeletePaymentMethod}
      handleDefaultPaymentSelect={handleDefaultPaymentSelect}
      defaultPayment={defaultPayment}
    />
  );
};

export default PaymentContainer;
