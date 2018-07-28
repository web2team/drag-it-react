import * as React from "react";
import { Message } from "components/Chatting/Message";
import { InputChatting } from "components/Chatting/InputChatting";

export class Chatting extends React.Component<any, any> {
  render() {
    const dummyDatas = [
      {
        username: "na",
        message: "mes"
      },
      {
        username: "na",
        message: "mes1"
      },
      {
        username: "na",
        message: "mes2"
      }
    ];
    return (
      <div>
        {dummyDatas.map(({ message, username }, key) => (
          <Message key={key} message={message} username={username} />
        ))}
        <InputChatting />
      </div>
    );
  }
}
