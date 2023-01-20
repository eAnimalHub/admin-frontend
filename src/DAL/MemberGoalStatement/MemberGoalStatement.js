import { invokeApi } from "../../bl_libs/invokeApi";

export const goalMemberListingApi = async (data) => {
  const requestObj = {
    path: `api/goal_statement_question/user_list_goal_statement_for_consultant`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

// export const getDetailQuestion = async (id) => {
//   const requestObj = {
//     path: `api/goal_statement_question/${id}`,
//     method: "GET",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//   };
//   return invokeApi(requestObj);
// };

export const AddCommentOnQuestion = async (data) => {
  const requestObj = {
    path: `api/goal_statement_question/add_comment_on_goal_statement_question`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
// export const EditQuestion = async (data, id) => {
//   console.log(id, "params.id");
//   const requestObj = {
//     path: `api/goal_statement_question/consultant/${id}`,
//     method: "PUT",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     postData: data,
//   };
//   return invokeApi(requestObj);
// };
// // export const getGoalStatementQuestion = async (id) => {
// //   console.log(id, "params.id");
// //   const requestObj = {
// //     path: `api/member/get_goal_statement_by_member_id/${id}`,
// //     method: "GET",
// //     headers: {
// //       "x-sh-auth": localStorage.getItem("token"),
// //     },
// //     // postData: data,
// //   };
// //   return invokeApi(requestObj);
// // };
export const DeleteQuestionCommentApi = async (id) => {
  const requestObj = {
    path: `api/goal_statement_question/comment/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    // postData: data,
  };
  return invokeApi(requestObj);
};
export const questionReplyHistory = async (data) => {
  const requestObj = {
    path: `api/member/get_answer_stat`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
