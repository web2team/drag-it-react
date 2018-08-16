import * as React from "react";
import { styled } from "theme";
import { Menu, MainButton, ChildButton } from "react-mfb";
import "react-mfb/mfb.css";
import { Styled } from "interface/global";
import { Popover, Badge } from "antd";

interface Props extends Styled {
  userId: number;
}
class NotificationCenter extends React.Component<Props, any> {
  state = {
    visible: false
  };

  onClick = () => {
    console.log("clcll");
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <div onClick={this.onClick} className={this.props.className}>
        {!this.state.visible ? <Badge count={100} className="badge" /> : null}

        <Popover
          visible={this.state.visible}
          title={"title"}
          placement="topRight"
          content={<div>abbslkjdfkljfs</div>}
          trigger="click"
        >
          <Menu effect={"zoomin"} method={"hover"} position={"br"}>
            <MainButton
              iconResting="anticon anticon-notification"
              iconActive="anticon anticon-notification"
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}

const styledNotificationCenter = styled(NotificationCenter)`
  .mfb-component--br {
    right: 80px !important;

    .mfb-component__button--main {
      background-color: #722ed1;
    }

    .mfb-component__button--child {
      background-color: #722ed1;
    }
  }

  .badge {
    position: fixed;
    bottom: 70px;
    right: 95px;
    z-index: 100;
  }
`;

export { styledNotificationCenter as NotificationCenter };
