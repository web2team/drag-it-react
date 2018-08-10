import * as React from "react";
import { MessageListContainer } from "components/Chatting/MessageListContainer";
import { MessageInput } from "components/Chatting/MessageInput";
import { styled } from "theme";

const Chatting = ({ className }: any) => (
  <div className={className}>
    <MessageListContainer />
    <MessageInput />
  </div>
);

const styledChatting = styled(Chatting)`
  display: flex;
  flex-flow: column;
  flex: auto;
`;

export { styledChatting as Chatting };
