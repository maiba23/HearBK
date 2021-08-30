import { toast } from "react-toastify";
import history from "../../history";
import { axiosInstance } from "../../utils/axiosInstance";
import { submitPayment, uploadAudioFileToIPFS, uploadTrackCover } from "./orderActions";
import { updateTrackInfo } from "./userActions";

export const handleAddTrack = async (payload, selectedFile, selectedCover, handleLoading) => {
  try {
    handleLoading(true);
    const pay = await submitPayment(payload);
    const formData = new FormData();
    formData.append("trackUpload", selectedFile);
    handleLoading(true);
    await uploadAudioFileToIPFS(formData, pay[0].feedbackId, false);
    const coverFormData = new FormData();
    coverFormData.append("coverImage", selectedCover);
    await uploadTrackCover(coverFormData, pay[0].feedbackId, false);
    handleLoading(false);
    handleLoading(false);
    history.push("/dashboard"); // on success goto dashboard
  } catch (err) {
    handleLoading(false);
    handleLoading(false);
    toast.error("Couldn't complete your request, please try again");
  }
};

export const handleEditTrack = async (payload, selectedTrack, selectedCover) => {
  try {
    await updateTrackInfo(selectedTrack?._id, payload);
    if (selectedCover) {
      const coverFormData = new FormData();
      coverFormData.append("coverImage", selectedCover);
      await uploadTrackCover(coverFormData, selectedTrack?._id, false);
    }
  } catch (err) {
    toast.error("Couldn't complete your request, please try again");
  }
};

export const handleDeleteTrack = (trackId) => {
  return axiosInstance.delete(`/tracks/${trackId}`);
};

export const handleGetPresignedUrl = (trackId) => {
  return axiosInstance.get(`/tracks/${trackId}/presignedurl`);
};
