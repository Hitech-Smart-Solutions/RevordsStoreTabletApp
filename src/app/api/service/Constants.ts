// //For AWS Dashboard Live Link(Live)
// export const API_ENDPOINT = 'https://dashboard.revords.com/liveapi/api/';
// export const DownloadAPK_ENDPOINT = 'https://dashboard.revords.com/liveapi/wwwroot/'

// // For AWS Dashboard Test Link(Testing Purpose)
// export const API_ENDPOINT = 'https://dashboard.revords.com/testapi/api/';
// export const DownloadAPK_ENDPOINT = 'https://dashboard.revords.com/testapi/wwwroot/'

//For Ho Link(Developement Purpose)
export const API_ENDPOINT = 'http://ho.hitechprojects.co.in:8101/api/';
export const DownloadAPK_ENDPOINT = 'http://ho.hitechprojects.co.in:8101/wwwroot/'
export const ISODate = () => {
  return (new Date()).toISOString();
}

export const convertISODateToLocal = (dateString) => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate;
}