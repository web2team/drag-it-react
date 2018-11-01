// 모듈 import 
import * as React from "react";
import { Layout, Icon } from "antd";
import { Router } from "react-router-dom";
import "antd/dist/antd.less";
import "theme/ant.less";
const { Content, Footer } = Layout;
import { styled } from "theme";
import { RootHeader, RootContents } from "routers/RootRouter";
import { inject, observer } from "mobx-react";

// 전역 CSS (Less compile -> css)
import "./RootRouter.less";

// RootRouter Property 인터페이스 선언
interface Props {
  className?: string;
  browserHistoryState?: any;
  authState?: any;
}

// Mobx 스토어 클래스에 주입 (Subscribe) 
@inject("authState")
@inject("browserHistoryState")
@observer
class RootRouter extends React.Component<Props, any> {
  render() {
    const RootFooter = () => <Footer id="root-footer">Drag-it 2018</Footer>;
    const userId = this.props.authState.getUserId;

    return (
      <Router history={this.props.browserHistoryState.getHistory}>
        {/* 전체 레이아웃, 헤더, 컨텐츠, 푸터로 이루어져있음 */}
        <Layout className={this.props.className}>
          {/* Mobx로 주입된 전역 상태에 따라 변경되는 헤더 부분. 로그인 되었을 때만 헤더가 나타남 */}
          {this.props.authState.getIsLogin ? <RootHeader /> : null}
          {/* 동적으로 상태와 화면이 변경되는 컨텐츠 부분 */}
          <Content className="root-contents">
            <RootContents userId={userId} />
          </Content>
          <RootFooter />
        </Layout>
      </Router>
    );
  }
}

// 이하 styled-component inline css 선언 
const styledRootRouer = styled(RootRouter)`
  background: white;

  #root-header {
    display: flex;    
  }
  .ant-menu {
    display: flex;
  }
  .ant-menu-item {
    margin: auto;
  }
  .ant-layout-header {
    width: 100%;
  }

  .root-contents {
    padding: 2vh 50px 0px 50px;
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
