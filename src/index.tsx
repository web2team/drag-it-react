import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import store from "state";
import { client } from "helper/apolloConfig";
import { RootRouter } from "routers/RootRouter";
import "./index.less";
 
function renderApp() {
  const apolloApp = (
    <ApolloProvider client={client}>
      <Provider {...store}>
        <RootRouter />
      </Provider>
    </ApolloProvider>
  );
  render(apolloApp, document.getElementById("app"));
}

if (module.hot) {
  module.hot.accept();
  renderApp();
} else {
  renderApp();
}
