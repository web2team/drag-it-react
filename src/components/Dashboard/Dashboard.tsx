import * as React from "react";
import { styled } from "theme";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Styled } from "interface/global";
import { Chatting } from "components/Chatting";

const ReactGridLayout = WidthProvider(RGL);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

interface Props extends Styled {}
class Dashboard extends React.Component<Props, any> {
  onLayoutChange = (p) => {
    console.log(p);
  };

  render() {
    return (
      <ReactGridLayout
        className={this.props.className}
        onLayoutChange={this.onLayoutChange}
        rowHeight={30}
        draggableHandle={`.${DRAG_HANDLER_CLASSNAME}`}
      >
        <div
          key="3"
          data-grid={{
            x: 0,
            y: 0,
            w: 10,
            h: 10,
            draggableHandle: `.${DRAG_HANDLER_CLASSNAME}`
          }}
        >
          <Chatting />
        </div>
        <Chatting
          gridProps={{
            key: 123,
            x: 1,
            y: 1,
            w: 4,
            h: 3
          }}
        />
        <div
          key="4"
          data-grid={{
            x: 8,
            y: 4,
            w: 2,
            h: 4,
            draggableHandle: `.${DRAG_HANDLER_CLASSNAME}`
          }}
        >
          <span className="text">
            4 - Draggable with Handles
            <hr />
            <hr />
            <span className={DRAG_HANDLER_CLASSNAME}>[DRAG HERE]</span>
            <hr />
            <hr />
          </span>
        </div>
      </ReactGridLayout>
    );
  }
}

const styledDashBoard = styled(Dashboard)``;

export { styledDashBoard as Dashboard };
