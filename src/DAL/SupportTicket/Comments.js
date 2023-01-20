import { invokeApi } from "../../bl_libs/invokeApi";
export const UploadCommentImageOnS3 = async (data) => {
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

export const AddCommentAPI = async (data) => {
  const requestObj = {
    path: `api/support_ticket/add_support_ticket_comment/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const DeleteComment = async (comment_id) => {
  const requestObj = {
    path: `api/support_ticket/delete_support_ticket_comment/${comment_id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const DeleteCommentImageOnS3 = async (data) => {
  const requestObj = {
    path: `api/support_ticket/delete_support_ticket_comment_images_from_s3/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const UpdateCommentAPI = async (comment_id, data) => {
  const requestObj = {
    path: `api/support_ticket/edit_support_ticket_comment/${comment_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
