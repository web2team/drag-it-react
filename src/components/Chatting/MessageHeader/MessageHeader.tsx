import * as React from "react";
import { styled } from "theme";
import { MESSAGE_HEADER_HEIGHT } from "theme/constant";
import { Title } from "./Title";
import { PeopleList } from "components/Chatting/MessageHeader/PeopleList";
import { ChattingProps } from "interface/Chat";

const MessageHeader = ({ className, ...props }: ChattingProps) => (
  <div className={className}>
    <Title {...props} /> <PeopleList {...props} />
  </div>
);

const styledMessageHeader = styled(MessageHeader)`
  /* width: 100%; */
  /* margin: ${MESSAGE_HEADER_HEIGHT}px 0; */
  border-bottom: 1px solid #e8e8e8;
  padding: 0px 10px;
`;

export { styledMessageHeader as MessageHeader };
