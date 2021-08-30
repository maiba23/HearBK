import React from "react";
import "./genres.styles.scss";
import { ReactComponent as Close } from "../../assets/img/musician/clear input.svg";
import CustomCheckbox from "../../common/CustomCheckBox";
import Button from "../../common/Button";

const Styles = ({ onClose, selectedGenre, selectedStyles, styles, handleStylesSelect }) => {
  return (
    <div className="styles-main-container">
      <Close className="close-icon" onClick={onClose} style={{ minHeight: "30px" }} />
      <span className="styles-header">{`Now, select favorite ${selectedGenre?.name} styles`}</span>
      <section className="styles-container">
        {styles.map((data) => {
          return (
            <div className="sub-role-container" key={data._id}>
              <CustomCheckbox onClick={() => handleStylesSelect(data._id, selectedGenre?._id)} selected={selectedStyles.some((item) => item === data._id)} />
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