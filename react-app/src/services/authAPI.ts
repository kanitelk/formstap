import config from "../config";
import HTTP from "./http";

export const register = async (
  user: string,
  password: string,
  email?: string
) => {
  let res = await HTTP.post(`${config.apiURL}/users`, {
    login: user,
    password,
    email,
  });
  return res.data;
};

export const login = async (
  login: string,
  password: string,
) => {
  let res = await HTTP.post(`${config.apiURL}/users/login`, {
    login,
    password
  });
  return res.data;
};
