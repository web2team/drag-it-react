import * as React from "react";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";

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
        <div className="createdAt">[{createdAt}]</div>
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
  }
`;

export { styledMessageItem as MessageItem };
