import { invokeApi } from "../../bl_libs/invokeApi";

export const departmentListAPI = async (data) => {
  const requestObj = {
    path: `api/department/list_active_department`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const AddSupportTicketAPI = async (data) => {
  const requestObj = {
    path: `api/support_ticket/add_support_ticket/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const ticketsListAPI = async (data) => {
  const requestObj = {
    path: `api/support_ticket/get_filtered_list_support_ticket_by_consultant`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const UploadSupportTicketImageOnS3 = async (data) => {
  const requestObj = {
    path: `api/support_ticket/upload_support_ticket_comment_images`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const SupportTicketDetailApi = async (ticket_id) => {
  const requestObj = {
    path: `api/support_ticket/detail_support_ticket/${ticket_id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const markResolved = async (ticket_id) => {
  const requestObj = {
    path: `api/support_ticket/close_support_ticket/${ticket_id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeleteSupportTicket = async (ticket_id) => {
  const requestObj = {
    path: `api/support_ticket/trash_support_ticket/${ticket_id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeleteSupportTicketImageOnS3 = async (data) => {
  const requestObj = {
    path: `api/support_ticket/delete_support_ticket_images_from_s3/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const UpdateSupportTicketAPI = async (ticket_id, data) => {
  const requestObj = {
    path: `api/support_ticket/edit_support_ticket/${ticket_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
