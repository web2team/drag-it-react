import * as React from "react";
import { Layout, Icon } from "antd";
import { Router } from "react-router-dom";
import "antd/dist/antd.less";
import "theme/ant.less";
const { Content, Footer } = Layout;
import { styled } from "theme";
import { RootHeader, RootContents } from "routers/RootRouter";
import { inject, observer } from "mobx-react";

interface Props {
  className?: string;
  browserHistoryState?: any;
  authState?: any;
}
@inject("authState")
@inject("browserHistoryState")
@observer
class RootRouter extends React.Component<Props, any> {
  render() {
    const RootFooter = () => <Footer id="root-footer">Drag-it 2018</Footer>;
    const userId = this.props.authState.getUserId;

    return (
      <Router history={this.props.browserHistoryState.getHistory}>
        <Layout className={this.props.className}>
          {this.props.authState.getIsLogin ? <RootHeader /> : null}
          <Content className="root-contents">
            <RootContents userId={userId} />
          </Content>
          <RootFooter />
        </Layout>
      </Router>
    );
  }
}

const styledRootRouer = styled(RootRouter)`
  background: white;

  #root-header {
    display: flex;
    height: 5vh;
    position: absolute;
    right: 0;
    #logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: auto 20px auto 5px;
      float: left;
      color: white;
      font-family: "BMDoHyeon-OTF";

      & > span {
        margin: auto;
        line-height: 33px;
        font-size: 25px;
        position: relative;
        left: 3.5px;
        letter-spacing: 3px;
      }
    }
  }
  .ant-menu {
    display: flex;
  }
  .ant-layout-header {
    width: 100%;
  }

  .root-contents {
    padding: 10vh 50px 0px 50px;
    min-height: 90vh;
  }

  #root-footer {
    background: white;
    text-align: center;

    position: sticky;
    bottom: -5vh;
    padding: 1vh 50px 1vh 50px;
    margin: 1vh 0px 1vh 0px;

    border-top: 1px solid #e8e8e8;
  }
`;

export { styledRootRouer as RootRouter };
