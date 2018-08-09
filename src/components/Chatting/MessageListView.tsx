import * as React from "react";
import { MessageItem } from "components/Chatting/MessageItem";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";
import _ from "lodash";

interface Props extends Styled {
  data: { getMessages: Message[] };
  subscribeToMore: Function;
  onLoadPrevious: any;
}
interface State {
  page: number;
}
const MessageListView = class extends React.PureComponent<Props, State> {
  messagesEnd: any;
  container: any;
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0
    };
    this.handleScroll = _.throttle(this.handleScroll, 1000);
  }

  componentDidMount() {
    this.props.subscribeToMore();
    this.scrollToBottom();
  }

  onScroll = (e) => {
    this.handleScroll(e.target);
  };

  handleScroll = (target) => {
    const isTop = target.scrollTop === 0;

    if (isTop) {
      this.props.onLoadPrevious(this.state.page, 10);
      this.setState({ page: this.state.page + 1 });
    }
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { getMessages } = this.props.data;

    return (
      <div className={this.props.className} onScroll={(e) => this.onScroll(e)}>
        <ul>
          {getMessages.map((data, key) => (
            <MessageItem key={key} {...data} />
          ))}
        </ul>
        <div ref={(el) => (this.messagesEnd = el)} />
      </div>
    );
  }
};

const styledMessageListView = styled(MessageListView)`
  list-style-type: none;
  padding: 10px 10px 0 10px;
  word-break: break-word;
  overflow: scroll;
  flex: 0 1 auto;

  ul {
    padding: 0;
  }
`;

export { styledMessageListView as MessageListView };
