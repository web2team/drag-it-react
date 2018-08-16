import * as React from "react";
import { Query } from "react-apollo";
import { MessageListView } from "./MessageListView";
import { GET_CHAT_MESSAGES, LINK_CHAT_MESSAGES } from "./gql";
import { ChatThread, ChattingProps } from "interface/Chat";

const LOAD_SIZE = 30;
export const MessageListContainer = ({
  chatThread: { id: chatThreadId }
}: ChattingProps) => (
  <Query
    query={GET_CHAT_MESSAGES}
    variables={{ chatThreadId, page: 0, size: LOAD_SIZE }}
  >
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
          document: LINK_CHAT_MESSAGES,
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
