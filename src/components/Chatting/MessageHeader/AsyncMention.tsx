import * as React from "react";
import { Mention } from "antd";
import { styled } from "theme";

const users = ["afc163", "benjycui", "yiminghe", "jljsj33", "dqaria", "RaoHai", "가나다"];

class AsyncMention extends React.Component {
  state = {
    suggestions: [],
    loading: false
  };

  fetchSuggestions = (value) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(users.filter((item: string) => item.indexOf(value) !== -1));
      }, 500);
    });

  onSearchChange = (value) => {
    this.setState({
      loading: true
    });

    this.fetchSuggestions(value).then((suggestions) => {
      this.setState({
        suggestions,
        loading: false
      });
    });
  };

  render() {
    const { suggestions, loading } = this.state;
    return (
      <Mention
        style={{ width: "100%" }}
        loading={loading}
        suggestions={suggestions}
        onSearchChange={this.onSearchChange}
      />
    );
  }
}

const styledAsyncMention = styled(AsyncMention)``;

export { styledAsyncMention as AsyncMention };
