import * as React from "react";
import { styled } from "theme";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Styled } from "interface/global";
import { Chatting } from "components/Chatting/Chatting";
import { DRAG_HANDLER_COLOR, BORDER_COLOR } from "theme/color";
import { DRAG_HANDLER_HEIGHT } from "theme/constant";
import { GridDraggableProps, GridComponentType } from "interface/Grid";
import { getComponent } from "./componentResolver";

const ReactGridLayout = WidthProvider(RGL);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

interface Props extends Styled {}
interface State {
  gridData: GridDraggableProps[];
}
class Dashboard extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      gridData: [
        {
          gridData: {
            key: "12",
            x: 0,
            y: 1,
            w: 4,
            h: 10,
            draggableHandle: DRAG_HANDLER_CLASSNAME
          },
          componentType: GridComponentType.CHATTING,
          componentProps: {
            chat_thread_id: 1
          }
        },
        {
          gridData: {
            key: "13",
            x: 4,
            y: 4,
            w: 4,
            h: 12,
            draggableHandle: DRAG_HANDLER_CLASSNAME
          },
          componentType: GridComponentType.CHATTING,
          componentProps: {
            chat_thread_id: 2
          }
        },
        {
          gridData: {
            key: "14",
            x: 4,
            y: 10,
            w: 4,
            h: 12,
            draggableHandle: DRAG_HANDLER_CLASSNAME
          },
          componentType: GridComponentType.CHATTING,
          componentProps: {
            chat_thread_id: 3
          }
        }
      ]
    };
  }

  onLayoutChange = (p) => {
    console.log(p);
  };

  withDraggable = ({
    componentType,
    componentProps,
    gridData: { key, x, y, w, h, draggableHandle = "" }
  }: GridDraggableProps) => {
    const Component = getComponent(componentType);

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
        className="with-draggable"
      >
        <div className={`${draggableHandle} top-bar`} />
        <span className="top-button-X">X</span>
        <div className="component">
          <Component {...componentProps} />
        </div>
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
        {this.state.gridData.map(this.withDraggable)}
      </ReactGridLayout>
    );
  }
}

const styledDashBoard = styled(Dashboard)`
  .with-draggable {
    border: 1px solid ${BORDER_COLOR};
    display: flex;
    flex-flow: column;

    .component {
      display: flex;
      flex-flow: column;
      flex: auto;
    }
  }

  .top-bar {
    width: 100%;
    height: ${DRAG_HANDLER_HEIGHT};
    background: ${DRAG_HANDLER_COLOR};
    flex: 0 0 auto;
    cursor: move;
  }

  .top-button-X {
    position: absolute;
    top: 0;
    right: 2;
    cursor: pointer;
  }
`;

export { styledDashBoard as Dashboard };
