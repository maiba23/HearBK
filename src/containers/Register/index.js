import React, { useState, useCallback,useEffect } from "react";
import { useDispatch } from "react-redux";
import RegisterComponent from "../../components/Register";
import { setOpenRegisterDispatch } from "../../state/actions/homeAction";
import { validateRegex } from "../../utils";
import { phoneAuthenticationVerify, registerUserAction } from "../../state/actions/userActions";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useHistory } from "react-router-dom";

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    user_name: "",
    email: "",
    display_name: "",
  });
  const [resendTime, setResendTime] = useState(0)

  const [errors, setErrors] = useState({
    user_name: false,
    email: false,
    display_name: false,
    phoneNumber: false,
    otp: false,
    userExist: false,
    message: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(localStorage.getItem("country-code") || "+1");
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const onCloseRegister = () => {
    dispatch(setOpenRegisterDispatch(false));
  };

  const handleChange = (event) => {
    if (event.target.id) {
      setState({ ...state, [event.target.id]: event.target.value });
    }
  };

  const resetError = useCallback(() => {
    setErrors({ ...errors, message: "", phoneNumber: false });
  }, [errors]);

  const handleOnChangePhoneNumber = useCallback(
    (e) => {
      errors.phoneNumber && resetError();
      setPhoneNumber(e.target.value);
    },
    [setPhoneNumber, errors, resetError]
  );

  const handleOnChangeCountryCode = useCallback(
    (e) => {
      setCountryCode(e.target.value);
      localStorage.setItem("country-code", e.target.value);
    },
    [setCountryCode]
  );

  const handleOnSubmit = useCallback(async () => {
    const data = {
      phone_number: `${countryCode}${phoneNumber}`,
      email: state.email,
      user_name: state.user_name,
    };

    const isInValidPhoneNumber = !isValidPhoneNumber(data.phone_number);

    const isValid =
      state.user_name.trim() !== "" && state.display_name.trim() !== "" && validateRegex("email", state.email) && !isInValidPhoneNumber;
console.log(isValid,'isValid',data)
    setErrors({
      ...errors,
      otp: false,
      user_name: state.user_name.trim() === "",
      phoneNumber: isInValidPhoneNumber,
      email: !validateRegex("email", state.email),
      display_name: state.display_name.trim() === "",
    });

    if (isValid) {
      setResendTime(60)

      try {
        const success = await dispatch(registerUserAction(data));
        if (success && isValid) {
          setShowPhoneModal(true);
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        setErrors({
          ...errors,
          userExist: true,
          user_name: errorMessage.includes("Username"),
          phoneNumber: errorMessage.includes("Phone"),
          email: errorMessage.includes("Email"),
          message: errorMessage || "User already exists !",
        });
      }
    }
  }, [errors, state, phoneNumber, countryCode]);

  const handleRegister = async (phoneNumber, otp) => {
    const data = {
      email: state.email,
      user_name: state.user_name,
      display_name: state.display_name,
      password: "password",
      phoneNumber: `${countryCode}${phoneNumber}`,
      OTP: otp,
    };

    try {
      const resp = await phoneAuthenticationVerify(data);
      if (resp.token) {
        localStorage.setItem("x-access-token", resp.token);
        history.push("/initial-setup/genres");
        setShowPhoneModal(false);
      }
    } catch (error) {
      setErrors({
        ...errors,
        otp: true,
      });
    }
  };

  const resetOtpError = useCallback(() => {
    setErrors({ ...errors, otp: false });
  }, [errors]);

  useEffect(() => {
    const timer =
      resendTime > 0 && setInterval(() => setResendTime(resendTime - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTime]);
  return (
    <RegisterComponent
      onClose={onCloseRegister}
      handleChange={handleChange}
      state={state}
      errors={errors}
      resendTime={resendTime}
      handleOnChangePhoneNumber={handleOnChangePhoneNumber}
      handleOnChangeCountryCode={handleOnChangeCountryCode}
      phoneNumber={phoneNumber}
      countryCode={countryCode}
      handleOnSubmit={handleOnSubmit}
      showPhoneModal={showPhoneModal}
      setShowPhoneModal={setShowPhoneModal}
      handleRegister={handleRegister}
      resetOtpError={resetOtpError}
    />
  );
};

export default RegisterContainer;
