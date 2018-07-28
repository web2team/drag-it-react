import * as React from "react";
import { MessageItem } from "./MessageItem";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const query = gql`
  {
    getAllMessages(chat_thread_id: 1) {
      username
      contents
      createdAt
    }
  }
`;

const subscription = gql`
  subscription Message {
    ChatMessage(chat_thread_id: 1) {
      username
      contents
      createdAt
    }
  }
`;

const MessageListView = class extends React.PureComponent<any, any> {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    const length = data.getAllMessages.length;
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {console.log(data)}
        {data.getAllMessages
          .slice(length - 5, length)
          .map((data, key) => (
            <MessageItem
              key={key}
              username={data.username}
              message={data.contents}
            />
          ))}
      </ul>
    );
  }
};

export const MessageList = () => (
  <Query query={query}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }
      const more = () =>
        subscribeToMore({
          document: subscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const newMessage = subscriptionData.data.ChatMessage;
            const newMessages = [...prev.getAllMessages];
            console.log(newMessages);
            newMessages.push(newMessage);
            console.log(newMessages);
            const length = newMessages.length;

            return Object.assign({}, prev, {
              getAllMessages: newMessages.slice(length - 5, length)
            });
          }
        });
      return <MessageListView data={data} subscribeToMore={more} />;
    }}
  </Query>
);
