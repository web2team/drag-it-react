import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-boost";
import { split, ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { APOLLO_CLIENT_URL, APOLLO_SUBSCRIPTION_URL } from "constants/urls";
import { getMainDefinition } from "apollo-utilities";
import { execute, makePromise } from "apollo-link";

const httpLink = createHttpLink({
  uri: APOLLO_CLIENT_URL
});
const wsLink = new WebSocketLink({
  uri: APOLLO_SUBSCRIPTION_URL,
  options: {
    reconnect: true
  }
});

export const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();
export const client = new ApolloClient({ link, cache });

interface Operation {
  query: any;
  varialbes?: any;
  operationName?: any;
  context?: any;
  extensions?: any;
}
export const executePromise = (operation: Operation) =>
  makePromise(execute(link, operation));

interface OnExecuteSubscribe {
  next: (value: any) => void;
  error: (error: any) => void;
  complete: () => void;
}
export const executePromiseSubscribe = (
  operation: Operation,
  { next, error, complete }: OnExecuteSubscribe
) =>
  execute(link, operation).subscribe({
    next,
    error,
    complete
  });
