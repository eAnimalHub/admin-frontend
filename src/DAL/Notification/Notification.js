import { invokeApi } from '../../bl_libs/invokeApi';

export const teamNotification = async (data) => {
  const requestObj = {
    path: `api/notify/notify_listing_for_team.php`,
    method: 'POST',
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data
  };
  return invokeApi(requestObj);
};

export const teamNotificationStatusChange = async (data) => {
  const requestObj = {
    path: `api/notify/change_notify_status.php`,
    method: 'POST',
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data
  };
  return invokeApi(requestObj);
};

export const teamNotificationAllRead = async (data) => {
  const requestObj = {
    path: `api/notify/mark_all_as_read.php`,
    method: 'POST',
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data
  };
  return invokeApi(requestObj);
};
