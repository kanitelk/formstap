import { action, computed, observable } from "mobx";
import { createContext } from "react";
import config from "../config";

class AppStore {
  @observable isAuth: boolean = false;
  @observable token: string | null = null;
  @observable login: string | null = null;

  constructor() {

  }

  @action setAuth() {
    
  }
}

export const AppStoreContext = createContext(new AppStore());