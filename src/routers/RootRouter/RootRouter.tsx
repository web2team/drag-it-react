import * as React from "react";
import { Icon, Layout, Menu } from "antd";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
const Router = BrowserRouter;
import { Calendar, Card, Login, Register } from "components";
import styled from "theme";
import SmallCalenderContainer from "components/dragExamples/SmallCalenderContainer";
import { FrontPage } from "components/FrontPage";
import { MessageList } from "components/Chatting";
import { RootHeader } from "./RootHeader";

const { Content, Footer } = Layout;

class RootRouter extends React.Component<any, any> {
  render() {
    const ContentsRouter = () => {
      return (
        <Switch>
          <Route exact={true} path="/" render={(props) => <FrontPage />} />
          <Route exact={true} path="/login" render={(props) => <Login />} />
          <Route
            exact={true}
            path="/drag"
            render={(props) => <SmallCalenderContainer />}
          />
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

    const AuthContents = () => {
      return (
        <Switch>
          <Route
            exact={true}
            path="/chat"
            render={(props) => <MessageList />}
          />
        </Switch>
      );
    };
    const Footers = () => <Footer id="footer">Drag-it 2018</Footer>;

    const { className } = this.props;
    return (
      <Router>
        <Layout className={className}>
          <RootHeader />
          <Content className="contents">
            <ContentsRouter />
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
    padding: 24px;
    min-height: 280px;
    max-height: 100%;
  }

  #footer {
    background: white;
    text-align: center;
  }
`;
