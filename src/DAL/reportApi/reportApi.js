import { invokeApi } from "../../bl_libs/invokeApi";

// export const AddCategoryApi = async (data) => {
//   const requestObj = {
//     path: `api/category/add_category`,
//     method: "POST",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     postData: data,
//   };
//   return invokeApi(requestObj);
// };
// export const DeleteAudioApi = async (slug, data) => {
//   const requestObj = {
//     path: `api/program_recording/${slug}`,
//     method: "POST",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     postData: data,
//   };
//   return invokeApi(requestObj);
// };

export const reportListingApi = async (id) => {
  const requestObj = {
    path: `api/ad_report/list_all_reports`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

// export const DeleteCategoryApi = async (id) => {
//   const requestObj = {
//     path: `api/category/delete_category/${id}`,
//     method: "DELETE",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//   };
//   return invokeApi(requestObj);
// };

// export const EditCategoryApi = async (id, data) => {
//   const requestObj = {
//     path: `api/category/update_category/${id}`,
//     method: "PUT",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     postData: data,
//   };
//   return invokeApi(requestObj);
// };
