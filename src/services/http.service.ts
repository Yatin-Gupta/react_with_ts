import axios from "axios";

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      console.log("Logging the Expected Error: ", expectedError);
    }
    return Promise.reject(error);
  }
);

//axios.defaults.headers.common["Access-Token"] =
//  "BpLnfgDsc2WD8F2qNfHK5a84jjJkwzDkh9h2fhfUVuS9jZ8uVb";
//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
//const setAuthToken = (tokenKey, tokenValue) => {
//  axios.defaults.headers.common[tokenKey] = tokenValue;
//};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
  //setAuthToken: setAuthToken
};
