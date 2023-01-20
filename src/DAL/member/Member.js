import { invokeApi } from "../../bl_libs/invokeApi";

export const MemberListing = async (data) => {
  const requestObj = {
    path: `api/member/active_member_list_by_consultant`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const addPersonalNote = async (data) => {
  const requestObj = {
    path: `api/member/update_personal_note`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const getNinetyDayQuestionApi = async (data) => {
  const requestObj = {
    path: `api/ninteen_day_vision_questions/get_question`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const memberGroupListApi = async (id) => {
  const requestObj = {
    path: `api/member/member_group_list/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const memberDetailApi = async (id) => {
  const requestObj = {
    path: `api/member/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const AllMemberListing = async (data) => {
  const requestObj = {
    path: `api/member/member_list_by_consultant`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
