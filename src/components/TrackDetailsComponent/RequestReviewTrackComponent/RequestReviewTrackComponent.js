import React from "react";
import "./requestReviewDrawer.style.scss";
import { ReactComponent as Clear } from "../../../assets/img/musician/clear input.svg";
import InputField from "../../../common/InputField";
import searchIcon from "../../../assets/img/dashboard/search.svg";
import CustomCheckbox from "../../../common/CustomCheckBox";
import defIcon from "../../../assets/img/default-user-pic.png";
import Button from "../../../common/Button";

export default function RequestReviewTrackComponent({
  handleClose,
  handleSearch,
  influencers,
  searchText,
  handleInfluencerSelect,
  selectedInfluencer,
  computeAmountFromSelectedInfluencer,
  handleRequest,
}) {
  return (
    <div className="request-review-drawer-container">
      <div className="request-review-drawer-header-container">
        <Clear onClick={handleClose} />
      </div>
      <div className="request-review-drawer-main-container">
        <div className="request-review-drawer-title">Select an influencer</div>
        <div className="request-review-drawer-subtitle">
          At any time, you can order a review of your track from an influential people in the industry.
        </div>

        <div className="request-review-influencer-search">
          <img src={searchIcon} alt="" />
          <InputField value={searchText} onChange={handleSearch} className="influencer-search" placeholder="Search by influencer name..." />
        </div>

        <div className="influencer-list">
          {influencers.map((item) => {
            return (
              <InfluencerItem
                key={item._id}
                onClick={() => handleInfluencerSelect(item?._id)}
                selected={selectedInfluencer?.includes(item?._id)}
                displayName={item.display_name}
                image={item?.profile_image}
                price={item.price}
                required_review_rating={item?.required_review_rating}
              />
            );
          })}
        </div>
      </div>
      {!!selectedInfluencer?.length && (
        <Button onClick={handleRequest} className="request-button" buttonText={"Request $" + computeAmountFromSelectedInfluencer()} />
      )}
      {!selectedInfluencer?.length && <Button className="select-button" buttonText="Select an influencer" />}
    </div>
  );
}

const InfluencerItem = ({ displayName, price, onClick, selected, image, required_review_rating }) => {
  return (
    <div className="influencer-list-item">
      <aside className="influencer-list-item-left">
        <CustomCheckbox onClick={onClick} selected={selected} />
        <div className="influencer-details">
          <img src={image || defIcon} alt="" />
          <div className="details">
            <div className="name">{displayName}</div>
            <div className="score">Needed score {required_review_rating || 0}%</div>
          </div>
        </div>
      </aside>
      <aside className="influencer-list-item-right">${price || 0}</aside>
    </div>
  );
};
