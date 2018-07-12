import * as React from "react";
import { Icon, Layout } from "antd";
import { Route, Switch } from "react-router";
import Todo from "../../components/Todo";
import CardContainer from "components/CardContainer";
import SmallCalenderContainer from "components/SmallCalenderContainer";
import Register from "components/Register";
import Login from "components/Login";
import Scheduler from "components/Scheduler";

const Content = Layout.Content;
const Header = Layout.Header;

export default function rootContents() {
  return (
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
                  render={(props) => <Login/>}
              />
              <Route
                  exact={true}
                  path="/register"
                  render={(props) => <Register/>}
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
      </Layout>);


}