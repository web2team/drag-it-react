import * as React from "react";
import App from "components/App";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { render } from "react-dom";
import { APOLLO_CLIENT_URL } from "constants/urls";
import { Provider } from "mobx-react";
import store from "state";

const client = new ApolloClient({
  uri: APOLLO_CLIENT_URL
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
      <Provider {...store}>
        <App />
      </Provider>
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("app"));
