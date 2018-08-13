import * as React from "react";
import { styled } from "theme";
import { MessageListContainer } from "./MessageListContainer";
import { MessageInput } from "./MessageInput";
import { MessageHeader } from "./MessageHeader";

const Chatting = ({ className, ...props }: any) => (
  <div className={className}>
    <MessageHeader {...props} />
    <MessageListContainer {...props} />
    <MessageInput {...props} />
  </div>
);

const styledChatting = styled(Chatting)`
  display: flex;
  flex-flow: column;
  flex: auto;
`;

export { styledChatting as Chatting };
