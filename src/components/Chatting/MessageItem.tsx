import * as React from "react";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";
import Moment from "react-moment";

interface Props extends Message, Styled {
  className?: string;
} 
class MessageItem extends React.PureComponent<Props> {
  resolveMention = (contents: string) => {
    return contents;
    // let result;

    // let idx = contents.indexOf("@", 0);
    // if (idx === -1) {
    //   return contents;
    // }
    // let end = 0;
    // while (true) {
    //   console.log(idx);
    //   console.log(end);
    //   console.log(result);
    //   idx = contents.indexOf("@", end);
    //   if (idx === -1 || end === -1) {
    //     return result;
    //   }
    //   end = contents.indexOf(" ", idx);

    //   result += (
    //     <span className="name">{contents.substring(idx + 1, end)}</span>
    //   );
    // }
  };

  render() {
    const { user, contents, createdAt, className } = this.props;

    return (
      <div className={className}>
        <span className="name">{user.name}</span>
        <span className="contents">{this.resolveMention(contents)}</span>
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
    padding: 0px 10px 0px 10px;
  }
  .createdAt {
    color: darkgray;
    font-size: 0.9em;
  }
`;

export { styledMessageItem as MessageItem };
