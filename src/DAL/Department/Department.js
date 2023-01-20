import { invokeApi } from "../../bl_libs/invokeApi";

export const addDepartment = async (data) => {
  const requestObj = {
    path: `api/department/add_department.php`,
    method: "POST",
    headers: {},
    postData: data,
  };
  return invokeApi(requestObj);
};

export const departmentList = async (data) => {
  const requestObj = {
    path: `api/department/department_list.php`,
    method: "POST",
    headers: {},
    postData: data,
  };
  return invokeApi(requestObj);
};

export const departmentDetail = async (data) => {
  const requestObj = {
    path: `api/department/detail_department.php`,
    method: "POST",
    headers: {},
    postData: data,
  };
  return invokeApi(requestObj);
};

export const editDepartment = async (data) => {
  const requestObj = {
    path: `api/department/edit_department.php`,
    method: "POST",
    headers: {},
    postData: data,
  };
  return invokeApi(requestObj);
};

export const departmentDelete = async (data) => {
  const requestObj = {
    path: `api/department/delete_department.php`,
    method: "POST",
    headers: {},
    postData: data,
  };
  return invokeApi(requestObj);
};
