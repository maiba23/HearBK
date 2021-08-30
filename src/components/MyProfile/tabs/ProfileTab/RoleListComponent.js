import React from "react";
import CustomCheckBox from "../../../../common/CustomCheckBox";
import Button from "../../../../common/Button";
import "./profiletab.style.scss";

const RoleListComponent = ({
  subRolesList,
  selectedRoles,
  selectedRoleObjectRef,
  handleOnSelectedSubRoles,
  onClose,
}) => {
  const isRoleSelected = (subRoleId) => {
    const roleObject = selectedRoles.find(
      (role) => role._id === selectedRoleObjectRef._id
    );

    return (
      roleObject?.subRoles?.some((subRole) => subRole._id === subRoleId) ||
      false
    );
  };

  const capitalizeFirstCharacter = (text = "") => {
    text = text.toLowerCase();
    return text.length ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  };

  return (
    <div className="role-list-root-container">
      <span className="drawer-title">{`Select ${capitalizeFirstCharacter(
        selectedRoleObjectRef?.name || ""
      )} roles`}</span>
      <div className="role-list-container">
        {subRolesList.map((roleItem) => {
          const isSubRoleSelected = isRoleSelected(roleItem._id);
          return (
            <div key={roleItem._id} className="role-item-container">
              <CustomCheckBox
                selected={isSubRoleSelected}
                onClick={() =>
                  handleOnSelectedSubRoles(
                    roleItem._id,
                    selectedRoleObjectRef._id,
                    isSubRoleSelected
                  )
                }
              />
              <span className="role-text">{roleItem.name}</span>
            </div>
          );
        })}
      </div>
      <Button
        buttonText="Done"
        //disabled={selectedStyles.length < 1}
        className={/* false ? "done-button-disable" : */ "done-button"}
        onClick={onClose}
      />
    </div>
  );
};

export default RoleListComponent;
