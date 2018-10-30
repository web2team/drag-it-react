import * as React from "react";
import { styled } from "theme";
import "react-mfb/mfb.css";
import { Menu, MainButton, ChildButton } from "react-mfb";
import { Styled } from "interface/global";
import { ShowGridItemDrawer } from "./CreateGridItem";
import { CreateChatting } from "./CreateChatting";
import { Icon } from "antd";

interface Props extends Styled {
  gridId: number;
}
class FloatingMenu extends React.Component<Props, any> {
  state = {
    drawerVisible: false
  };

  onClick = () => {
    this.setState({ drawerVisible: true });
  };

  onClose = () => {
    this.setState({ drawerVisible: false });
  };

  render() {
    return (
      <div>
        <Menu
          effect={"zoomin"}
          method={"hover"}
          position={"br"}
          className={this.props.className}
        >
          <MainButton
            iconResting="anticon anticon-plus"
            iconActive="anticon anticon-close"
          />
          <ChildButton
            icon="anticon anticon-form"
            label="add Chatting"
            onClick={this.onClick}
          />
          <ChildButton
            icon="anticon anticon-calendar"
            label="add Calendar"
            onClick={() => console.log("clicked")}
          />
          <Icon type="plus" theme="outlined" className="noti-icon" />
        </Menu>
        <CreateChatting
          visible={this.state.drawerVisible}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

const styledFloatingMenu = styled(FloatingMenu)`
  .noti-icon {
    position: absolute !important;
    z-index: 500 !important;
    top: 21 !important;
    transform: scale(2) !important;
    left: 21 !important;
    color: white;
    cursor: pointer;
  }
  .mfb-component__button--main {
    background-color: #722ed1;
    line-height: 56px;
  }

  .mfb-component__button--child {
    background-color: #722ed1;
    line-height: 56px;
  }
`;

export { styledFloatingMenu as FloatingMenu };
