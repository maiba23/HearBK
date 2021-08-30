import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CustomCheckBox from "../CustomCheckBox";
import CustomRoleComponent from "./CustomRoleComponent";
import ArrowIcon from "../../assets/img/ArrowDownward.png";
import "./customAccordian.styles.scss";

const CustomAccordian = ({
  renderText,
  subRolesList = [],
  roleId,
  selectedRole,
  selectedSubRole,
  handleRoleSelect,
  handleSubroleSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleOnExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const expandMore = () => <img onClick={handleOnExpand} src={ArrowIcon} style={{ padding: 10 }} />
  return (
    <Accordion expanded={isExpanded} className="accordion-container">
      <AccordionSummary expandIcon={expandMore()} >
        <div className="header-root-container">
          <CustomCheckBox selected={selectedRole?.includes(roleId)} onClick={handleRoleSelect} />
          <span onClick={handleRoleSelect} className="header-text-container">
            {renderText || ""}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="subrole-root-container">
          {subRolesList.map((subRoleItem) => (
            <CustomRoleComponent
              key={subRoleItem._id}
              subRoleId={subRoleItem._id}
              subRoleName={subRoleItem.name}
              selectedSubRole={selectedSubRole}
              handleSubroleSelect={() => handleSubroleSelect(subRoleItem, selectedRole?.includes(roleId), roleId, subRolesList)}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordian;
