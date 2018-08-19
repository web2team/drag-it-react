import * as React from "react";
import { MessageItem } from "components/Chatting/MessageItem";
import { styled } from "theme";
import { Message } from "interface/Message";
import { Styled } from "interface/global";
import _ from "lodash";
import { Spin } from "antd";
import Scrollbars from "react-custom-scrollbars";
import { Element, scrollSpy, animateScroll, scroller } from "react-scroll";
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
  shouldScroll: boolean;
}
const MessageListView = class extends React.PureComponent<Props, State> {
  messagesEnd: any;
  container: any;
  messageListContainer: any;

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
    // this.scrollToBottom();
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
    }
  };

  onInfiniteLoad = () => {
    this.props.onLoadPrevious(this.state.page, this.props.size);
    return new Promise((resolve, reject) => resolve() );
  };

  // componentDidUpdate(prevProps: Props) {
  //   const len1 = this.props.data.getChatMessages.length;
  //   const lenPrev = prevProps.data.getChatMessages.length;
  //   if (
  //     this.props.data.getChatMessages[len1 - 1].createdAt.localeCompare(
  //       prevProps.data.getChatMessages[lenPrev - 1].createdAt
  //     )
  //   ) {
  //     this.scrollToBottom();
  //   }
  // }

  scrollToBottom = () => {
    this.messageListContainer.scrollToBottom();
  };

  render() {
    const { getChatMessages } = this.props.data;

    return (
      // <Scrollbars
      //   className={this.props.className}
      //   onScroll={this.onScroll}
      //   autoHide={true}
      //   ref={(ref) => (this.messageListContainer = ref)}
      // >
      <ReactChatView
        scrollLoadThreshold={10}
        flipped={true}
        reversed={true}
        onInfiniteLoad={this.onInfiniteLoad}
      >
        {getChatMessages.map((data, key) => (
          <MessageItem key={key} {...data} />
        ))}
        {/* <Spin spinning={this.state.loading}>
            <ul>
              {getChatMessages.map((data, key) => (
                <MessageItem key={key} {...data} />
              ))}
            </ul>
            <div ref={(el) => (this.messagesEnd = el)} />
          </Spin> */}
      </ReactChatView>
      // </Scrollbars>
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
    padding: 0 15px 0 15px;
  }
`;

export { styledMessageListView as MessageListView };
