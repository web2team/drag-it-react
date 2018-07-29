import * as React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const Header = Layout.Header;
import { getKey } from "./helper";
import { inject, observer } from "mobx-react";

@inject("authState")
@inject("browserHistoryState")
@observer
export class RootHeader extends React.PureComponent<any, any> {
  onSelect = ({ key }) => {
    if (key === "logout") {
      this.props.authState.onLogout();
      this.props.browserHistoryState.push("");
    } else {
      this.props.authState.checkToken();
    }
  };

  render() {
    return (
      <Header id="header">
        <div id="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          onSelect={(itemProps) => this.onSelect(itemProps)}
        >
          {this.props.authState.getIsLogin ? AuthMenuItems : NormalMenuItems}
        </Menu>
      </Header>
    );
  }
}

const NormalMenuItems = [
  <Menu.Item key={getKey()}>
    <Link to="">
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
    <Link to="home">
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
  </Menu.Item>,
  <Menu.Item key="logout">
    <span>logout</span>
  </Menu.Item>
];
