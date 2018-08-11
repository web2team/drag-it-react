import * as React from "react";
import App from "components/App";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import store from "state";
import { client } from "helper/apolloConfig";

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Provider {...store}>
      <App />
    </Provider>
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("app"));
