import * as React from "react";

import "./TextEditor.less";
import Dante from "Dante2";

import styled from "theme";
import { API_ENDPOINT } from "constants/urls";
import Axios from "axios";

import { message } from "antd";

class TextEditor extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      contents: {
        blocks: [
          {
            key: "52a6u",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          }
        ],
        entityMap: {}
      }
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    Axios.get(`${API_ENDPOINT}/texteditor/1`).then(({ data }) => {
      console.log("fetch", data);
      this.setState({ contents: data, loading: false });
    });
  }

  saveHandler = (editorContext, content) => {
    return Promise.resolve();
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    console.log(this.state.contents);

    return (
      <div className={this.props.className}>
        <Dante
          content={this.state.contents}
          data_storage={{
            url: `${API_ENDPOINT}/texteditor`,
            method: "POST",
            interval: 500,
            withCredentials: false,
            crossDomain: true,
            headers: {},
            save_handler: (editorContext, content) => {
              Axios.post(
                `${API_ENDPOINT}/texteditor`,
                {
                  id: 1,
                  contents: JSON.stringify(content)
                },
                {}
              ).then(({ data }) => message.success("변경사항 저장", 1));
            }
          }}
        />
      </div>
    );
  }
}

const StyledTextEditor = styled(TextEditor)`
  display: block;
  position: relative;
  padding: 100px;
  z-index: 5000;
  overflow: scroll;
`;

const Wrapper = () => {
  return <StyledTextEditor />;
};

export { Wrapper as TextEditor };

// export { styledTextEditor as TextEditor };
