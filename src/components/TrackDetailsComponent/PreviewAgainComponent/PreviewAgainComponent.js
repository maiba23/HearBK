import React from "react";
import "./previewAgain.style.scss";
import { ReactComponent as Clear } from "../../../assets/img/musician/clear input.svg";
import CustomCheckbox from "../../../common/CustomCheckBox";
import Button from "../../../common/Button";

export default function PreviewAgainComponent({ handleClose, previewItems, selectedPreviewItem, handleSelectPreview, handlePay }) {
  return (
    <div className="preview-again-container">
      <div className="preview-again-header-container">
        <Clear onClick={handleClose} />
      </div>
      <div className="preview-again-main-container">
        <div className="preview-again-title">Preview in queue</div>
        <div className="preview-again-subtitle">You can playlist your track in queue again</div>
        <div className="preview-again-note">Please note, that your overall scrore rating can only change upwards!</div>
        <section className="preview-item-list">
          {previewItems.map((item) => (
            <PreviewItem
              key={item.id}
              onClick={() => handleSelectPreview(item)}
              count={item.count}
              amount={item.amount}
              selected={selectedPreviewItem.id === item.id}
            />
          ))}
        </section>
        <Button onClick={handlePay} buttonText={`Pay $${selectedPreviewItem.amount}`} className="preview-pay-button" />
      </div>
    </div>
  );
}

const PreviewItem = ({ count, amount, selected, onClick }) => {
  return (
    <div className="preview-item">
      <aside className="preview-item-left">
        <CustomCheckbox onClick={onClick} selected={selected} />
        <div className="count">{count} reviews</div>
      </aside>
      <aside className="preview-item-right">${amount}</aside>
    </div>
  );
};
