import * as React from "react";
import { Mention } from "antd";
import { styled } from "theme";
import { Styled } from "interface/global";
const { toString, toContentState } = Mention;

const users = [
  "afc163",
  "benjycui",
  "yiminghe",
  "jljsj33",
  "dqaria",
  "RaoHai",
  "가나다"
];

interface Props extends Styled {
  placeholder?: string;
  value: string;
  onChange: any;
}
interface State {
  suggestions: string[];
  loading: boolean;
}
class AsyncMention extends React.Component<Props, State> {
  mention: Mention;

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

    this.fetchSuggestions(value).then((suggestions: string[]) => {
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
        ref={(ref) => (this.mention = ref)}
        loading={loading}
        suggestions={suggestions}
        onSearchChange={this.onSearchChange}
        placeholder=""
        onChange={(v) => {
          console.log(toString(v));
          this.props.onChange(v);
        }}
        value={this.props.value}
        notFoundContent="not found"
      />
    );
  }
}

const styledAsyncMention = styled(AsyncMention)``;

export { styledAsyncMention as AsyncMention };
