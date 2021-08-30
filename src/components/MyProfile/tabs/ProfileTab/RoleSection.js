import React from "react";
import CustomAccordian from "../../../../common/CustomAccordian";
import "./profiletab.style.scss";

const RoleSection = ({ rolesList, selectedRole, selectedSubRole, handleRoleSelect, handleSubroleSelect }) => {
  return (
    <>
      <div className="role-section-root-container">
        <span className="span-role-text">Role</span>
        <div className="role-accordion-container">
          {rolesList.map((roleItem) => (
            <CustomAccordian
              key={roleItem._id}
              roleId={roleItem._id}
              renderText={roleItem.name}
              subRolesList={roleItem.subRoles || []}
              selectedRole={selectedRole}
              selectedSubRole={selectedSubRole}
              handleRoleSelect={() => handleRoleSelect(roleItem)}
              handleSubroleSelect={handleSubroleSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RoleSection;
