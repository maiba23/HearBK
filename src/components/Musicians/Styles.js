import React from "react";
import "./musician.style.scss";
import { ReactComponent as Close } from "../../assets/img/musician/clear input.svg";
import CustomCheckbox from "../../common/CustomCheckBox";
import Button from "../../common/Button";

const Styles = ({ onClose, selectedGenre, selectedStyles, styles, handleStylesSelect }) => {
  return (
    <div className="role-main-container">
      <Close className="close-icon" onClick={onClose} style={{ minHeight: "30px" }} />
      <span className="role-header">{`Select ${selectedGenre?.name} styles`}</span>
      <section className="styles-container">
        {styles.map((data) => {
          return (
            <div className="sub-role-container" key={data._id}>
              <CustomCheckbox
                onClick={() => handleStylesSelect(data._id, data)}
                selected={selectedStyles.some((item) => item === data._id)}
              />
              <span className="checkbox-label">{data.name}</span>
            </div>
          );
        })}
      </section>
      <Button
        buttonText="Done"
        disabled={selectedStyles.length < 1}
        className={selectedStyles.length < 1 ? "done-button-disable" : "done-button"}
        onClick={onClose}
      />
    </div>
  );
};

export default Styles;
