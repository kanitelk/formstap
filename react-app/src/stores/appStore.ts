import { action, computed, observable } from "mobx";
import { createContext } from "react";
import config from "../config";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

class AppStore {
  @observable isAuth: boolean = false;
  @observable token: string | null = null;
  @observable login: string | null = null;

  constructor() {
    const token = localStorage.getItem("token");
    if (token) {
      let data = jwt_decode(token);
      //@ts-ignore
      if (new Date() > new Date(data.exp * 1000)) {
        this.logout();
      } else {
        this.setAuth(localStorage.getItem("token")!);
      }
    }
  }

  @action async setAuth(token: string) {
    try {
      const data = jwt.decode(token);
      await localStorage.setItem("token", token);
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
