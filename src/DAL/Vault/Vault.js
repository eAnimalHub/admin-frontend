import { invokeApi } from "../../bl_libs/invokeApi";

// export const AddEventApi = async (data) => {
//   const requestObj = {
//     path: `api/event/add_member_event/`,
//     method: "POST",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     postData: data,
//   };
//   return invokeApi(requestObj);
// };

export const VaultListing = async (data) => {
  const requestObj = {
    path: `api/vault_category/list_vault_category`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

// export const DeleteEvent = async (event_slug) => {
//   const requestObj = {
//     path: `api/event/${event_slug}`,
//     method: "DELETE",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//   };
//   return invokeApi(requestObj);
// };

// export const EditEventApi = async (event_slug, data) => {
//   const requestObj = {
//     path: `api/event/update_member_event/${event_slug}`,
//     method: "PUT",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     postData: data,
//   };
//   return invokeApi(requestObj);
// };
