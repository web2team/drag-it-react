import * as React from "react";
import { styled } from "theme";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import { DRAG_HANDLER_COLOR, BORDER_COLOR } from "theme/color";
import { DRAG_HANDLER_HEIGHT, GRID_ITEM_BORDER_RADIUS } from "theme/constant";
import {
  GridLayoutItem,
  GridLayoutItemPosition,
  GridLayoutProps
} from "interface/GridLayout";
import { getComponent } from "./componentResolver";
import { executePromise, executePromiseSubscribe } from "helper/apolloConfig";
import _ from "lodash";
import {
  GET_GRID_LAYOUT_ITEMS,
  UPDATE_GRID_LAYOUT,
  DELETE_GRID_LAYOUT_ITEM,
  LINK_GRID_LAYOUT_ITEM
} from "./gql";
import { FloatingMenu } from "components/FloatingMenu/FloatingMenu";
import { Icon, Popconfirm } from "antd";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

interface State {
  gridLayoutItems: GridLayoutItem[];
}
class GridLayout extends React.Component<GridLayoutProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      gridLayoutItems: []
    };
  }

  componentDidMount() {
    this.fetchItems();
    this.subscribeItems();
  }

  fetchItems = () => {
    const operation = {
      query: GET_GRID_LAYOUT_ITEMS,
      variables: {
        gridLayoutId: this.props.gridLayoutId
      }
    };
    executePromise(operation).then(({ data: { getGridLayoutItems } }) => {
      console.log(getGridLayoutItems);
      this.setState({ gridLayoutItems: getGridLayoutItems });
    });
  };

  subscribeItems = () => {
    const operation = {
      query: LINK_GRID_LAYOUT_ITEM,
      variables: {
        gridLayoutId: this.props.gridLayoutId
      }
    };
    executePromiseSubscribe(operation, {
      next: ({ data: { linkGridLayoutItem } }) => {
        console.log(linkGridLayoutItem);
        this.setState({
          gridLayoutItems: [...this.state.gridLayoutItems, linkGridLayoutItem]
        });
      }
    });
  };

  onLayoutChange = (gridLayoutItemPositions: any) => {
    gridLayoutItemPositions.map((gridLayoutItemPosition) => {
      const tempPosition = _.omit(gridLayoutItemPosition, [
        "i",
        "moved",
        "static"
      ]);

      const operation = {
        query: UPDATE_GRID_LAYOUT,
        variables: {
          gridLayoutId: this.props.gridLayoutId,
          gridLayoutItemId: gridLayoutItemPosition.i,
          gridLayoutItemPosition: {
            ...tempPosition,
            isStatic: gridLayoutItemPosition.static
          }
        }
      };

      executePromise(operation);
    });
  };

  onDeleteLayoutItem = (gridLayoutItemId: number) => {
    const operation = {
      query: DELETE_GRID_LAYOUT_ITEM,
      variables: {
        gridLayoutItemId
      }
    };

    executePromise(operation)
      .then(() => {
        this.setState({
          gridLayoutItems: this.state.gridLayoutItems.filter(
            (item) => item.id !== gridLayoutItemId
          )
        });
      })
      .catch(() => console.error("error on delete layout item"));
  };

  createGridLayoutItem = ({
    id,
    gridLayoutItemProps,
    gridLayoutItemPosition: { key, x, y, w, h }
  }: GridLayoutItem) => {
    const Component = getComponent(gridLayoutItemProps.type);

    return (
      <div
        key={id}
        data-itemid={id}
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
        <Popconfirm
          title="are you sure to delete?"
          onConfirm={() => this.onDeleteLayoutItem(id)}
        >
          <span className="top-button-X">
            <Icon type="close" />
          </span>
        </Popconfirm>
        <div className="component">
          <Component {...gridLayoutItemProps} {...this.props} />
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
        <FloatingMenu gridId={this.props.gridLayoutId} />
        <ResponsiveReactGridLayout
          breakpoints={breakpoints}
          cols={cols}
          onLayoutChange={this.onLayoutChange}
          rowHeight={30}
          draggableHandle={`.${DRAG_HANDLER_CLASSNAME}`}
        >
          {this.state.gridLayoutItems.map(this.createGridLayoutItem)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const styledGridLayout = styled(GridLayout)`
  .with-draggable {
    border: 1px solid ${BORDER_COLOR};
    border-radius: ${GRID_ITEM_BORDER_RADIUS}px;
    overflow: hidden;

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
    height: ${DRAG_HANDLER_HEIGHT}px;
    background: ${DRAG_HANDLER_COLOR};
    flex: 0 0 auto;
    cursor: move;
  }

  .top-button-X {
    position: absolute;
    top: 3.3px;
    right: 3px;
    cursor: pointer;

    .anticon.anticon-close {
      display: block;
    }
  }

  .react-resizable-handle {
    background: 0 !important;
    &::after {
      border: 0 !important;
    }
  }
  .react-grid-item.react-grid-placeholder.cssTransforms {
    border-radius: ${GRID_ITEM_BORDER_RADIUS}px !important;
  }
`;

export { styledGridLayout as GridLayout };
