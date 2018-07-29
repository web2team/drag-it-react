import * as React from "react";
import styled from "theme";

class FrontPage extends React.Component {
  render() {
    return <div>this is front page</div>;
  }
}

const styledFrontPage = styled(FrontPage)``;

export { styledFrontPage as FrontPage };
