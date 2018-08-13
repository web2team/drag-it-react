import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MessageListView } from "components/Chatting/MessageListView";

const query = gql`
  query getChatMessages($chatThreadId: ID!, $page: Int!, $size: Int!) {
    getChatMessages(chatThreadId: $chatThreadId, page: $page, size: $size) {
      user {
        id
        name
      }
      contents
      createdAt
    }
  }
`;

const subscription = gql`
  subscription linkChatMessage($chatThreadId: ID!) {
    linkChatMessage(chatThreadId: $chatThreadId) {
      id
      user {
        id
        name
      }
      contents
      createdAt
    }
  }
`;
const LOAD_SIZE = 30;
export const MessageListContainer = ({ chatThreadId }) => (
  <Query query={query} variables={{ chatThreadId, page: 0, size: LOAD_SIZE }}>
    {({ loading, error, data, subscribeToMore, fetchMore }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }

      const more = () => {
        const updateQuery: any = (prev, { subscriptionData: { data } }) => {
          const { linkChatMessage } = data;

          if (!data) {
            return prev;
          }
          return Object.assign({}, prev, {
            getChatMessages: [...prev.getChatMessages, linkChatMessage]
          });
        };

        subscribeToMore({
          document: subscription,
          variables: { chatThreadId },
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
              getChatMessages: [
                ...fetchMoreResult.getChatMessages,
                ...prev.getChatMessages
              ]
            });
          };

          fetchMore({
            variables: { chatThreadId, page, size },
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
