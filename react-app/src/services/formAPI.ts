import { AxiosRequestConfig } from "axios";

import { Answer, RewardResponce, TForm } from "../components/Form/types";
import config from "../config";
import HTTP from "./http";

import fp2 from 'fingerprintjs2';

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

export const sendAnswers = async (
  form_id: string,
  answers: Answer[],
  user_data: any
): Promise<RewardResponce> => {
  let res = await HTTP.post(
    `${config.apiURL}/forms/answer`,
    { form_id, answers, user_data },
    axiosConfig
  );
  return res.data;
};

export const getIPdata = async () => {
  try {
    let res = await HTTP.get(
      `https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,as,mobile,proxy,query`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
