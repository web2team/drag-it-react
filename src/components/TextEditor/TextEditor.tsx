import * as React from "react";

import "./TextEditor.less";
import Dante from "Dante2";

import styled from "theme";

class TextEditor extends React.Component<any, any> {
  options: any;

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}>
        <Dante />
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
