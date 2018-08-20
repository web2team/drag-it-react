import * as React from "react";
import { styled } from "theme";
import { Tag, Input, Tooltip, Icon } from "antd";
import { Query } from "react-apollo";
import { GET_CHAT_THREAD } from "../gql";
import { ChattingProps } from "interface/Chat";

class PeopleList extends React.Component<ChattingProps, any> {
  state = {
    inputVisible: false,
    inputValue: ""
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = (input) => (this.input = input);
  input: any;

  render() {
    const { inputVisible, inputValue } = this.state;
    const {
      chatThread: { id: chatThreadId }
    } = this.props;
    const tagColors = [
      "magenta",
      "red",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
      "#f50",
      "#2db7f5",
      "#87d068",
      "#108ee9"
    ];

    const getRandomIndex = () =>
      Math.floor(Math.random() * tagColors.length - 1);
    const getRandomColor = () => {
      const index = getRandomIndex();

      return tagColors[index];
    };

    return (
      <Query query={GET_CHAT_THREAD} variables={{ chatThreadId }}>
        {({ loading, error, data: { getChatThread } }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error: {error.message}</p>;
          }
          return (
            <div className={this.props.className}>
              {getChatThread.users.map(({ name: tag }, index) => {
                const isLongTag = tag.length > 10;
                const tagElem = (
                  <Tag key={index} closable={false} color={getRandomColor()}>
                    {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={index}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

const styledPeopleList = styled(PeopleList)`
  display: inline;
`;

export { styledPeopleList as PeopleList };
