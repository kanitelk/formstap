import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import TelegramLoginButton from "react-telegram-login";
import { tgAuth } from "../../services/authAPI";
import { httpErrorHandler } from "../../services/utils";
import { AppStoreContext } from "../../stores/appStore";
import history from "../../stores/history";

export type TgAuthData = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

export const TelegramAuthWidget: React.FC = observer(() => {
  const appStore = useContext(AppStoreContext);
  const handleTelegramResponse = async (data: TgAuthData) => {
    try {
      let res = await tgAuth(data);
      appStore.setTgAuth(res);
      history.push("/");
    } catch (error) {
      httpErrorHandler(error);
    }
  };

  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="tapmn_auth_bot"
    />
  );
});
