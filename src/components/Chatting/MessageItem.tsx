import * as React from "react";

interface Props {
  message: string;
  username: string;
}
export class MessageItem extends React.Component<Props, any> {
  render() {
    const { message, username } = this.props;
    return (
      <p>
        {username} : {message}
      </p>
    );
  }
}