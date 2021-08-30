import React from "react";
import starIcon from "../../assets/icon/star.svg";
import starAltIcon from "../../assets/icon/star-alt.svg";
import sadIcon from "../../assets/icon/sad.svg";

const Rating = ({ rating, onClick, width }) => {
  return (
    <div className="rate-icons">
      {rating >= 0 &&
        [...Array(5)].map((item, index) => {
          return rating < index + 1 ? (
            <img style={{ marginRight: 16, width: width || 24 }} key={index} onClick={() => onClick(index + 1)} src={starAltIcon} alt="" />
          ) : (
            <img style={{ marginRight: 16, width: width || 24 }} key={index} onClick={() => onClick(index + 1)} src={starIcon} alt="" />
          );
        })}

      {rating < 0 && <img src={sadIcon} alt="" />}
    </div>
  );
};

export default Rating;
