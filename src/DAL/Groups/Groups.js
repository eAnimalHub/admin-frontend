import { invokeApi } from "../../bl_libs/invokeApi";

export const AddGroupApi = async (data) => {
  const requestObj = {
    path: `api/group`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const GroupListing = async (data) => {
  const requestObj = {
    path: `api/group/active_list_by_consultant/`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const AllGroupListing = async (data) => {
  const requestObj = {
    path: `api/group/consultant`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };

  return invokeApi(requestObj);
};
export const GroupDetailApi = async (group_slug) => {
  const requestObj = {
    path: `api/group/detail/${group_slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeleteGroup = async (group_slug) => {
  const requestObj = {
    path: `api/group/${group_slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const EditGroupApi = async (group_slug, data) => {
  const requestObj = {
    path: `api/group/${group_slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
