import * as React from "react";
import App from "components/App";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-boost";
import { split, ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { render } from "react-dom";
import { WebSocketLink } from "apollo-link-ws";
import { APOLLO_CLIENT_URL, APOLLO_SUBSCRIPTION_URL } from "constants/urls";
import { Provider } from "mobx-react";
import store from "state";
import { getMainDefinition } from "apollo-utilities";

const httpLink = createHttpLink({
  uri: APOLLO_CLIENT_URL
});
const wsLink = new WebSocketLink({
  uri: APOLLO_SUBSCRIPTION_URL,
  options: {
    reconnect: true
  }
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Provider {...store}>
      <App />
    </Provider>
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("app"));
