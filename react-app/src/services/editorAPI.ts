import config from "../config";
import HTTP from "./http";
import { AxiosRequestConfig } from "axios";
import {
  TForm,
  TFormEditor,
  TField,
  Answer,
  Responce,
} from "../components/Form/types";

export type Form = {
  _id: string;
  title: string;
  updatedAt: Date;
};

const axiosConfig: AxiosRequestConfig = {
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${localStorage.getItem("token")}`;
      },
    },
  },
};

export const getFormForEditor = async (id: string): Promise<TFormEditor> => {
  let res = await HTTP.get(`${config.apiURL}/forms/editor/${id}`, axiosConfig);
  return res.data;
};

export const getForms = async (token: string): Promise<Array<TFormEditor>> => {
  let res = await HTTP.get(`${config.apiURL}/forms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAnswers = async (id: string): Promise<Array<Responce>> => {
  let res = await HTTP.get(`${config.apiURL}/forms/answers/${id}`, axiosConfig);
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
  let res = await HTTP.delete(`${config.apiURL}/forms/${form_id}`, axiosConfig);
  return res.data;
};

export const updateFormSettings = async (
  form_id: string,
  title: string,
  is_active: boolean,
  notifications: string,
  check_fingerprint: boolean,
  check_ip: boolean,
  check_telegram: boolean
) => {
  let data = {
    form_id,
    is_active,
    notifications,
    title,
    check_fingerprint,
    check_ip,
    check_telegram
  };
  let res = await HTTP.post(
    `${config.apiURL}/forms/settings`,
    {data},
    axiosConfig
  );
  return res.data;
};

export const updateRewardSettings = async (
  form_id: string,
  coin: string,
  amount: number,
  is_active: boolean,
  is_auto: boolean
) => {
  let res = await HTTP.post(
    `${config.apiURL}/forms/reward`,
    { is_active, is_auto, coin, amount, form_id },
    axiosConfig
  );
  return res.data;
};

export const updateField = async (field_id: string, field: TField) => {
  let res = await HTTP.put(
    `${config.apiURL}/forms/field`,
    { field_id, field },
    axiosConfig
  );
  return res.data;
};

export const deleteField = async (field_id: string) => {
  let res = await HTTP.delete(
    `${config.apiURL}/forms/field/${field_id}`,
    axiosConfig
  );
  return res.data;
};
