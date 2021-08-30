import React from "react";
import FileDropper from "../../common/FileDropper";
import "./personalInfo.style.scss";
import addIcon from "../../assets/icon/add.svg";
import searchIcon from "../../assets/img/dashboard/search.svg";
import editIcon from "../../assets/icon/edit.svg";
import Autocomplete from "react-google-autocomplete";
import Button from "../../common/Button";
import FilePicker from "../../common/FileDropper/FilePicker";
import content from "./content";

export default function PersonalInfoComponent({
  selectedGender,
  handleGenderSelect,
  rolesList,
  handleRoleSelect,
  selectedRole,
  countSubroles,
  genderArray,
  dateMMRef,
  dateDDRef,
  dateYYYYRef,
  errors,
  handleCity,
  handleSubmit,
  handleCoverDrop,
  selectedCover,
  handleOnEnterPressed,
}) {
  return (
    <div className="personal-info-container">
      <div className="personal-info-title">{content.TITLE}</div>

      <div className="personal-info-dp">
        {!selectedCover && (
          <div className="cover-dropper-area">
            <FileDropper className={`cover-dropper-wrapper ${errors.cover ? "error" : ""}`} accept="image/*" onDrop={handleCoverDrop}>
              <img className="cover-dropper-image" src={addIcon} alt="" />
              <div className="cover-dropper-subtitle">{content.UPLOAD_TITLE}</div>
            </FileDropper>
          </div>
        )}

        {selectedCover && (
          <div className="selected-cover-area">
            <div className="edit-ico">
              <FilePicker accept="image/*" onUpload={handleCoverDrop}>
                <img className="edit-img" src={editIcon} alt="" />
              </FilePicker>
            </div>
            <img className="selected-dp-image" src={URL.createObjectURL(selectedCover)} alt="" />
          </div>
        )}
      </div>

      <div className="personal-info-seperator" />

      <section className="personal-info-location">
        <div className="personal-info-location-title">{content.LOCATION_TITLE}</div>

        <div className="location-picker">
          <img className="location-search-icon" src={searchIcon} alt="" />
          <Autocomplete
            className={`google-location-picker ${errors.city ? "error" : ""}`}
            placeholder="Start typing something..."
            onPlaceSelected={(place) => {
              handleCity(place?.formatted_address);
            }}
            //componentRestrictions={{ country: "us" }}
          />
        </div>
      </section>

      <div className="personal-info-seperator" />

      <section className="personal-info-gender-dob">
        <aside className="gender-section">
          <div className="gender-section-title">{content.GENDER_TITLE}</div>
          <div className="gender-section-items">
            {genderArray.map((item, index) => (
              <GenderItem
                error={errors?.gender}
                key={index}
                name={item}
                onClick={() => handleGenderSelect(item)}
                selected={selectedGender === item}
              />
            ))}
          </div>
        </aside>
        <aside className="dob-section">
          <div className="dob-section-title">{content.DOB_TITLE}</div>
          <div className="dob-section-items">
            <input
              ref={dateMMRef}
              onKeyDown={(e) => handleOnEnterPressed("mm", e)}
              onChange={(e) => handleOnEnterPressed("mm", e, true)}
              className={`dob-input-field ${errors?.mm ? "error" : ""}`}
              placeholder="MM"
              type="text"
            />
            <input
              ref={dateDDRef}
              onKeyDown={(e) => handleOnEnterPressed("dd", e)}
              onChange={(e) => handleOnEnterPressed("dd", e, true)}
              className={`dob-input-field ${errors?.dd ? "error" : ""}`}
              placeholder="DD"
              type="text"
            />
            <input ref={dateYYYYRef} className={`dob-input-field ${errors?.yyyy ? "error" : ""}`} placeholder="YYYY" type="text" />
          </div>
        </aside>
      </section>

      <div className="personal-info-seperator" />

      <section className="personal-info-role">
        <div className="personal-info-role-title">{content.ROLES_TITLE}</div>
        <div className="personal-info-role-items">
          {rolesList.map((item) => {
            const isRoleSelected = selectedRole?.includes(item._id);
            return (
              <RoleItem
                onClick={() => handleRoleSelect(item)}
                key={item._id}
                selected={!!isRoleSelected}
                count={countSubroles(item._id)}
                name={item.name}
              />
            );
          })}
        </div>
      </section>

      <div className="personal-info-seperator" />

      <section className="personal-info-action">
        <Button onClick={handleSubmit} className="personal-info-button" buttonText="Done" />
      </section>
    </div>
  );
}

const GenderItem = ({ selected, name, onClick, error }) => {
  return (
    <div onClick={onClick} className={`gender-item ${error ? "error " : ""} ${selected ? "selected" : ""}`}>
      {name}
    </div>
  );
};

const RoleItem = ({ selected, name, onClick, count }) => {
  return (
    <div onClick={onClick} className={`role-item ${selected ? "selected" : ""}`}>
      <span className="role-item-name">{name}</span>
      {!!count && <span className="role-item-count">{count}</span>}
    </div>
  );
};
