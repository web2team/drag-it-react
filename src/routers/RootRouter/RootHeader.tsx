import * as React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const Header = Layout.Header;
function* idMaker() {
  var index = 0;
  while (true) {
    yield index++;
  }
}
const gen = idMaker();
const getKey = () => gen.next().value;

export const RootHeader = () => (
  <Header id="header">
    <div id="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["0"]}
      style={{ lineHeight: "64px" }}
    >
      {NormalMenuItems}
      {AuthMenuItems}
    </Menu>
  </Header>
);

const NormalMenuItems = [
  <Menu.Item key={getKey()}>
    <Link to="home">
      <span>Home</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="login">
      <span>Sign in</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="register">
      <span>Sign up</span>
    </Link>
  </Menu.Item>
];

const AuthMenuItems = [
  <Menu.Item key={getKey()}>
    <Link to="">
      <span>Dashboard</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="calendar">
      <span>Calendar</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="drag">
      <span>Personal Board</span>
    </Link>
  </Menu.Item>
];
