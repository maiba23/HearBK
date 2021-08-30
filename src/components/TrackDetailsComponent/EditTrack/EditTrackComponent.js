import React from "react";
import "./editTrack.style.scss";
import { ReactComponent as Clear } from "../../../assets/img/musician/clear input.svg";
import InputField from "../../../common/InputField";
import deleteIcon from "../../../assets/icon/delete.svg";
import Button from "../../../common/Button";
import FileDropper from "../../../common/FileDropper";

export default function EditTrackComponent({
  handleClose,
  trackName,
  handleTrackName,
  trackAuthor,
  handleTrackAuthor,
  genres,
  handleGenre,
  selectedGenre,
  selectedStyles,
  handleSave,
  selectedCover,
  handleCoverDrop,
  trackExistingCover,
  handleClearCover,
  handleTrackDelete,
  deleteLoading,
  selectedGenreMultiple,
}) {
  return (
    <div className="edit-track-container">
      <div className="edit-track-header-container">
        <Clear onClick={handleClose} />
      </div>
      <div className="edit-track-main-container">
        <div className="edit-track-title">Edit a track</div>

        <section className="edit-track-inputs">
          <div className="edit-track-input-title">Track name</div>
          <InputField onChange={handleTrackName} value={trackName} className="edit-track-input-field" placeholder="Track name" />
          <div className="edit-track-input-title">Track author</div>
          <InputField value={trackAuthor} onChange={handleTrackAuthor} className="edit-track-input-field" placeholder="Track author" />

          <div className="edit-track-author-details">
            If you are not the creator of the track, you can include the name of the author. It will be shown in the queue.
          </div>

          <div className="edit-track-input-title">Track thumb</div>

          {!selectedCover && !trackExistingCover && (
            <div className="file-dropper">
              <FileDropper accept="image/*" className="file-dropper-wrapper" onDrop={handleCoverDrop}>
                <div className="file-dropper-title">
                  Drag or <span>upload</span> file
                </div>
                <div className="file-dropper-subtitle">
                  You may attach up to 1 file under the size of <span>15MB</span>
                </div>
              </FileDropper>
            </div>
          )}

          {(selectedCover || trackExistingCover) && (
            <div className="edit-track-thumb-image-container">
              <div onClick={handleClearCover} className="delete-icon">
                <img className="delete-icon-element" src={deleteIcon} alt="" />
              </div>
              <img
                className="edit-track-thumb-image"
                src={selectedCover ? URL.createObjectURL(selectedCover) : trackExistingCover}
                alt=""
              />
            </div>
          )}
        </section>

        <section className="edit-track-genre">
          <div className="genre-title">Genres</div>

          <div className="genre-item-list">
            {genres.map((item) => (
              <GenreItem
                key={item?._id}
                onClick={() => handleGenre(item)}
                selected={!!selectedGenreMultiple.find((el) => el?.id === item?._id)}
                // selected={item._id === selectedGenre?._id}
                title={item.name}
                count={selectedGenreMultiple.find((el) => el?.id === item?._id)?.styleId?.length || 0}
              />
            ))}
          </div>
        </section>

        <Button onClick={handleSave} className="edit-track-save-button" buttonText="Save" />
        <Button
          className="edit-track-delete-button"
          loadingColor="#fff"
          loading={deleteLoading}
          onClick={handleTrackDelete}
          buttonText="Delete track"
        />
      </div>
    </div>
  );
}

const GenreItem = ({ title, count, selected, onClick }) => {
  return (
    <div onClick={onClick} className={`genre-item ${selected ? "is-selected" : ""}`}>
      <span className="title">{title}</span>
      {!!count && selected && <span className="count">{count}</span>}
    </div>
  );
};
