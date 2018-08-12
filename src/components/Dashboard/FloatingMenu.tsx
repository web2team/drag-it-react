import * as React from "react";
import { styled } from "theme";
import { Menu, MainButton, ChildButton } from "react-mfb";
import "react-mfb/mfb.css";
import { Icon } from "../../../node_modules/antd";

class FloatingMenu extends React.Component {
  render() {
    return (
      <Menu effect={"zoomin"} method={"hover"} position={"br"}>
        <MainButton iconResting="anticon anticon-up" iconActive="ion-close-round">
          abcd
        </MainButton>
        <ChildButton icon="ion-social-github" label="View on Github" />
        <ChildButton icon="ion-social-octocat" label="Follow me on Github">
          abc
        </ChildButton>
        <ChildButton icon="ion-social-twitter" label="Share on Twitter" />
      </Menu>
    );
  }
}

const styledFloatingMenu = styled(FloatingMenu)`
`;

export { styledFloatingMenu as FloatingMenu };
