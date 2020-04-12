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
