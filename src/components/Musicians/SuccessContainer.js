import React from "react";
import { ReactComponent as Close } from "../../assets/img/musician/clear input.svg";
import SuccessPic from "../../assets/img/musician/succes pic.png";
import Button from "../../common/Button";

const SuccessContainer = ({ onClose, handleClickGotIt }) => {
  return (
    <div className="success-main-container">
      <Close
        className="close-icon"
        onClick={onClose}
        style={{ minHeight: "30px" }}
      />
      <img className="success-img" src={SuccessPic} alt="No Img" />
      <span className="success-message">SUCCESS</span>
      <p className="submission-message">
        Your submission has been received. We will be in touch soon with
        feedback on your music. In the meantime download the app
      </p>
      <Button
        buttonText="GOT IT!"
        className="landing-acpt-cook-btn"
        onClick={handleClickGotIt}
      />
    </div>
  );
};

export default SuccessContainer;
