import * as React from "react";
import { styled } from "theme";
import { Menu, MainButton, ChildButton } from "react-mfb";
import "react-mfb/mfb.css";
import { Styled } from "interface/global";
import { ShowGridItemDrawer } from "components/Dashboard/CreateGridItem";

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
        </Menu>
        <ShowGridItemDrawer
          visible={this.state.drawerVisible}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

const styledFloatingMenu = styled(FloatingMenu)`
  .mfb-component__button--main {
    background-color: #722ed1;
  }

  .mfb-component__button--child {
    background-color: #722ed1;
  }
`;

export { styledFloatingMenu as FloatingMenu };
