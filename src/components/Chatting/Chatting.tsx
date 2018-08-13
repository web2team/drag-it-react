import * as React from "react";
import { MessageListContainer } from "components/Chatting/MessageListContainer";
import { MessageInput } from "components/Chatting/MessageInput";
import { styled } from "theme";
import { MessageHeader } from "components/Chatting/MessageHeader";

const Chatting = ({ className, chat_thread_id }: any) => (
  <div className={className}>
    <MessageHeader />
    <MessageListContainer chat_thread_id={chat_thread_id} />
    <MessageInput chat_thread_id={chat_thread_id} />
  </div>
);

const styledChatting = styled(Chatting)`
  display: flex;
  flex-flow: column;
  flex: auto;
`;

export { styledChatting as Chatting };
