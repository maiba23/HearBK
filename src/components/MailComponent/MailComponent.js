import React from "react";
import "./mail.style.scss";
import arrowLeft from "../../assets/icon/arrow-left.svg";

export default function MailComponent({ selectedMail, clearSelectedMail, handleSelectMail, mails }) {
  return (
    <div className="mail-container">
      <aside className={`mail-left-side ${selectedMail ? "" : "show-on-mobile"}`}>
        {mails.map((item) => (
          <div
            onClick={() => handleSelectMail(item)}
            key={item._id}
            className={`mail-list-item ${item._id === selectedMail?._id ? "active" : ""}`}
          >
            <div className="mail-image">
              <img src={item.image} alt="" />
            </div>
            <div className="mail-content">
              <div className="mail-subject">{item.subject}</div>
              <div className="mail-from">{item.from}</div>
              <div className="mail-time">{item.time}</div>
            </div>
          </div>
        ))}
      </aside>

      {selectedMail && (
        <aside className="mail-right-side">
          <div className="view-mail-navbar">
            <img onClick={clearSelectedMail} src={arrowLeft} alt="" />
          </div>

          <div className="view-mail-wrapper">
            <div className="view-mail-header">
              <div className="mail-subject">{selectedMail?.subject}</div>
              <div className="mail-from">{selectedMail?.from}</div>
              <div className="mail-time">{selectedMail?.time}</div>
            </div>
            <div className="view-mail-body" dangerouslySetInnerHTML={{ __html: selectedMail?.body }}></div>
          </div>
        </aside>
      )}
    </div>
  );
}
