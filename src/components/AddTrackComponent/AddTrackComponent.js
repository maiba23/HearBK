import React from "react";
import arrowLeft from "../../assets/icon/arrow-left.svg";
import CustomCheckbox from "../../common/CustomCheckBox";
import FileDropper from "../../common/FileDropper";
import InputField from "../../common/InputField";
import ToggleSwitch from "../../common/ToggleSwitch";
import breakerIcon from "../../assets/icon/breaker.svg";
import uploadIcon from "../../assets/icon/uploads.svg";
import bellIcon from "../../assets/img/dashboard/bell.svg";
import deleteIcon from "../../assets/icon/delete.svg";
import uploadFailedIcon from "../../assets/icon/error.png";
import uploadedIcon from "../../assets/icon/uploaded.png";
import Button from "../../common/Button";
import "./addTrack.style.scss";
import { CircularProgress, Drawer, makeStyles } from "@material-ui/core";
import Styles from "../Musicians/Styles";
import content from "./content";
import PaymentDrawer from "../PaymentDrawer";
import { useHistory } from "react-router";
import { Detector } from "react-detect-offline";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: (props) => props.color,
  },
}));

export default function AddTrackComponent({
  selectedFile,
  handleFileDrop,
  handleClearFile,
  firstTimeUpload,
  premiumUser,
  handleActivateProAccount,
  activateProAccount,
  computeAmount,
  trackNameRef,
  trackAuthorRef,
  errors,
  handleSubmit,
  genres,
  selectedGenre,
  handleGenre,
  selectedStyles,
  handleStylesSelect,
  closeStylesMenu,
  showStylesMenu,
  styles,
  handleBack,
  handleCancelSubscription,
  handlePaymentMenu,
  showPaymentMenu,
  handlePaymentTokenReceive,
  selectedCover,
  handleCoverDrop,
  handleClearCover,
  addTrackLoading,
  fileUploadLoading,
  uploadDetails,
  uploadTrackRef,
  uploadTrackThumbRef,
  handleTrackFileUpload,
  addSuccess,
  cancelTrackUpload,
  handelCancelTrackUpload,
  paymentPlan,
  promoCode,
  handlePaymentPlan,
  verifyPromoCode,
  handleActivateProYearlyAccount,
  activateProYearly,
  selectedGenreMultiple
}) {
  const classes = useStyles({ color: uploadDetails?.fileUploadProgress !== 100 ? "#c8a86b" : "#42ae55" });
  const classesCover = useStyles({ color: uploadDetails?.coverUploadProgress !== 100 ? "#c8a86b" : "#42ae55" });
  const isUploading =
    !addSuccess &&
    selectedFile &&
    !uploadDetails?.fileUploadError &&
    (uploadDetails?.fileUploadLoading ||
      uploadDetails?.coverUploadProgress > 0 ||
      uploadDetails?.fileUploadProgress > 0 ||
      addTrackLoading);

  return (
    <Detector
      render={({ online }) => (
        <>
          <UploadingState
            visible={!cancelTrackUpload && online && isUploading}
            progress={(uploadDetails?.fileUploadProgress + uploadDetails?.coverUploadProgress) / 2}
            onCancel={() => {
              handelCancelTrackUpload(true);
              handleClearFile();
            }}
          />
          <UploadingFailedState
            visible={(!online && isUploading) || (selectedFile && uploadDetails?.fileUploadError)}
            onTryAgain={handleClearFile}
          />
          <UploadingSuccessState visible={!cancelTrackUpload && addSuccess} />
          <section className="add-track-status-container">
            <div onClick={handleBack} className="back-action">
              <img src={arrowLeft} alt="" />
              <span>{content.BACK_ACTION_TITLE}</span>
            </div>
            <div className="status-title">
              <span>{content.ADD_NEW_TRACK}</span>
            </div>
            <div className="status-right"></div>
          </section>
          <div className="add-track-container">
            <div className="add-track-header">{content.ADD_TRACK_HEADER}</div>
            <div className="add-track-sub-header">{content.ADD_TRACK_SUBHEADER}</div>
            <div className="add-track-seperator"></div>

            <section className="track-upload">
              <div ref={uploadTrackRef} className="track-upload-title">
                {content.UPLOAD_TRACK}
              </div>
              <div className="upload-modes">
                <aside className="mp3">
                  <CustomCheckbox selected />
                  <span>{content.MP3_UPLOAD}</span>
                </aside>
                {/* {(addTrackLoading || fileUploadLoading || !!uploadDetails?.coverUploadProgress) && (
              <div className="dont-naviagte-status">Don’t navigate from this page until your upload has completed.</div>
            )} */}
                {/* <aside className="youtube">
              <CustomCheckbox />
              <span>{content.YOUTUBE_LINK}</span>
            </aside> */}
                {Boolean(errors.fileType) && <span className="error-text">{errors.fileErrorMessage}</span>}
              </div>
            </section>

            {!selectedFile && (
              <section className={`file-dropper ${errors.file ? "error" : ""}`}>
                <FileDropper accept=".mp3" className="file-dropper-wrapper" onDrop={handleFileDrop}>
                  <div className="file-dropper-title">
                    Drag or <span>upload</span> file
                  </div>
                  <div className="file-dropper-subtitle">
                    {content.FILE_DROP_TITLE} <span>15MB</span>
                  </div>
                </FileDropper>
              </section>
            )}

            {selectedFile && (
              <section className="selected-file">
                <div onClick={handleClearFile} className="delete-selected-file">
                  <img src={deleteIcon} alt="" />
                  {/* {!fileUploadLoading && <img src={deleteIcon} alt="" />} */}
                  {/* {fileUploadLoading && (
                <CircularProgress variant="determinate" value={uploadDetails?.fileUploadProgress} className={classes.buttonProgress} />
              )} */}
                </div>
                <aside className="selected-file-name">
                  <div className="selected-file-title">{selectedFile.name}</div>
                  {uploadDetails?.fileUploadError && <div className="selected-file-subtitle">{uploadDetails?.fileUploadError}</div>}
                </aside>
              </section>
            )}

            <section className="track-genres">
              <div className="track-genres-title">{content.GENRES}</div>
              <div className="genre-list-container">
                {genres.map((genreItem) => (
                  <GenreItem
                    showCount={!!selectedGenreMultiple.find((el) => el?.id === genreItem?._id)}
                    onClick={() => handleGenre(genreItem)}
                    key={genreItem._id}
                    title={genreItem.name}
                    selected={!!selectedGenreMultiple.find((el) => el?.id === genreItem?._id)}
                    count={selectedGenreMultiple.find((el) => el?.id === genreItem?._id)?.styleId?.length || 0}
                  />
                ))}
              </div>
            </section>

            <section className="track-info">
              <div ref={uploadTrackThumbRef} className="track-info-title">
                {content.TRACK_INFO}
              </div>
              <div className="track-info-container">
                <aside className={`track-info-container-left ${errors.cover ? "error" : ""}`}>
                  <div className="track-info-subtitle">{content.TRACK_THUMB}</div>
                  {!selectedCover && (
                    <FileDropper accept="image/*" className="file-dropper-wrapper" onDrop={handleCoverDrop}>
                      <div className="file-dropper-title">
                        Drag or <span>upload</span> file
                      </div>
                      <div className="file-dropper-subtitle">
                        {content.FILE_DROP_TITLE} <span>15MB</span>
                      </div>
                    </FileDropper>
                  )}

                  {selectedCover && (
                    <section className="selected-track-thumb">
                      <div onClick={handleClearCover} className="delete-selected-cover">
                        <img src={deleteIcon} alt="" />
                        {/* {!uploadDetails?.coverUploadProgress && <img src={deleteIcon} alt="" />} */}
                        {/* {!!uploadDetails?.coverUploadProgress && (
                      <CircularProgress
                        variant="determinate"
                        size={20}
                        value={uploadDetails?.coverUploadProgress || 56}
                        className={classesCover.buttonProgress}
                      />
                    )} */}
                      </div>
                      <div className="selected-cover">
                        <img src={URL.createObjectURL(selectedCover)} alt="" />
                      </div>
                    </section>
                  )}
                </aside>
                <aside className="track-info-container-right">
                  <div className="track-info-subtitle">{content.TRACK_NAME}</div>
                  <InputField passableRef={trackNameRef} className={`track-info-input-2 ${errors.trackName ? "error-border" : ""}`} />
                  <div className="track-info-subtitle pt24">{content.TRACK_AUTHOR}</div>
                  <InputField passableRef={trackAuthorRef} className={`track-info-input-2`} />
                  <div className="track-add-description">{content.TRACK_INFO_DESCRIPTION}</div>
                </aside>
              </div>
            </section>
            <div className="add-track-seperator"></div>

            <section className="payment-plan">
              <div className="payment-plan-title">{content.PAYMENT_PLAN_TITLE}</div>
            </section>
          </div>
          <div className="add-track-container mobile-full">
            <section className="one-time-upload">
              {Boolean(firstTimeUpload) && (
                <>
                  <aside className="one-time-upload-left">
                    <CustomCheckbox selected />
                    <div className="one-time-upload-details">
                      <div className="title">{content.FIRST_UPLOAD}</div>
                      <div className="subtitle">
                        <span>{content.FIRST_UPLOAD_FUTURE}</span>
                      </div>
                    </div>
                  </aside>
                </>
              )}

              {!Boolean(firstTimeUpload) && (
                <>
                  <div className="one-time-upload-div">
                  <aside className="one-time-upload-left">
                    <CustomCheckbox selected />
                    <div className="one-time-upload-details">
                      <div className="title">{content.ONE_TIME_UPLOAD}</div>
                      <div className="subtitle">
                        <span>Future uploads - {premiumUser || activateProAccount ? "$5" : "$9"} per track</span>
                      </div>
                    </div>
                  </aside>
                  <aside className="one-time-upload-right">
                    <div className="amount">{premiumUser || activateProAccount ? "$5" : "$9"}</div>
                  </aside>
                  </div>
                </>
              )}
              <>
            {!Boolean(firstTimeUpload) && <div className="one-time-upload-div">
              <aside className="one-time-upload-left">
                <CustomCheckbox selected = {paymentPlan.isPromoCode} onClick = {(event) => handlePaymentPlan(event,paymentPlan.isPromoCode,'isPromoCode')}/>
                <div className="one-time-upload-details">
                  <div className="title">{content.USE_PROMO_CODE}</div>
                    {paymentPlan.isPromoCode && <div>
                      <div className="subtitle-promo-code">
                        <span>Enter promo code</span>
                      </div>
                      <InputField onChange = {verifyPromoCode} className={promoCode.isValidPromoCode ?'promo-code-input-with-success' : `promo-code-input`} />
                      {errors.propCodeStatus &&<div>
                        <span className="error-promo-code">This code is incorrect or no longer valid</span>
                      </div>}
                    </div>}
                </div>
              </aside>
              {paymentPlan.isPromoCode && <aside className="one-time-upload-right" style = {{alignSelf:'center',marginTop:'34px'}}>
                <div className="amount">{`${promoCode.amount ? '-':''}$${promoCode.amount}`}</div>
              </aside>}
            </div>}
          </>
            </section>

            {premiumUser && (
              <section className="cancel-pro-subscription">
                <aside className="cancel-pro-left">
                  <div className="cancel-pro-title">Premium Plan</div>
                  <div className="cancel-pro-amount">$14/month</div>
                </aside>
                <aside className="cancel-pro-right">
                  <Button onClick={handleCancelSubscription} className="cancel-pro-button" buttonText="CANCEL PLAN" />
                </aside>
              </section>
            )}
          </div>
          <div className="add-track-container">
            {!premiumUser && (
              <section className="pro-account-section-wrapper">
                {/* Monthly section */}
                <div className="pro-account-section p-1">
                  <aside className="pro-account-left">
                    <div className="pro-account-switch">
                      <ToggleSwitch checked={activateProAccount} onChange={handleActivateProAccount} />
                    </div>
                    <div className="pro-account-details">
                      <div className="title">{content.ACTIVATE_PRO}</div>
                    </div>
                  </aside>
                  <aside className="pro-account-right">{content.PRO_PRICING}</aside>
                </div>
                {/* Yearly section */}
                <div className="pro-account-section">
                  <aside className="pro-account-left">
                    <div className="pro-account-switch">
                      <ToggleSwitch checked={activateProYearly} onChange={handleActivateProYearlyAccount} />
                    </div>
                    <div className="pro-account-details">
                      <div className="title">{content.ACTIVATE_PRO}</div>
                    </div>
                  </aside>
                  <aside className="pro-account-right">$ 100 / year</aside>
                </div>

                <div className="feature-details">
                  <img src={uploadIcon} alt="" />
                  <span className="green">{content.PRO_DETAILS_1}</span>
                </div>
                <div className="feature-details">
                  <img src={breakerIcon} alt="" />
                  <span>{content.PRO_DETAILS_2}</span>
                </div>
                <div className="feature-details">
                  <img src={bellIcon} alt="" />
                  <span>{content.PRO_DETAILS_3}</span>
                </div>
              </section>
            )}

            <div className="add-track-seperator"></div>

            <section className="submit-action-button">
              <Button
                loading={addTrackLoading}
                onClick={handleSubmit}
                className="payment-submit-button"
                buttonText={computeAmount() === "0.00" ? "Submit" : `Submit & Pay $${computeAmount()}`}
              />
            </section>

            <Drawer anchor="right" open={showStylesMenu} onClose={closeStylesMenu}>
              <Styles
                onClose={closeStylesMenu}
                handleStylesSelect={handleStylesSelect}
                styles={styles}
                selectedStyles={selectedStyles}
                selectedGenre={selectedGenre}
              />
            </Drawer>

            <PaymentDrawer
              loading={addTrackLoading}
              open={showPaymentMenu}
              amount={computeAmount()}
              handleClose={handlePaymentMenu}
              handlePaymentTokenReceived={handlePaymentTokenReceive}
            />
          </div>
        </>
      )}
    ></Detector>
  );
}

