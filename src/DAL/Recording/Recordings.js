import { invokeApi } from "../../bl_libs/invokeApi";

export const AddRecording = async (data) => {
  const requestObj = {
    path: `api/program_recording/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const DeleteAudioApi = async (slug, data) => {
  const requestObj = {
    path: `api/program_recording/${slug}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const RecordingListing = async (data) => {
  const requestObj = {
    path: `api/program_recording`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeleteRecording = async (recoding_slug) => {
  const requestObj = {
    path: `api/program_recording/${recoding_slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const EditRecordingApi = async (recording_slug, data) => {
  const requestObj = {
    path: `api/program_recording/${recording_slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
