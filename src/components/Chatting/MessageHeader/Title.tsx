import * as React from "react";
import { styled } from "theme";

import { Query } from "react-apollo";
import { GET_MAP_USER_CHAT_THREAD, UPDATE_USER_CHAT_THREAD_NAME } from "../gql";
import { EditableForm } from "utility/EditableForm";

const Title = ({ className, userId, chatThreadId }) => (
  <Query query={GET_MAP_USER_CHAT_THREAD} variables={{ userId, chatThreadId }}>
    {({ loading, error, data: { getMapUserChatThread } }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }

      return (
        <div className={className}>
          <EditableForm
            request={{
              query: UPDATE_USER_CHAT_THREAD_NAME,
              variables: {
                userId,
                chatThreadId
              }
            }}
            editable={true}
            data={getMapUserChatThread.name}
            dataFieldName="name"
          />
        </div>
      );
    }}
  </Query>
);

const styledTitle = styled(Title)`
  display: inline;
`;

export { styledTitle as Title };
