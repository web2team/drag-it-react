import * as React from "react";
import { styled } from "theme";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Styled } from "interface/global";
import { DRAG_HANDLER_COLOR, BORDER_COLOR } from "theme/color";
import { DRAG_HANDLER_HEIGHT } from "theme/constant";
import { GridDraggableProps } from "interface/Grid";
import { getComponent } from "./componentResolver";
import { excute } from "helper/apolloConfig";
import _ from "lodash";
import { GET_GRID_DRAGGABLE_PROPS, CHANGE_LAYOUT } from "./gql";
const ReactGridLayout = WidthProvider(RGL);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

interface Props extends Styled {}
interface State {
  gridDraggableProps: GridDraggableProps[];
}
class Dashboard extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      gridDraggableProps: []
    };
  }

  componentDidMount() {
    const operation = {
      query: GET_GRID_DRAGGABLE_PROPS,
      variables: {
        grid_id: 1
      }
    };
    excute(operation).then(({ data: { getGridDraggableProps } }) =>
      this.setState({ gridDraggableProps: getGridDraggableProps })
    );
  }

  onLayoutChange = (newGridData, propsid: number) => {
    console.log(propsid);
    const temp = _.omit(newGridData, ["i", "moved", "static"]);
    const operation = {
      query: CHANGE_LAYOUT,
      variables: {
        grid_id: 1,
        gridDraggableProps_id: propsid,
        newGridData: { ...temp, isStatic: newGridData.static }
      }
    };

    excute(operation);
  };

  withDraggable = ({
    id,
    gridComponentType,
    gridComponentProps,
    gridData: { key, x, y, w, h }
  }: GridDraggableProps) => {
    const Component = getComponent(gridComponentType);

    return (
      <div
        key={key}
        data-propsid={id}
        data-grid={{
          x,
          y,
          w,
          h,
          draggableHandle: `.${DRAG_HANDLER_CLASSNAME}`
        }}
        className="with-draggable"
      >
        <div className={`${DRAG_HANDLER_CLASSNAME} top-bar`} />
        <span className="top-button-X">X</span>
        <div className="component">
          <Component {...gridComponentProps} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <ReactGridLayout
        className={this.props.className}
        onDragStop={(_1, _2, newGridData, _3, _4, element) =>
          this.onLayoutChange(newGridData, +element.dataset.propsid)
        }
        onResizeStop={(_1, _2, newGridData, _3, _4, element) => {
          this.onLayoutChange(newGridData, +element.parentElement.dataset.propsid);
        }}
        cols={30}
        rowHeight={30}
        draggableHandle={`.${DRAG_HANDLER_CLASSNAME}`}
      >
        {this.state.gridDraggableProps.map(this.withDraggable)}
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
