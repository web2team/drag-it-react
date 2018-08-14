import * as React from "react";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";
import Moment from "react-moment";

interface Props extends Message, Styled {
  className?: string;
}
class MessageItem extends React.PureComponent<Props> {
  render() {
    const { user, contents, createdAt, className } = this.props;

    return (
      <div className={className}>
        <span className="name">{user.name}</span>
        <span className="contents">{contents}</span>
        <span className="createdAt">
          <Moment date={createdAt} fromNow={true} ago={true} /> 전
        </span>
      </div>
    );
  }
}

const styledMessageItem = styled(MessageItem)`
  margin-bottom: 1em;
  position: relative;

  .name {
    font-weight: 800;
  }
  .contents {
    padding: 0 10px 0 10px;
  }
  .createdAt {
    color: darkgray;
    font-size: 0.9em;
  }
`;

export { styledMessageItem as MessageItem };
