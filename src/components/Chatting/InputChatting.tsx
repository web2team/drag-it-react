import * as React from "react";
import { Form } from "antd";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { styled } from "theme";

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
  render() {
    const SendNewMessage = () => {
      let input;

      return (
        <Mutation mutation={ADD_BOOK}>
          {(newChatMessage, { data }) => (
            <div className={this.props.className}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  newChatMessage({
                    variables: {
                      contents: input.value,
                      username: "na",
                      chat_thread_id: 1
                    }
                  });
                  input.value = "";
                }}
                style={{ padding: 0, margin: 0 }}
              >
                <div>
                  <input
                    style={{ width: "85%" }}
                    ref={(node) => {
                      input = node;
                    }}
                  />
                  <button style={{ width: "15%" }} type="submit">
                    Enter
                  </button>
                </div>
              </form>
            </div>
          )}
        </Mutation>
      );
    };
    return <SendNewMessage />;
  }
}

const styledInputChatting = styled(InputChatting)`
  width: 100%;
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
`;

export { styledInputChatting as InputChatting };
