import * as React from "react";
import { styled } from "theme";
import "react-mfb/mfb.css";
import { Menu, MainButton, ChildButton } from "react-mfb";
import { Styled } from "interface/global";
import { ShowGridItemDrawer } from "./CreateGridItem";
import { CreateChatting } from "./CreateChatting";
import { CreateCalendar } from "./CreateCalandar";
import { Icon } from "antd";
import "./FloatingMenu.css";

interface Props extends Styled {
  gridId: number;
}
class FloatingMenu extends React.Component<Props, any> {
  state = {
    drawerVisible: [false, false, false]
  };

  onClick = (idx: number) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.drawerVisible[idx] = true;

      return newState;
    });
  };

  onClose = (idx: number) => {
    this.setState((prev) => {
      const newState = { ...prev };
      newState.drawerVisible[idx] = false;

      return newState;
    });
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
            icon="ion-chatbubbles"
            label="add Chatting"
            onClick={() => this.onClick(0)}
          />
          <ChildButton
            icon="ion-calendar"
            label="add Calendar"
            onClick={() => this.onClick(1)}
          />
          <ChildButton
            icon="ion-clipboard"
            label="add MarkDown"
            onClick={() => this.onClick(1)}
          />
          <Icon type="plus" theme="outlined" className="noti-icon" />
        </Menu>
        <i className="icon ion-md-heart" />
        <CreateChatting
          visible={this.state.drawerVisible[0]}
          onClose={() => this.onClose(0)}
        />
        <CreateCalendar
          visible={this.state.drawerVisible[1]}
          onClose={() => this.onClose(1)}
        />
      </div>
    );
  }
}

const styledFloatingMenu = styled(FloatingMenu)`
  .ion-chatbubbles::before,
  .ion-clipboard::before,
  .ion-calendar::before {
    top: 17px;
    position: relative;
    transform: scale(1.4);
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
