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
import { Icon, Popconfirm, message, Spin } from "antd";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DRAG_HANDLER_CLASSNAME = "drag-handler";

// GridLayout : Grid 컴포넌트를 모두 담는 Container
// GridLayoutItem : GridLayout에 포함되는 각각의 엘리먼트 (실제 기능 컴포넌트)
interface State {
  loading: boolean;
  gridLayoutItems: GridLayoutItem[];
}
class GridLayout extends React.Component<GridLayoutProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      gridLayoutItems: []
    };
  }

  // Mount가 완료 된 후 초기 GridLayoutItem 가져오기
  componentDidMount() {
    this.fetchItems();
    // 새로운 아이템 추가시에
    // 새로고침 없이 동적으로 적용시키기 위한 Subscribe 부분
    this.subscribeItems();
  }

  // 실제 Fetch 부분 메서드
  fetchItems = () => {
    const operation = {
      query: GET_GRID_LAYOUT_ITEMS,
      variables: {
        gridLayoutId: this.props.gridLayoutId
      }
    };
    this.setState({ loading: true });
    executePromise(operation).then(({ data: { getGridLayoutItems } }) => {
      this.setState({ gridLayoutItems: getGridLayoutItems });
      setTimeout(() => this.setState({ loading: false }), 1000);
    });
  };

  // 다음 아이템이 stream으로 넘어왔을 때
  // 처리해주는 부분을 콜백으로 작성
  subscribeItems = () => {
    const operation = {
      query: LINK_GRID_LAYOUT_ITEM,
      variables: {
        gridLayoutId: this.props.gridLayoutId
      }
    };
    executePromiseSubscribe(operation, {
      // 다음 GridLayoutItem 에 대해서 기존의 상태에 append하여 적용
      next: ({ data: { linkGridLayoutItem } }) => {
        this.setState({
          gridLayoutItems: [...this.state.gridLayoutItems, linkGridLayoutItem]
        });
      }
    });
  };

  // 사용자가 컴포넌트를 드래그 혹은 리사이징 했을 때
  // Grid에서 처리해주는 핸들러
  onLayoutChange = (gridLayoutItemPositions: any) => {
    gridLayoutItemPositions.map((gridLayoutItemPosition) => {
      // i, moved, static property는
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

      // 단순히 데이터만 전송하므로 콜백은 필요없음.
      executePromise(operation);
    });
  };

  // 삭제도 변경과 마찬가지.
  // 그러나 응답 피드백은 사용자에게 주어야함
  onDeleteLayoutItem = (gridLayoutItemId: number) => {
    const operation = {
      query: DELETE_GRID_LAYOUT_ITEM,
      variables: {
        gridLayoutItemId
      }
    };

    const loading = message.loading("삭제중 입니다...");
    executePromise(operation)
      .then(() => {
        this.setState({
          gridLayoutItems: this.state.gridLayoutItems.filter(
            (item) => item.id !== gridLayoutItemId
          )
        });
        loading();
        message.success("성공!", 1000);
      })
      .catch(() => console.error("error on delete layout item"));
  };

  // 새로운 Grid Item 을 만드는 팩토리함수
  // react dnd 를 위한 css 클래스네임을 추가하고, 추가 삭제 핸들러를 추가등록
  // getComponent로 타입에 맞는 gridLayoutItem을 resolve 지정해준다.
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
    // layout 구분점 (픽셀단위)
    const breakpoints = {
      lg: 1200,
      md: 1000,
      sm: 800,
      xs: 600,
      xxs: 0
    };
    const cols = { lg: 30, md: 25, sm: 20, xs: 15, xxs: 10 };

    return (
      <Spin spinning={this.state.loading} tip="loading...">
        <div className={this.props.className}>
          {/* 우측 하단에 사용자 floating 메뉴  */}
          {this.state.loading ? null : (
            <FloatingMenu gridId={this.props.gridLayoutId} />
          )}
          {/* Layout Containe */}
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
      </Spin>
    );
  }
}

const styledGridLayout = styled(GridLayout)`
  /* min-height: 50vh; */

  .react-resizable-handle {
    z-index: 1000;
  }

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

      position: relative;
      overflow: auto;
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
