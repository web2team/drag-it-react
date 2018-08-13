import * as React from "react";
import { styled } from "theme";
import { Styled } from "interface/global";
import { MESSAGE_HEADER_HEIGHT } from "theme/constant";

interface Props extends Styled {}
class MessageHeader extends React.Component<Props> {
  render() {
    return <div className={this.props.className}>header</div>;
  }
}
const styledMessageHeader = styled(MessageHeader)`
  width: 100%;
  /* margin: ${MESSAGE_HEADER_HEIGHT}px 0; */
`;

export { styledMessageHeader as MessageHeader };
