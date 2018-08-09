import * as React from "react";
import { Layout } from "antd";
import { Router } from "react-router-dom";
import { styled } from "theme";
const { Content, Footer } = Layout;
import { RootHeader, RootContents } from "routers/RootRouter";
import { inject } from "mobx-react";

@inject("browserHistoryState")
class RootRouter extends React.Component<any, any> {
  render() {
    const RootFooter = () => <Footer id="footer">Drag-it 2018</Footer>;

    const { className } = this.props;
    return (
      <Router history={this.props.browserHistoryState.getHistory}>
        <Layout className={className}>
          <RootHeader />
          <Content className="contents">
            <RootContents />
          </Content>
          <RootFooter />
        </Layout>
      </Router>
    );
  }
}

const styledRootRouer = styled(RootRouter)`
  background: white;
  #header {
    display: flex;
    height: 5vh;
  }
  .ant-menu {
    display: flex;
  }
  .ant-menu-dark.ant-menu-horizontal > .ant-menu-item {
    margin: auto;
    padding: auto;
  }

  #header #logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: auto 20 auto 5;
    float: left;
  }

  .contents {
    padding: 5vh 50px 0 50px;
    min-height: 90vh;
  }

  #footer {
    background: white;
    text-align: center;

    position: sticky;
    bottom: -10px;
    margin: 1vh 50px 1vh 50px;
    padding: 0;
  }
`;

export { styledRootRouer as RootRouter };
