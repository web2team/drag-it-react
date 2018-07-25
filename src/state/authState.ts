import { observable, computed, action, autorun } from "mobx";

class AuthState {
  @observable token: string = "";
  @computed
  get getToken() {
    return this.token;
  }
  @action
  setToken(token: string) {
    this.token = token;
  }
}

const authState = new AuthState();

export default authState;
