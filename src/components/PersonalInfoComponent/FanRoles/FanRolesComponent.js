import React from "react";
import "./fanRoles.style.scss";
import { ReactComponent as Clear } from "../../../assets/img/musician/clear input.svg";
import CustomCheckbox from "../../../common/CustomCheckBox";
import Button from "../../../common/Button";

export default function FanRolesComponent({ handleClose, selectedRole, handleSubroleSelect, selectedSubRole }) {
  return (
    <div className="fan-roles-container">
      <div className="fan-roles-header-container">
        <Clear onClick={handleClose} />
      </div>
      <div className="fan-roles-main-container">
        <div className="fan-roles-title">Select {selectedRole?.name || ""} roles</div>
        <div className="fan-subroles-list">
          {selectedRole?.subRoles?.map((item) => (
            <FanSubroleItem
              onClick={() => handleSubroleSelect(item)}
              selected={selectedSubRole?.some((el) => el._id === item._id)}
              name={item?.name}
              key={item?._id}
            />
          ))}
        </div>

        <Button className="fan-role-done" buttonText="DONE" onClick={handleClose} />
      </div>
    </div>
  );
}

const FanSubroleItem = ({ name, selected, onClick }) => {
  return (
    <div className="fan-subrole-item">
      <aside>
        <CustomCheckbox selected={selected} onClick={onClick} />
      </aside>
      <aside className="fan-subrole-item-name">{name}</aside>
    </div>
  );
};
