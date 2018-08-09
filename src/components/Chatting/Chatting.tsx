import * as React from "react";
import { MessageListContainer } from "./MessageListContainer";
import { InputChatting } from "./InputChatting";
import { styled } from "theme";
import { BORDER_COLOR } from "theme/color";
import { withDraggable } from "utility/withDraggable";

const Chatting = ({ className }: any) => (
  <div className={className}>
    <MessageListContainer />
    <InputChatting />
  </div>
);

const styledChatting = styled(Chatting)`
  border: 1px solid ${BORDER_COLOR};
`;

const DraggableChatting = withDraggable(Chatting);
export { styledChatting as Chatting, DraggableChatting };
