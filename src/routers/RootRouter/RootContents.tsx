import * as React from "react";
import { Route, Switch } from "react-router-dom";

import SmallCalenderContainer from "components/dragExamples/SmallCalenderContainer";
import { FrontPage } from "components/FrontPage";
import { MessageList } from "components/Chatting";
import { Calendar, Card, Login, Register } from "components";

import { getKey } from "./helper";

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
    path="/chat"
    render={(props) => <MessageList />}
  />,
  <Route
    key={getKey()}
    exact={true}
    path="/drag"
    render={(props) => <SmallCalenderContainer />}
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
