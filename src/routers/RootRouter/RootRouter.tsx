import * as React from "react";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
const Router = BrowserRouter;
import styled from "theme";
const { Content, Footer } = Layout;
import { RootHeader, RootContents } from ".";

class RootRouter extends React.Component<any, any> {
  render() {
    const RootFooter = () => <Footer id="footer">Drag-it 2018</Footer>;

    const { className } = this.props;
    return (
      <Router>
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

export { styledRootRouer as RootRouter };
