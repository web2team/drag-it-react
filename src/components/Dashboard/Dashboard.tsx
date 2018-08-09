import * as React from "react";
import { styled } from "theme";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Styled } from "interface/global";
import { Chatting } from "components/Chatting/Chatting";
import { DRAG_HANDLER_COLOR } from "theme/color";
import { DRAG_HANDLER_HEIGHT } from "theme/constant";

const ReactGridLayout = WidthProvider(RGL);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

interface DraggableProps {
  key: string;
  x: number;
  y: number;
  w: number;
  h: number;
  draggableHandle: string;
}
interface Props extends Styled {}
class Dashboard extends React.Component<Props, any> {
  onLayoutChange = (p) => {
    console.log(p);
  };

  withDraggable = (
    Component,
    { key, x, y, w, h, draggableHandle }: DraggableProps
  ) => {
    return (
      <div
        key={key}
        data-grid={{
          x,
          y,
          w,
          h,
          draggableHandle: `.${draggableHandle}`
        }}
        style={{
          border: "1px solid #e8e8e8",
          display: "flex",
          flexFlow: "column"
        }}
      >
        <div
          className={draggableHandle}
          style={{
            width: "100%",
            height: DRAG_HANDLER_HEIGHT,
            background: DRAG_HANDLER_COLOR,
            flex: "0 0 20px"
          }}
        />
        <span
          style={{ position: "absolute", cursor: "pointer", top: 0, right: 2 }}
        >
          X
        </span>
        {Component}
      </div>
    );
  };

  render() {
    return (
      <ReactGridLayout
        className={this.props.className}
        onLayoutChange={this.onLayoutChange}
        rowHeight={30}
        draggableHandle={`.${DRAG_HANDLER_CLASSNAME}`}
      >
        {this.withDraggable(<Chatting />, {
          key: "12",
          x: 0,
          y: 1,
          w: 8,
          h: 10,
          draggableHandle: DRAG_HANDLER_CLASSNAME
        })}
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
