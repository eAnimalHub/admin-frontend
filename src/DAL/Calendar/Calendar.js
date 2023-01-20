import { invokeApi } from "../../bl_libs/invokeApi";

export const AddEventApi = async (data) => {
  const requestObj = {
    path: `api/event/consultant/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const eventsListing = async (data) => {
  const requestObj = {
    path: `api/event/consultant`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const eventsDetailApi = async (event_slug) => {
  const requestObj = {
    path: `api/event/detail/${event_slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeleteEvent = async (event_slug) => {
  const requestObj = {
    path: `api/event/${event_slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const EditEventApi = async (event_slug, data) => {
  const requestObj = {
    path: `api/event/consultant/${event_slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
