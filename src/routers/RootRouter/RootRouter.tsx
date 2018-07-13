import * as React from "react";
import { Icon, Layout, Menu } from "antd";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
const Router = BrowserRouter;
import { Calendar, Card, Login, Register } from "components";
import styled from "theme";

const { Header, Content, Footer } = Layout;

class RootRouter extends React.Component<any, any> {
  render() {
    const Headers = () => (
      <Header id="header">
        <div id="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="0">
            <Link to="">
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="login">
              <span>Sign in</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="register">
              <span>Sign up</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="calendar">
              <span>Calendar</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    );

    const ContentsRouter = () => {
      return (
        <Switch>
          <Route exact={true} path="/" render={(props) => <Card />} />
          <Route exact={true} path="/login" render={(props) => <Login />} />
          <Route
            exact={true}
            path="/calendar"
            render={(props) => <Calendar />}
          />
          <Route
            exact={true}
            path="/register"
            render={(props) => <Register />}
          />
        </Switch>
      );
    };
    const Footers = () => <Footer id="footer">Drag-it 2018</Footer>;

    const { className } = this.props;
    return (
      <Router>
        <Layout className={className}>
          <Headers />
          <Content className="contents">
            <div className="contents-container">
              <ContentsRouter />
            </div>
          </Content>
          <Footers />
        </Layout>
      </Router>
    );
  }
}

export default styled(RootRouter)`
  background: white;

  #header #logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }

  .contents {
    padding: 0 50px;
  }

  .contents-container {
    padding: 24px;
    min-height: 280px;
    max-height: 100%;
  }

  #footer {
    background: white;
    text-align: center;
  }
`;
