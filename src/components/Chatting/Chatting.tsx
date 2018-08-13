import * as React from "react";
import { MessageListContainer } from "components/Chatting/MessageListContainer";
import { MessageInput } from "components/Chatting/MessageInput";
import { styled } from "theme";
import { MessageHeader } from "components/Chatting/MessageHeader";

const Chatting = ({ className, chatThreadId }: any) => (
  <div className={className}>
    <MessageHeader />
    <MessageListContainer chatThreadId={chatThreadId} />
    <MessageInput chatThreadId={chatThreadId} />
  </div>
);

const styledChatting = styled(Chatting)`
  display: flex;
  flex-flow: column;
  flex: auto;
`;

export { styledChatting as Chatting };
