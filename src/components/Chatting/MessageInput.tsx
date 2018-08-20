import * as React from "react";
import { Input, Button, Spin, Mention } from "antd";
import { Mutation } from "react-apollo";
import { NEW_CHAT_MESSAGE } from "./gql";
import { styled } from "theme";
import { ChattingProps } from "interface/Chat";
import { AsyncMention } from "components/Chatting/AsyncMention";
const Search = Input.Search;
const { toString, toContentState, getMentions } = Mention;

interface State {
  value: any;
  sending: boolean;
}
class MessageInput extends React.Component<ChattingProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: toContentState(""),
      sending: false
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

  handleSubmit = (newChatMessage) => (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const value = this.state.value;
    console.log(toString(value));
    console.log(getMentions(value));

    const trimmedValue: string = toString(value).trim();
    if (!trimmedValue) {
      return;
    }
    if (this.state.sending) {
      return;
    }
    if (trimmedValue.endsWith("@")) {
      return;
    }

    this.setState({ value: toContentState(""), sending: true });
    newChatMessage({
      variables: {
        contents: trimmedValue,
        userId: this.props.userId,
        chatThreadId: this.props.chatThread.id
      }
    });
  };

  onCompleted = () => {
    this.setState({ sending: false });
  };

  render() {
    return (
      <Mutation mutation={NEW_CHAT_MESSAGE} onCompleted={this.onCompleted}>
        {(newChatMessage, { data }) => (
          <div className={this.props.className}>
            <Spin spinning={this.state.sending}>
              <div className="message-input-container">
                <div
                  className="message-input"
                  onKeyDown={this.handleSubmit(newChatMessage)}
                >
                  <AsyncMention
                    onChange={this.onChange}
                    value={this.state.value}
                  />
                </div>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="message-input-button-submit"
                  onKeyDown={this.handleSubmit(newChatMessage)}
                  onClick={this.handleSubmit(newChatMessage)}
                >
                  Enter
                </Button>
              </div>
            </Spin>
          </div>
        )}
      </Mutation>
    );
  }
}
const styledMessageInput = styled(MessageInput)`
  width: 100%;
  flex: 0 0 auto;
  margin: 0;
  padding: 0;

  .message-input-container {
    display: flex;

    .message-input {
      flex: 1 0 auto;
      width: 10px;
    }
    .message-input-button-submit {
      flex: 0 1 auto;
    }
  }
  .ant-input-affix-wrapper .ant-input {
    min-height: 0;
  }

  .ant-input {
    border: 0;
    border-top: 1px solid #e8e8e8;
    border-radius: 0;
  }

  .ant-input-search .ant-input-search-button {
    border-radius: 0;
  }
`;

export { styledMessageInput as MessageInput };
