import React from "react";
import cx from "classnames";
import "./profiletab.style.scss";

const RoleButton = ({ name, handleOnSelectionRole, isSelected, _id }) => {
  return (
    <span
      className={cx("role-button-container", !isSelected && "roles-selected")}
      onClick={() => handleOnSelectionRole(_id,isSelected)}
    >
      <span className="role-container">
        <span className="role-name-text">{name}</span>
      </span>
    </span>
  );
};

export default RoleButton;
