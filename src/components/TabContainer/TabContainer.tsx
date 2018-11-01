import * as React from "react";
import { Styled } from "interface/global";
import { Tabs, Modal, Button, Icon } from "antd";
import { styled } from "theme";
import { EditableForm } from "utility/EditableForm";
import {
  UPDATE_GRID_LAYOUT_NAME,
  GET_GRID_LAYOUTS,
  NEW_GRID_LAYOUT,
  DELETE_GRID_LAYOUT
} from "./gql";
import { executePromise } from "helper/apolloConfig";
import { GridLayout } from "components/GridLayout";
import { inject } from "mobx-react";
import { GridState } from "state/gridState";
import { ProjectState } from "state/projectState";
import { NotificationCenter } from "components/NotificationCenter";
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

// 각 프로젝트를 구분하는 인터페이스
interface Pane {
  id: number;
  name: string;
  project: any;
}

// styled-component 상속한 property
// 각 Grid와 해당 user의 상태를 들고있음
interface Props extends Styled {
  userId: number;
  gridState?: GridState;
  projectState?: ProjectState;
}

// 컴포넌트가 유지해야 할 상태정보
// 현재 클릭된 (렌더링하는) paneId: activeId
// panes : 탭(프로젝트)의 리스트
// modalvisible : 프로젝트 정보 modal visibility
interface State {
  panes: Pane[];
  activeId: number;
  modalVisible: boolean;
}

// mobx gridState class instance 상태 주입
@inject("gridState")
@inject("projectState")
class TabContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeId: 0,
      panes: [],
      modalVisible: false
    };
  }
  // 컴포넌트가 HTML DOM에 그려진 직후 실행되는 상태주기함수
  // GraphQL을 사용해서 서버와 통신한 뒤에 DB에 저장된
  // 초기 탭의 정보를 가져옴
  componentDidMount() {
    const operation = {
      query: GET_GRID_LAYOUTS,
      variables: {
        userId: this.props.userId
      }
    };
    // GraphQL AJAX 콜백 부분
    executePromise(operation).then(({ data: { getGridLayouts } }) => {
      console.log(getGridLayouts);

      const panes = getGridLayouts.map((pane) => ({ ...pane }));
      // 받아온 상태를 현재 컴포넌트에 설정.
      // 처음 접속했을 때 보게 되는 화면은 첫번째 화면 (activeID : panes[0].id)
      this.setState({ panes, activeId: panes[0].id });
    });
  }

  // 각 탭별 이동 핸들러
  onChange = (activeId) => {
    this.setState({ activeId });
    this.props.gridState.currentGridLayoutId = activeId;

    const projectId = this.state.panes.find((pane) => pane.id === activeId)
      .project.id;
    this.props.projectState.currentProjectId = projectId;
  };

  // +와 X에 해당하는 동작 구분 함수
  onEdit = (targetId, action) => {
    console.log(targetId);
    this[action](targetId);
  };

  // 새로운 탭 추가 (우측 끝 +버튼)
  // 서버와 GraphQL 통신 후 새로운 panes을 받아옴
  add = () => {
    const operation = {
      query: NEW_GRID_LAYOUT,
      variables: {
        name: "새 탭",
        userId: this.props.userId
      }
    };

    // GraphQL AJAX
    executePromise(operation).then(({ data: { newGridLayout } }) =>
      this.setState({ panes: [...this.state.panes, ...newGridLayout] })
    );
  };

  // 기존에 있는 프로젝트(탭)을 제거하는 핸들러
  remove = (targetId: number) => {
    // 실제로 삭제하는 AJAX 수행 메서드
    const doRemove = (targetId: number) => {
      let activeId = this.state.activeId;
      let lastIndex;
      this.state.panes.forEach((pane, index) => {
        if (pane.id === targetId) {
          lastIndex = index - 1;
        }
      });
      const panes = this.state.panes.filter((pane) => pane.id !== targetId);
      if (lastIndex >= 0 && activeId === targetId) {
        activeId = panes[lastIndex].id;
      }
      this.setState({ panes, activeId });

      const operation = {
        query: DELETE_GRID_LAYOUT,
        variables: {
          gridLayoutId: targetId
        }
      };
      executePromise(operation);
    };

    // 사용자 확인을 위한 modal 띄우기
    confirm({
      title: "Are you sure delete this task?",
      content: "모든 내용이 지워집니다. 계속하시겠습니까?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk() {
        doRemove(targetId);

        // GraphQL 응답시간을 고려하여 1초 이후 modal 해제
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 1000)
        );
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  showModal = () => {
    this.setState((prev) =>
      this.setState({
        modalVisible: !prev.modalVisible
      })
    );
  };

  render() {
    return (
      <div>
        {/* 프로젝트 정보를 위한 modal 선언 */}
        <Modal
          visible={this.state.modalVisible}
          maskClosable={true}
          centered={true}
          footer={null}
          closable={true}
          onOk={this.showModal}
          onCancel={this.showModal}
        >
          abc
        </Modal>
        {/* 탭별로 선언되는 알람 구현을 위한 인스턴스 */}
        <NotificationCenter userId={this.props.userId} />
        {/* 실제 탭 렌더링 부분 */}
        <Tabs
          onChange={this.onChange}
          onEdit={this.onEdit}
          activeKey={this.state.activeId + ""}
          type="editable-card"
          tabBarGutter={10}
          tabBarExtraContent={"extra"}
          tabPosition="top"
          className={this.props.className}
        >
          {/* 현재 컴포넌트 상태에 존재하는 각 panes을 매핑하여 */}
          {/* TapPane으로 구분하여 정보 주입 */}
          {this.state.panes.map((pane) => (
            <TabPane
              tab={
                <span>
                  {/* 탭 이름을 변경할 수 있음 */}
                  {/* 변경은 실제로 GraphQL AJAX로 이루어짐 */}
                  {/* 쿼리와 변수를 설졍해주는 부분 (request obj) */}
                  <EditableForm
                    request={{
                      query: UPDATE_GRID_LAYOUT_NAME,
                      variables: {
                        gridLayoutId: pane.id
                      }
                    }}
                    editable={true}
                    data={pane.name}
                    dataFieldName="name"
                  />
                  {/* 탭 우측에 + 버튼 CSS와 HTML 선언 */}
                  <span
                    onClick={this.showModal}
                    style={{
                      padding: 0,
                      position: "relative",
                      right: -10,
                      top: -0.3,
                      color: "gray"
                    }}
                  >
                    <Icon style={{ transform: "scale(0.95)" }} type="plus" />
                  </span>
                </span>
              }
              key={"" + pane.id}
              closable={true}
            >
              {/* 각각의 탭 안에 내용을 선언 */}
              {/* GridLayout클래스로 렌러딩 위임 */}
              <GridLayout gridLayoutId={pane.id} userId={this.props.userId} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

const styledTabContainer = styled(TabContainer)`
  .ant-tabs-tab {
    padding: 1px 25px !important;
  }
`;

export { styledTabContainer as TabContainer };
