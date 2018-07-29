import axios from "axios";
import { API_ENDPOINT } from "constants/urls";

export const requestCheckToken = (token: string) =>
  axios
    .get(`${API_ENDPOINT}/api/checkToken`, {
      headers: {
        token: "Bearer " + token
      }
    })
    .then(() => true)
    .catch(() => false);
