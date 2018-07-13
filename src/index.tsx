import * as React from "react";
import App from "components/App";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { render } from "react-dom";
import { APOLLO_CLIENT_URL } from "constants/urls";

const client = new ApolloClient({
  uri: APOLLO_CLIENT_URL
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("app"));
