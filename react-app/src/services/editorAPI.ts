import config from "../config";
import HTTP from "./http";
import { AxiosRequestConfig } from "axios";
import { TForm } from "../components/Form/types";

export type Form = {
  _id: string;
  title: string;
  updatedAt: Date;
};

const axiosConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getForm = async (id: string): Promise<TForm> => {
  let res = await HTTP.get(`${config.apiURL}/forms/${id}`, axiosConfig);
  return res.data;
};

export const getForms = async (): Promise<Array<Form>> => {
  let res = await HTTP.get(`${config.apiURL}/forms`, axiosConfig);
  return res.data;
};

export const newForm = async () => {
  let res = await HTTP.post(`${config.apiURL}/forms`, null, axiosConfig);
  return res.data;
};

export const newField = async (
  type: string,
  title: string,
  form_id: string
) => {
  let res = await HTTP.post(
    `${config.apiURL}/forms/field`,
    { type, title, form_id },
    axiosConfig
  );
  return res.data;
};

export const deleteForm = async (form_id: string) => {
  let res = await HTTP.delete(
    `${config.apiURL}/forms/${form_id}`,
    axiosConfig,
  );
  return res.data;
};
