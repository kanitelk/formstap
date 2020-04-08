import config from "../config";
import HTTP from "./http";
import { AxiosRequestConfig } from "axios";

export type Form =  {
  _id: string,
  title: string,
  updatedAt: Date
};

const axiosConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

export const getForms = async (): Promise<Array<Form>> => {
  let res = await HTTP.get(`${config.apiURL}/forms`, axiosConfig);
  return res.data;
}

export const newForm = async () => {
  let res = await HTTP.post(`${config.apiURL}/forms`, null, axiosConfig);
  return res.data;
};

