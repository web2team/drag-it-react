import * as React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const Header = Layout.Header;
import { getKey } from "routers/RootRouter/helper";
import { inject, observer } from "mobx-react";

@inject("authState")
@inject("browserHistoryState")
@observer
export class RootHeader extends React.Component<any, any> {
  onSelect = ({ key }) => {
    if (key === "logout") {
      this.props.authState.onLogout();
      this.props.browserHistoryState.push("");
    } else {
      if (!this.props.authState.getIsLogin) {
        return;
      }
      this.props.authState.checkToken().then((isValid: boolean) => {
        if (isValid) {
          return;
        }
        this.props.authState.onLogout();
        this.props.browserHistoryState.push("");
      });
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
    <Link to="dashboard">
      <span>Dashboard</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="calendar">
      <span>Calendar</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="tab">
      <span>Tab</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="chat">
      <span>Chatting</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key={getKey()}>
    <Link to="test">
      <span>test</span>
    </Link>
  </Menu.Item>,
  <Menu.Item key="logout">
    <span>logout</span>
  </Menu.Item>
];
