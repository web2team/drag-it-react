import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { FrontPage } from "components/FrontPage";
import { Chatting } from "components/Chatting";
import { Calendar, Login, Register } from "components";

import { getKey } from "routers/RootRouter/helper";
import { Dashboard } from "components/Dashboard";

export const RootContents = () => (
  <Switch>
    {NormalContents}
    {AuthContents}
  </Switch>
);

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
    path="/dashboard"
    render={(props) => <Dashboard gridId={1} />}
  />,
  <Route
    key={getKey()}
    exact={true}
    path="/chat"
    render={(props) => (
      <Chatting
        gridProps={{
          x: 1,
          y: 1, 
          w: 1,
          h: 1
        }}
      />
    )}
  />,
  <Route
    key={getKey()}
    exact={true}
    path="/drag"
    render={(props) => <div />}
    // render={(props) => <SmallCalenderContainer />}
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
