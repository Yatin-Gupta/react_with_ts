import httpService from "./http.service";

const token = "userToken";

const getAuthToken = () => {
  return localStorage.getItem(token);
};

const setAuthToken = (value: string) => {
  if (localStorage.getItem(token)) {
    return false;
  }
  localStorage.setItem(token, value);
  return true;
};

//httpService.setAuthToken(token, getAuthToken());

export const auth = {
  getAuthToken,
  setAuthToken
};

export const http = { ...httpService };
