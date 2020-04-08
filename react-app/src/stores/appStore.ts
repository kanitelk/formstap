import { action, computed, observable } from "mobx";
import { createContext } from "react";
import config from "../config";
import jwt from "jsonwebtoken";

class AppStore {
  @observable isAuth: boolean = false;
  @observable token: string | null = null;
  @observable login: string | null = null;

  constructor() {
    if (localStorage.getItem("token"))
      this.setAuth(localStorage.getItem("token")!);
  }

  @action setAuth(token: string) {
    try {
      const data = jwt.decode(token);
      localStorage.setItem("token", token);
      this.isAuth = true;
      this.token = token;
      // @ts-ignore
      this.login = data?.login;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @action logout() {
    localStorage.removeItem("token");
    this.isAuth = false;
    this.login = null;
    this.token = null;
  }
}

export const AppStoreContext = createContext(new AppStore());
