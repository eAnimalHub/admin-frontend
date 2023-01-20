import { invokeApi } from "../../bl_libs/invokeApi";

export const AddPods = async (data) => {
  const requestObj = {
    path: `api/room/consultant`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const PodsListing = async (data) => {
  const requestObj = {
    path: `api/room`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeletePod = async (id) => {
  const requestObj = {
    path: `api/room/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const EditPods = async (pods_slug, data) => {
  const requestObj = {
    path: `api/room/consultant/${pods_slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
