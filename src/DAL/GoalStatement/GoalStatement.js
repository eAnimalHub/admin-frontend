import { invokeApi } from "../../bl_libs/invokeApi";

export const DeleteQuestion = async (id) => {
  const requestObj = {
    path: `api/goal_statement_question/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const QuestionListing = async (data) => {
  const requestObj = {
    path: `api/goal_statement_question/consultant`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const getDetailQuestion = async (id) => {
  const requestObj = {
    path: `api/goal_statement_question/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const AddQuestion = async (data) => {
  const requestObj = {
    path: `api/goal_statement_question/consutant`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const EditQuestion = async (data, id) => {
  console.log(id, "params.id");
  const requestObj = {
    path: `api/goal_statement_question/consultant/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
// export const getGoalStatementQuestion = async (id) => {
//   console.log(id, "params.id");
//   const requestObj = {
//     path: `api/member/get_goal_statement_by_member_id/${id}`,
//     method: "GET",
//     headers: {
//       "x-sh-auth": localStorage.getItem("token"),
//     },
//     // postData: data,
//   };
//   return invokeApi(requestObj);
// };
export const questionDetailApi = async (id) => {
  const requestObj = {
    path: `api/member/get_goal_statement_by_member_id/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    // postData: data,
  };
  return invokeApi(requestObj);
};
