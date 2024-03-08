export const API_ENDPOINT = 'https://dashboard.revords.com/testapi/api/';
export const DownloadAPK_ENDPOINT = 'https://dashboard.revords.com/testapi/wwwroot/'

export const ISODate = () => {
  return (new Date()).toISOString();
}

export const convertISODateToLocal = (dateString) => {
  const date = new Date(dateString);
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate;
}