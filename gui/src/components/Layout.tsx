import * as React from "react";
import { Layout, Menu, Icon, Card, Calendar } from "antd";
const { Header, Sider, Content } = Layout;
import WrappedRegistrationForm from "./MyForm";
import "./Layout.less";
import CardContainer from "./CardContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import FullCalender from "./FullCalender";
import SmallCalenderContainer from "./SmallCalenderContainer";

export default class SiderDemo extends React.Component<any, any> {
  state = {
    collapsed: false,
    hideSourceOnDrag: true
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleHideSourceClick = () => {
    this.setState({
      hideSourceOnDrag: !this.state.hideSourceOnDrag
    });
  };
  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="user" />
                  <span>home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="1-1">
                <Link to="login">
                  <Icon type="video-camera" />
                  <span>login</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="register">
                  <Icon type="video-camera" />
                  <span>register</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="board">
                  <Icon type="upload" />
                  <span>board</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="calender">
                  <Icon type="upload" />
                  <span>calender</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4-1">
                <Link to="full_calender">
                  <Icon type="upload" />
                  <span>FULL calender</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="board">
                  <Icon type="upload" />
                  <span>board</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <div style={{}}>
                <Switch>
                  <Route
                    exact={true}
                    path="/"
                    render={props => <CardContainer />}
                  />
                  <Route
                    exact={true}
                    path="/login"
                    render={props => <LoginForm />}
                  />
                  <Route
                    exact={true}
                    path="/register"
                    render={props => <RegisterForm />}
                  />
                  <Route
                    exact={true}
                    path="/calender"
                    render={props => (
                      <SmallCalenderContainer
                        hideSourceOnDrag={this.state.hideSourceOnDrag}
                      />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/full_calender"
                    render={props => FullCalender}
                  />

                  {/* <WrappedRegistrationForm /> */}
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
