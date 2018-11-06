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
    // GraphQL 연결 설정
    <ApolloProvider client={client}>
      {/* Mobx 전역 상태 컨테이너 설정 */}
      <Provider {...store}>
        {/* 실제 자바스크립트 앱의 시작 부분 */}
        <RootRouter />
      </Provider>
    </ApolloProvider>
  );
  // HTML 에 React 앱 그리기. css selector -> #app 
  render(apolloApp, document.getElementById("app"));
}

// 개발 설정에서 Hot Changing을 위한 설정
if (module.hot) {
  module.hot.accept();
  renderApp();
} else {
  renderApp();
}
