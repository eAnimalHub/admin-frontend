import { invokeApi } from "../../bl_libs/invokeApi";

export const dashboardDataApi = async (data) => {
  const requestObj = {
    path: `init/admin_dashboard`,
    method: "GET",
    headers: { "x-sh-auth": localStorage.getItem("token") },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const editProfileApi = async (id, data) => {
  const requestObj = {
    path: `api/admin/edit_admin/${id}`,
    method: "PUT",
    headers: { "x-sh-auth": localStorage.getItem("token") },
    postData: data,
  };
  return invokeApi(requestObj);
};
