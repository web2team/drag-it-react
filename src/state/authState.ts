import { observable, computed, action, autorun } from "mobx";
import { checkToken } from "request/auth";
import * as store from "store";

class AuthState {
  @observable token: string = "";
  @observable isLogin: boolean = false;

  constructor() {
    const token = this.getToken;
    this.validateToken(token).then((val) => this.setIsLogin(val));
  }

  @computed
  get getToken() {
    return this.token || store.get("token");
  }
  @action
  setToken(token: string): void {
    store.set("token", token);
    this.token = token;
  }

  @computed
  get getIsLogin() {
    return this.isLogin;
  }
  @action
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }
  @action
  checkToken() {
    const token = this.getToken;
    this.validateToken(token).then((isLogin) => this.setIsLogin(isLogin));
  }

  validateToken(token: string): Promise<boolean> {
    return checkToken(token)
      .then(() => true)
      .catch(() => false);
  }

  @action
  onLogout(): void {
    this.setToken("");
    this.setIsLogin(false);
    store.set("token", "");
  }
}

export const authState = new AuthState();
