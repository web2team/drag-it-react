import * as store from "store";
import { authState } from "./authState";

export const setToken = (token: string) => {
  store.set("token", token);
  authState.setToken(token);
};

export const getToken = () => {
  return store.get("token") || authState.getToken;
};
