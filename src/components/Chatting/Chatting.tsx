import * as React from "react";
import { MessageListContainer } from "./MessageListContainer";
import { InputChatting } from "./InputChatting";
import { styled } from "theme";
import { BORDER_COLOR } from "theme/color";

const Chatting = ({ className }: any) => (
  <div className={className}>
    <MessageListContainer />
    <InputChatting />
  </div>
);

const styledChatting = styled(Chatting)`
  display: flex;
  flex-flow: column;
`;

export { styledChatting as Chatting };
