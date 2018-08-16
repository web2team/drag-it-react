import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { FrontPage } from "components/FrontPage";
import { Chatting } from "components/Chatting";
import { Calendar, Login, Register } from "components";

import { getKey } from "routers/RootRouter/helper";
import { GridLayout } from "components/GridLayout";
import { TabContainer } from "components/TabContainer";

export const RootContents = ({ userId }) => {
  const NormalContents = [
    <Route
      key={getKey()}
      exact={true}
      path="/"
      render={(props) => <FrontPage />}
    />,
    <Route
      key={getKey()}
      exact={true}
      path="/login"
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
      path="/calendar"
      render={(props) => <Calendar />}
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
