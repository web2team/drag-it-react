import * as React from "react";
import { styled } from "theme";
import { Menu, MainButton, ChildButton } from "react-mfb";
import "react-mfb/mfb.css";
import { Styled } from "interface/global";
import { Popover, Badge, Icon } from "antd";
import { NotificationList } from "./NotificationList";
import { NotificationCenterProps } from "interface/Notification";

class NotificationCenter extends React.Component<NotificationCenterProps, any> {
  state = {
    visible: false,
    notificationCount: 0
  };

  componentDidMount() {
    this.fetchNotificationCount();
  }

  onClick = () => {
    this.setState({ visible: !this.state.visible });
  };

  fetchNotificationCount = () => {
    return;
  };

  render() {
    return (
      <div className={this.props.className}>
        {!this.state.visible ? (
          <Badge count={this.state.notificationCount} className="badge" />
        ) : null}

        <Popover
          visible={this.state.visible}
          title={"title"}
          placement="topRight"
          content={
            this.state.visible ? (
              <div>
                <NotificationList
                  {...this.props}
                  visible={this.state.visible}
                  onDismiss={this.onClick}
                />
              </div>
            ) : (
              <div />
            )
          }
        >
          <div className="menu-wrapper" onClick={this.onClick}>
            <Menu effect={"zoomin"} method={"hover"} position={"br"}>
              <Icon
                type="notification"
                theme="outlined"
                className="noti-icon"
              />
              <MainButton
                iconResting="anticon anticon-notification"
                iconActive="anticon anticon-notification"
              />
            </Menu>
          </div>
        </Popover>
      </div>
    );
  }
}

const styledNotificationCenter = styled(NotificationCenter)`
  .noti-icon {
    position: absolute;
    z-index: 500;
    top: 20;
    transform: scale(2);
    left: 20;
    color: white;
    cursor: pointer;
  }
  .mfb-component--br {
    right: 80px !important;

    .mfb-component__button--main {
      background-color: #722ed1;
    }

    .mfb-component__button--child {
      background-color: #722ed1;
    }
  }

  .menu-wrapper {
    position: fixed;
    bottom: 80px;
    right: 113px;
    z-index: 30;
  }

  .badge {
    position: fixed;
    bottom: 70px;
    right: 95px;
    z-index: 100;
  }
`;

export { styledNotificationCenter as NotificationCenter };
