import * as React from "react";
import { styled } from "theme";
import { MESSAGE_HEADER_HEIGHT } from "theme/constant";
import { Title } from "./Title";
import { PeopleList } from "components/Chatting/MessageHeader/PeopleList";

const MessageHeader = ({ className, ...props }: any) => (
  <div className={className}>
    <Title {...props} />
    <PeopleList {...props} />
  </div>
);

const styledMessageHeader = styled(MessageHeader)`
  /* width: 100%; */
  /* margin: ${MESSAGE_HEADER_HEIGHT}px 0; */
`;

export { styledMessageHeader as MessageHeader };
