import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MessageListView } from "components/Chatting/MessageListView";

const query = gql`
  query getAllMessages($chat_thread_id: ID!) {
    getAllMessages(chat_thread_id: $chat_thread_id) {
      username
      contents
      createdAt
    }
  }
`;

const subscription = gql`
  subscription Message($chat_thread_id: ID!) {
    ChatMessage(chat_thread_id: $chat_thread_id) {
      username
      contents
      createdAt
    }
  }
`;

export const MessageListContainer = () => (
  <Query query={query} variables={{ chat_thread_id: 1 }}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }
      const more = () => {
        const updateQuery = (prev, { subscriptionData: { data } }) => {
          const { ChatMessage } = data;

          if (!data) {
            return prev;
          }
          return Object.assign({}, prev, {
            getAllMessages: [...prev.getAllMessages, ChatMessage]
          });
        };

        subscribeToMore({
          document: subscription,
          variables: { chat_thread_id: 1 },
          updateQuery
        });
      };
      return <MessageListView data={data} subscribeToMore={more} />;
    }}
  </Query>
);
