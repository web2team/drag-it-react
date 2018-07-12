import * as React from "react";
import { Icon, Layout, Menu } from "antd";
import "./Layout.less";
import CardContainer from "./CardContainer";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Scheduler from "./Scheduler";
import SmallCalenderContainer from "./SmallCalenderContainer";
import Todo from "./Todo";

const {Header, Sider, Content} = Layout;

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
    const sider = (
        <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="bank"/>
                <span>홈 화면</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="1-1">
              <Link to="login">
                <Icon type="user"/>
                <span>로그인</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="register">
                <Icon type="user-add"/>
                <span>회원가입</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="board">
                <Icon type="file"/>
                <span>팀 보드</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="calender">
                <Icon type="calendar"/>
                <span>개인 보드</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4-1">
              <Link to="scheduler">
                <Icon type="schedule"/>
                <span>스케줄러</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="setting">
                <Icon type="setting"/>
                <span>환경설정</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
    );

    const contents = (
        <Layout>
          <Header style={{background: "#fff", padding: 0}}>
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
                    render={(props) => <CardContainer/>}
                />
                <Route
                    exact={true}
                    path="/login"
                    render={(props) => <LoginForm/>}
                />
                <Route
                    exact={true}
                    path="/register"
                    render={(props) => <RegisterForm/>}
                />
                <Route exact={true} path="/board" render={(props) => <Todo/>}/>
                <Route
                    exact={true}
                    path="/calender"
                    render={(props) => (
                        <SmallCalenderContainer
                            hideSourceOnDrag={this.state.hideSourceOnDrag}
                        />
                    )}
                />
                <Route
                    exact={true}
                    path="/Scheduler"
                    render={(props) => Scheduler}
                />

                {/* <WrappedRegistrationForm /> */}
              </Switch>
            </div>
          </Content>
        </Layout>
    );
    return (
        <Router>
          <Layout>
            {sider}
            {contents}
          </Layout>
        </Router>
    );
  }
}
