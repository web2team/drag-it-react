import * as React from "react";
import { MessageItem } from "components/Chatting/MessageItem";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";
import _ from "lodash";
import { Spin, message } from "antd";
import ReactChatView from "react-chatview";

interface Props extends Styled {
  data: { getChatMessages: Message[] };
  subscribeToMore: Function;
  onLoadPrevious: any;
  size: number;
}
interface State {
  page: number;
  loading: boolean;
}
const MessageListView = class extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      loading: false
    };
  }

  componentDidMount() {
    this.props.subscribeToMore();
  }

  componentDidUpdate() {
    this.setState({ loading: false });
  }

  onInfiniteLoad = () => {
    this.setState({ loading: true });
    this.props.onLoadPrevious(this.state.page, this.props.size);

    return Promise.resolve();
  };

  render() {
    const { getChatMessages } = this.props.data;

    return (
      <ReactChatView
        scrollLoadThreshold={250}
        flipped={true}
        reversed={true}
        onInfiniteLoad={this.onInfiniteLoad}
        className={this.props.className}
      >
        {getChatMessages.map((data, key) => (
          <MessageItem key={key} {...data} />
        ))}
      </ReactChatView>
    );
  }
};

const styledMessageListView = styled(MessageListView)`
  height: 100%;
  list-style-type: none;
  padding: 10px 10px 0px 10px;
  word-break: break-word;
  flex: 1 1 auto;

  ul {
    padding: 0 15px 0 15px;
  }
`;

export { styledMessageListView as MessageListView };
