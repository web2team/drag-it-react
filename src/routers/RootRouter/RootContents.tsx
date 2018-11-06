import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Register } from "components";
import { getKey } from "routers/RootRouter/helper";
import { TabContainer } from "components/TabContainer";

// URL path에 맞는 상태 설정
export const RootContents = ({ userId }) => {
  const NormalContents = [
    <Route
      key={getKey()}
      exact={true}
      path="/"
      render={(props) => <Login />}
    />
  ];

  const AuthContents = [
    <Route
      key={getKey()}
      exact={true}
      path="/tab"
      render={(props) => <TabContainer userId={userId} />}
    />,
    <Route
      key={getKey()}
      exact={true}
      path="/register"
      render={(props) => <Register />}
    />
  ];

  return (
    <Switch>
      {NormalContents}
      {AuthContents}
    </Switch>
  );
};
