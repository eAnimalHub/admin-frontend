import { invokeApi } from "../../bl_libs/invokeApi";

export const EditProfileApi = async (id, data) => {
  const requestObj = {
    path: `api/consultant/profile/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const GetProfileApi = async (id) => {
  const requestObj = {
    path: `api/consultant/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const changePassword = async (data) => {
  const requestObj = {
    path: `api/consultant/change_password_by_consultant`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
