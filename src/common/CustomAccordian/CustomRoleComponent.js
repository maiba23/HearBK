import React from "react";
import cx from "classnames";
import "./customAccordian.styles.scss";

const CustomRoleComponent = ({ subRoleName, subRoleId, selectedSubRole, handleSubroleSelect }) => {
  const isSubRoleSelected = selectedSubRole?.some((el) => el._id === subRoleId);
  return (
    <span className={cx("role-button-container", isSubRoleSelected && "role-button-selected-container")} onClick={handleSubroleSelect}>
      <span className={cx("subrole-text", isSubRoleSelected && "selected-subrole-text")}>{subRoleName}</span>
    </span>
  );
};

export default CustomRoleComponent;
