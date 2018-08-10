import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MessageListView } from "components/Chatting/MessageListView";

const query = gql`
  query getMessages($chat_thread_id: ID!, $page: Int!, $size: Int!) {
    getMessages(chat_thread_id: $chat_thread_id, page: $page, size: $size) {
      username
      contents
      createdAt
    }
  }
`;

const subscription = gql`
  subscription Message($chat_thread_id: ID!) {
    ChatMessage(chat_thread_id: $chat_thread_id) {
      id
      username
      contents
      createdAt
    }
  }
`;
const LOAD_SIZE = 30;
export const MessageListContainer = ({ chat_thread_id }) => (
  <Query query={query} variables={{ chat_thread_id, page: 0, size: LOAD_SIZE }}>
    {({ loading, error, data, subscribeToMore, fetchMore }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }

      const more = () => {
        const updateQuery: any = (prev, { subscriptionData: { data } }) => {
          const { ChatMessage } = data;

          if (!data) {
            return prev;
          }
          return Object.assign({}, prev, {
            getMessages: [...prev.getMessages, ChatMessage]
          });
        };

        subscribeToMore({
          document: subscription,
          variables: { chat_thread_id: 1 },
          updateQuery
        });
      };

      const onLoadPrevious = (page: number, size: number) =>
        new Promise((resolve) => {
          const updateQuery: any = (prev: any, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }
            return Object.assign({}, prev, {
              getMessages: [...fetchMoreResult.getMessages, ...prev.getMessages]
            });
          };

          fetchMore({
            variables: { chat_thread_id, page, size },
            updateQuery
          }).then(() => resolve());
        });

      return (
        <MessageListView
          data={data}
          subscribeToMore={more}
          onLoadPrevious={onLoadPrevious}
          size={LOAD_SIZE}
        />
      );
    }}
  </Query>
);
