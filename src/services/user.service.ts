import { auth, http } from "./auth.service";

// import model
import { UserType } from "../models/user.type";

const Config = require("../config.json");

const userIfExists = () => {
  if (auth.getAuthToken()) return true;
  return false;
};

const getCurrentUser = async () => {
  //if (!userIfExists()) {
  //  return {};
  //}
  let id = localStorage.getItem("id");
  let response = await http.get(Config.userApiEndpoint + "/" + id);
  if (response.data) {
    return response.data;
  }
  return {};
};

const getAllUsers = async () => {
  //if (!userIfExists()) {
  //return [];
  //}
  let response = await http.get(Config.userApiEndpoint);
  if (response.data) {
    return response.data;
  }
  return [];
};

const addNewUser = async (user: UserType) => {
  //if (!userIfExists()) {
  // return {};
  //}
  let response = await http.post(Config.userApiEndpoint, user);
  if (response.data) {
    return response.data;
  }
  return {};
};

const updateUser = async (id: number, user: UserType) => {
  //if (!userIfExists()) {
  // return {};
  //}
  let response = await http.put(Config.userApiEndpoint + "/" + id, user);
  if (response.data) {
    return response.data;
  }
  return {};
};

const getUserById = async (id: number) => {
  let response = await http.get(Config.userApiEndpoint + "/" + id);
  if (response.data) {
    return response.data;
  }
  return {};
};

const deleteItem = async (id: number) => {
  await http.delete(Config.userApiEndpoint + "/" + id);
};
export default {
  userIfExists,
  getCurrentUser,
  getAllUsers,
  addNewUser,
  getUserById,
  updateUser,
  deleteItem
};
