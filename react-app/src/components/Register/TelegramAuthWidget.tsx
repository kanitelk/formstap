import React from "react";
import TelegramLoginButton from "react-telegram-login";
import { tgAuth } from "../../services/authAPI";

export type TgAuthData = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

export const TelegramAuthWidget: React.FC = () => {
  const handleTelegramResponse = async (data: TgAuthData) => {
    let res = await tgAuth(data);
    console.log(res);
  };

  return (
    <TelegramLoginButton
      style={{ marginTop: "15px" }}
      dataOnauth={handleTelegramResponse}
      botName="tapmn_auth_bot"
    />
  );
};
