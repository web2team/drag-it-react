import * as React from "react";
import { styled } from "theme";
import { MessageListContainer } from "./MessageListContainer";
import { MessageInput } from "./MessageInput";
import { MessageHeader } from "./MessageHeader";
import { ChattingProps } from "interface/Chat";

const Chatting = ({ className, ...props }: ChattingProps) => (
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
