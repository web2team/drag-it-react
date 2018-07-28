import * as React from "react";
import { Input } from "antd";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export class InputChatting extends React.Component<any, any> {
  render() {
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

    const SendNewMessage = () => {
      let input;

      return (
        <Mutation mutation={ADD_BOOK}>
          {(newChatMessage, { data }) => (
            <div>
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
              >
                <input
                  ref={(node) => {
                    input = node;
                  }}
                />
                <button type="submit">Enter</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    };
    return (
      <div>
        <SendNewMessage />
      </div>
    );
  }
}
