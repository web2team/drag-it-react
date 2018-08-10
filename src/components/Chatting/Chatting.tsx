import * as React from "react";
import { MessageListContainer } from "./MessageListContainer";
import { InputChatting } from "./InputChatting";
import { styled } from "theme";

const Chatting = ({ className }: any) => (
  <div className={className}>
    <MessageListContainer />
    <InputChatting />
  </div>
);

const styledChatting = styled(Chatting)`
  display: flex;
  flex-flow: column;
  flex: auto;
`;

export { styledChatting as Chatting };
