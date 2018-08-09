import * as React from "react";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";

interface Props extends Message, Styled {
  className?: string;
}
class MessageItem extends React.PureComponent<Props> {
  render() {
    const { username, contents, createdAt, className } = this.props;

    return (
      <div className={className}>
        <span className="username">{username}</span>
        <span className="contents">{contents}</span>
        <div className="createdAt">[{createdAt}]</div>
      </div>
    );
  }
}

const styledMessageItem = styled(MessageItem)`
  margin-bottom: 1em;
  position: relative;

  .username {
    font-weight: 800;
  }
  .contents {
    padding: 0 1em 0 1em;
  }
  .createdAt {
  }
`;

export { styledMessageItem as MessageItem };
