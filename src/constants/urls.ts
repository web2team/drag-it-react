export const BASE_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env.SERVER_URL_DEV
    : process.env.SERVER_URL_PROD;

export const API_ENDPOINT = `http://${BASE_ENDPOINT}`;
export const APOLLO_CLIENT_URL = `http://${BASE_ENDPOINT}/graphql`;
export const APOLLO_SUBSCRIPTION_URL = `ws://${BASE_ENDPOINT}/subscriptions`;
