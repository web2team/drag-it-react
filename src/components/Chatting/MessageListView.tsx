import * as React from "react";
import { MessageItem } from "components/Chatting/MessageItem";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";

interface Props extends Styled {
  data: { getAllMessages: Message[] };
  subscribeToMore: Function;
}
const MessageListView = class extends React.PureComponent<Props> {
  messagesEnd: any;
  messagesEnds: any;

  componentDidMount() {
    this.props.subscribeToMore();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { getAllMessages } = this.props.data;
    const { length } = getAllMessages;

    return (
      <div className={this.props.className}>
        <ul ref={(el) => (this.messagesEnds = el)}>
          {getAllMessages
            .slice(length - 15, length)
            .map((data, key) => <MessageItem key={key} {...data} />)}
        </ul>
        <div ref={(el) => (this.messagesEnd = el)} />
      </div>
    );
  }
};

const styledMessageListView = styled(MessageListView)`
  list-style-type: none;
  padding: 0;
  ul {
    padding: 0;
  }
  word-break: break-word;
  overflow-y: scroll;
`;

export { styledMessageListView as MessageListView };
