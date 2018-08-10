import * as React from "react";
import { MessageItem } from "components/Chatting/MessageItem";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";
import _ from "lodash";
import { Spin } from "antd";

interface Props extends Styled {
  data: { getMessages: Message[] };
  subscribeToMore: Function;
  onLoadPrevious: any;
  size: number;
}
interface State {
  page: number;
  loading: boolean;
  shouldScroll: boolean;
}
const MessageListView = class extends React.PureComponent<Props, State> {
  messagesEnd: any;
  container: any;

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      shouldScroll: true
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
      this.setState({ loading: true, shouldScroll: false });

      this.props
        .onLoadPrevious(this.state.page, this.props.size)
        .then(() =>
          _.debounce(() => this.setState({ loading: false }), 1000)()
        );

      this.setState({ page: this.state.page + 1 });
    }
  };

  componentDidUpdate() {
    if (this.state.shouldScroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { getMessages } = this.props.data;

    return (
      <div className={this.props.className} onScroll={this.onScroll}>
        <Spin spinning={this.state.loading}>
          <ul>
            {getMessages.map((data, key) => (
              <MessageItem key={key} {...data} />
            ))}
          </ul>
          <div ref={(el) => (this.messagesEnd = el)} />
        </Spin>
      </div>
    );
  }
};

const styledMessageListView = styled(MessageListView)`
  list-style-type: none;
  padding: 10px 10px 0 10px;
  word-break: break-word;
  overflow: scroll;
  flex: 1 1 auto;

  ul {
    padding: 0;
  }
`;

export { styledMessageListView as MessageListView };
