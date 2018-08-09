import * as React from "react";
import { MessageListContainer } from "./MessageListContainer";
import { InputChatting } from "./InputChatting";
import { styled } from "theme";
import { BORDER_COLOR } from "theme/color";

const Chatting = ({ className, x, y, w, h, s }: any) => (
  <div className={className} data-grid={{ x, y, w, h, static: s }}>
    <MessageListContainer />
    <InputChatting />
  </div>
);

const styledChatting = styled(Chatting)`
  border: 1px solid ${BORDER_COLOR};
`;

export { styledChatting as Chatting };
