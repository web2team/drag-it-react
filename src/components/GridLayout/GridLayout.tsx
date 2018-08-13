import * as React from "react";
import { styled } from "theme";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Styled } from "interface/global";
import { DRAG_HANDLER_COLOR, BORDER_COLOR } from "theme/color";
import { DRAG_HANDLER_HEIGHT } from "theme/constant";
import { GridDraggableLayout, GridData } from "interface/Grid";
import { getComponent } from "./componentResolver";
import { excute } from "helper/apolloConfig";
import _ from "lodash";
import { GET_GRID_DRAGGABLE_LAYOUT, CHANGE_LAYOUT } from "./gql";
import { FloatingMenu } from "./FloatingMenu";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

interface Props extends Styled {
  gridId: number;
  userId: number;
}
interface State {
  gridDraggableLayout: GridDraggableLayout[];
}
class GridLayout extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      gridDraggableLayout: []
    };
  }

  componentDidMount() {
    const operation = {
      query: GET_GRID_DRAGGABLE_LAYOUT,
      variables: {
        gridId: this.props.gridId
      }
    };
    excute(operation).then(({ data: { getGridDraggableLayout } }) => {
      this.setState({ gridDraggableLayout: getGridDraggableLayout });
    });
  }

  onLayoutChange = (newGridDatas: any) => {
    newGridDatas.map((newGridData) => {
      const temp = _.omit(newGridData, ["i", "moved", "static"]);
      const operation = {
        query: CHANGE_LAYOUT,
        variables: {
          gridId: this.props.gridId,
          gridDraggablePropsId: newGridData.i,
          newGridData: { ...temp, isStatic: newGridData.static }
        }
      };

      excute(operation);
    });
  };

  withDraggable = ({
    id,
    gridComponentType,
    gridComponentProps,
    gridData: { key, x, y, w, h }
  }: GridDraggableLayout) => {
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
          <Component {...gridComponentProps} {...this.props} />
        </div>
      </div>
    );
  };

  render() {
    const breakpoints = {
      lg: 1200,
      md: 1000,
      sm: 800,
      xs: 600,
      xxs: 0
    };
    const cols = { lg: 30, md: 25, sm: 20, xs: 15, xxs: 10 };

    return (
      <div className={this.props.className}>
        <FloatingMenu gridId={this.props.gridId} />
        <ResponsiveReactGridLayout
          breakpoints={breakpoints}
          cols={cols}
          onLayoutChange={this.onLayoutChange}
          rowHeight={30}
          draggableHandle={`.${DRAG_HANDLER_CLASSNAME}`}
        >
          {this.state.gridDraggableLayout.map(this.withDraggable)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const styledGridLayout = styled(GridLayout)`
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

export { styledGridLayout as GridLayout };