const GenreItem = ({ title, onClick, selected, count, showCount }) => {
  return (
    <div onClick={onClick} className={`genre-item ${selected ? "is-selected" : ""}`}>
      <span>{title}</span>
      {showCount && <span className="count">{count}</span>}
    </div>
  );
};

export const UploadingState = ({ progress, visible, onCancel }) => {
  const classes = useStyles({ color: "#c8a86b" });
  if (!visible) return null;
  return (
    <>
      <div className="upload-dim-wrapper" />
      <div className="add-track-uploading-state">
        <CircularProgress size={120} variant="determinate" value={progress} className={classes.buttonProgress} />
        <div className="upload-title">UPLOADING...</div>
        <div className="upload-subtitle">Please don’t leave the page, until the upload completes.</div>
        <Button buttonText="CANCEL" onClick={onCancel} className="cancel-button" />
      </div>
    </>
  );
};

export const UploadingFailedState = ({ visible, onTryAgain }) => {
  if (!visible) return null;
  return (
    <>
      <div className="upload-dim-wrapper" />
      <div className="add-track-uploading-state">
        <img className="add-track-upload-failed" src={uploadFailedIcon} alt="" />
        <div className="upload-title">UPLOAD FAILED</div>
        <div className="upload-subtitle">Please, retry to upload your track again!</div>
        <Button buttonText="TRY AGAIN" onClick={() => onTryAgain()} className="failed-try-again-button" />
      </div>
    </>
  );
};

export const UploadingSuccessState = ({ visible, onGotIt }) => {
  const history = useHistory();
  if (!visible) return null;
  return (
    <>
      <div className="upload-dim-wrapper" />
      <div className="add-track-uploading-state">
        <img className="add-track-upload-failed" src={uploadedIcon} alt="" />
        <div className="upload-title">UPLOAD SUCCESS</div>
        <Button buttonText="GOT IT" onClick={onGotIt ? onGotIt() : () => history.push("/dashboard")} className="failed-try-again-button" />
      </div>
    </>
  );
};

export const PaymentState = ({ visible }) => {
  const classes = useStyles({ color: "#c8a86b" });
  if (!visible) return null;
  return (
    <>
      <div className="upload-dim-wrapper" />
      <div className="add-track-uploading-state">
        <div className="upload-title">PROCESSING...</div>
        <div className="upload-subtitle">Please don’t leave the page, until the payment completes.</div>
      </div>
    </>
  );
};