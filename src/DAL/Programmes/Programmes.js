import { invokeApi } from "../../bl_libs/invokeApi";

export const programmesListing = async (data) => {
  const requestObj = {
    path: `api/program`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const lessonRecordinglist = async (slug) => {
  const requestObj = {
    path: `api/lesson_recording/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const AddProgram = async (data) => {
  const requestObj = {
    path: `api/program/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const AddProgramReviews = async (data) => {
  const requestObj = {
    path: `api/program_review/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const AddLessons = async (data) => {
  const requestObj = {
    path: `api/lesson/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const AddProgramDocument = async (data) => {
  const requestObj = {
    path: `api/program_document/`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const AddLessonRecording = async (data) => {
  const requestObj = {
    path: `api/lesson_recording`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const EditPrograms = async (id, data) => {
  const requestObj = {
    path: `api/program/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const EditLessons = async (id, data) => {
  const requestObj = {
    path: `api/lesson/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const EditProgramsReview = async (id, data) => {
  const requestObj = {
    path: `api/program_review/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const UpdateProgramDocument = async (id, data) => {
  const requestObj = {
    path: `api/program_document/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const getProgramDetail = async (slug) => {
  const requestObj = {
    path: `api/program/get_program/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const getProgramReviewDetail = async (slug) => {
  const requestObj = {
    path: `api/program_review/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const ProgramReviewDelete = async (slug) => {
  const requestObj = {
    path: `api/program_review/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const ProgramDelete = async (slug) => {
  const requestObj = {
    path: `api/program/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const ProgramDocumentDelete = async (slug) => {
  const requestObj = {
    path: `api/program_document/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const lessonDelete = async (slug) => {
  const requestObj = {
    path: `api/lesson/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const programmDetail = async (id) => {
  const requestObj = {
    path: `api/program/get_program/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const programmReview = async (slug) => {
  const requestObj = {
    path: `api/program_review/review_list_by_program/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const DocumentDetail = async (slug) => {
  const requestObj = {
    path: `api/program_document/document_list_by_program/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const ProgramDocumentDetail = async (slug) => {
  const requestObj = {
    path: `api/program_document/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const lessonList = async (id) => {
  const requestObj = {
    path: `api/lesson/lesson_list_by_program/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const lessonDetail = async (id) => {
  const requestObj = {
    path: `api/lesson/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
