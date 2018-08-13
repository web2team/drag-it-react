import { observable, computed, action, autorun } from "mobx";
import { requestCheckToken } from "request/auth";
import * as store from "store";

class AuthState {
  @observable
  token: string = "";

  @observable
  isLogin: boolean = false;

  @observable
  userId: number;

  constructor() {
    this.checkToken();
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

    return requestCheckToken(token).then((isLogin) => {
      this.setIsLogin(isLogin);
      return true;
    });
  }

  @action
  setUserId(userId: number): void {
    store.set("userId", userId);
    this.userId = userId;
  }
  @computed
  get getUserId(): void {
    return this.userId || store.get("userId");
  }

  @action
  onLogout(): void {
    this.setToken("");
    this.setIsLogin(false);
    store.set("token", "");
  }
}

export const authState = new AuthState();
