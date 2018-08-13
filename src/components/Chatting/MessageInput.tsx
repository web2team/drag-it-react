import * as React from "react";
import { Input, Button } from "antd";
import { Mutation } from "react-apollo";
import { NEW_CHAT_MESSAGE } from "./gql";
import { styled } from "theme";
import { Styled } from "interface/global";
const Search = Input.Search;

interface Props extends Styled {
  chatThreadId: number;
  userId: number;
}
interface State {
  value: string;
  sending: boolean;
}
class MessageInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      sending: false
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (newChatMessage) => (value, e) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    this.setState({ value: "", sending: true });
    newChatMessage({
      variables: {
        contents: trimmedValue,
        userId: this.props.userId,
        chatThreadId: this.props.chatThreadId
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
            <Search
              placeholder="내용을 입력해주세요"
              enterButton="Enter"
              onSearch={this.handleSubmit(newChatMessage)}
              value={this.state.value}
              onChange={this.onChange}
            />
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
