import { action, computed, observable } from "mobx";
import { createContext } from "react";
import config from "../config";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

class AppStore {
  @observable isAuth: boolean = false;
  @observable token: string | null = null;
  @observable login: string | null = null;
  @observable telegram: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
  } | null = null;

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
    if (localStorage.getItem("telegram")) {
      this.telegram = JSON.parse(localStorage.getItem("telegram")!);
    }
  }

  @action async setAuth(token: string) {
    try {
      localStorage.setItem("token", token);
      const data = jwt.decode(token);
      this.isAuth = true;
      this.token = token;
      // @ts-ignore
      this.login = data?.login;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @action async setTgAuth(data: any) {
    this.setAuth(data.token);
    localStorage.setItem("telegram", JSON.stringify(data.data));
    this.telegram = data.data;
  }

  @action logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("telegram");
    this.isAuth = false;
    this.login = null;
    this.token = null;
  }
}

export const AppStoreContext = createContext(new AppStore());
