import * as React from "react";
import { Input, Button } from "antd";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { styled } from "theme";
const Search = Input.Search;

const ADD_BOOK = gql`
  mutation newChatMessage(
    $chat_thread_id: ID!
    $contents: String!
    $username: String!
  ) {
    newChatMessage(
      chat_thread_id: $chat_thread_id
      contents: $contents
      username: $username
    ) {
      id
      username
      contents
      createdAt
    }
  }
`;

class InputChatting extends React.Component<any, any> {
  input: any;
  state = {
    value: ""
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (newChatMessage) => (value, e) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    newChatMessage({
      variables: {
        contents: trimmedValue,
        username: "na",
        chat_thread_id: 1
      }
    });

    this.setState({ value: "" });
  };

  render() {
    return (
      <Mutation mutation={ADD_BOOK}>
        {(newChatMessage, { data }) => (
          <div className={this.props.className}>
            <Search
              placeholder="내용을 입력해주세요"
              enterButton="Enter"
              onSearch={this.handleSubmit(newChatMessage)}
              ref={(ref) => (this.input = ref)}
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
        )}
      </Mutation>
    );
  }
}
const styledInputChatting = styled(InputChatting)`
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

export { styledInputChatting as InputChatting };
