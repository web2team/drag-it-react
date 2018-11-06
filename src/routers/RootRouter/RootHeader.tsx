import * as React from "react";
import { Layout, Menu, Avatar } from "antd";
const Header = Layout.Header;
import { inject, observer } from "mobx-react";

@inject("authState")
@inject("browserHistoryState")
@observer
export class RootHeader extends React.Component<any, any> {
  // 사용자가 메뉴 클릭했을 때 호출되는 콜백
  // 전역 상태를 수정 -> Login, Logout, Redirect 처리
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
      <Header id="root-header">
        <div id="logo">
          <span>Drag-It</span>
        </div>
        <Avatar
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            color: "white",
            backgroundColor: "#722ed1"
          }}
          size={50}
          icon="user"
        />
        <Menu
          theme="light"
          mode="horizontal"
          style={{
            background: "transparent",
            border: 0
          }}
          defaultSelectedKeys={["0"]}
          // 엘레멘트 선택 시 콜백함수 정의
          onSelect={(itemProps) => this.onSelect(itemProps)}
        >
          {/* 로그인 시에만 로그아웃 메뉴 show */}
          {this.props.authState.getIsLogin ? (
            <Menu.Item key="logout">
              <span className="menu-item">로그아웃</span>
            </Menu.Item>
          ) : null}
        </Menu>
      </Header>
    );
  }
}
