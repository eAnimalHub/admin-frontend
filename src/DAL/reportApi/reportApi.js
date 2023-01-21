import { invokeApi } from "../../bl_libs/invokeApi";

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
export const reportDetailApi = async (id) => {
  const requestObj = {
    path: `api/ad_report/detail_ad_report/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
