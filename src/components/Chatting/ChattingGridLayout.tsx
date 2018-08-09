import * as React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { styled } from "theme";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Chatting } from "components/Chatting/Chatting";

const ReactGridLayout = WidthProvider(RGL);
const DRAG_HANDLER_CLASSNAME = ".drag-handler";

class ChattingGridLayout extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }

  onLayoutChange = (layout: any) => {
    console.log(layout);
  };

  render() {
    return (
      <ReactGridLayout
        className={this.props.className}
        onLayoutChange={this.onLayoutChange}
        rowHeight={30}
        draggableHandle={`".react-grid-dragHandleExample"`}
      >
        <Chatting
          gridProps={{
            x: 10,
            y: 10,
            w: 2,
            h: 2,
            s: false
          }}
        />
        <div key="1" data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
          <span className="text">1</span>
        </div>
        <div key="2" data-grid={{ x: 2, y: 0, w: 4, h: 3, static: true }}>
          <span className="text">2 - Static</span>
        </div>
        <div key="3" data-grid={{ x: 6, y: 0, w: 2, h: 3 }}>
          <span className="text">3</span>
        </div>
        <div
          key="4"
          data-grid={{
            x: 8,
            y: 0,
            w: 4,
            h: 3,
            draggableHandle: ".react-grid-dragHandleExample"
          }}
        >
          <span className="text">
            4 - Draggable with Handle
            <hr />
            <hr />
            <span className="react-grid-dragHandleExample">[DRAG HERE]</span>
            <hr />
            <hr />
          </span>
        </div>
      </ReactGridLayout>
    );
  }
}

const styledChattingGridLayout = styled(ChattingGridLayout)`
  background: #eee;

  body {
    background: white;
    padding: 20px;
    overflow: scroll;
  }
  #content {
    width: 100%;
  }
`;

export { styledChattingGridLayout as ChattingGridLayout };
