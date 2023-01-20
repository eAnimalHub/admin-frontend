import { invokeApi } from "../../bl_libs/invokeApi";

export const addBreedApi = async (data) => {
  const requestObj = {
    path: `api/breed/add_new_breed`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const breedListingApi = async () => {
  const requestObj = {
    path: `api/breed/list_all_breeds`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const deleteBreedApi = async (id) => {
  const requestObj = {
    path: `api/breed/delete_breed/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const editBreedApi = async (data, id) => {
  const requestObj = {
    path: `api/breed/update_breed/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
