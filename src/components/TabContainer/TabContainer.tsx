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
import { NotificationCenter } from "components/NotificationCenter";
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

interface Pane {
  id: number;
  name: string;
}

interface Props extends Styled {
  userId: number;
  gridState?: GridState;
}
interface State {
  panes: Pane[];
  activeId: number;
  modalVisible: boolean;
}
@inject("gridState")
class TabContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeId: 0,
      panes: [],
      modalVisible: false
    };
  }
  componentDidMount() {
    const operation = {
      query: GET_GRID_LAYOUTS,
      variables: {
        userId: this.props.userId
      }
    };
    executePromise(operation).then(({ data: { getGridLayouts } }) => {
      console.log(getGridLayouts);

      const panes = getGridLayouts.map((pane) => ({ ...pane }));
      this.setState({ panes, activeId: panes[0].id });
    });
  }

  onChange = (activeId) => {
    this.setState({ activeId });
    this.props.gridState.currentGridLayoutId = activeId;
  };

  onEdit = (targetId, action) => {
    console.log(targetId);
    this[action](targetId);
  };

  add = () => {
    const operation = {
      query: NEW_GRID_LAYOUT,
      variables: {
        name: "newTab",
        userId: this.props.userId
      }
    };

    executePromise(operation).then(({ data: { newGridLayout } }) =>
      this.setState({ panes: [...this.state.panes, ...newGridLayout] })
    );
  };

  remove = (targetId: number) => {
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

    confirm({
      title: "Are you sure delete this task?",
      content: "모든 내용이 지워집니다. 계속하시겠습니까?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk() {
        doRemove(targetId);

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
        <NotificationCenter userId={this.props.userId} />
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
          {this.state.panes.map((pane) => (
            <TabPane
              tab={
                <span>
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
              key={pane.id}
              closable={true}
            >
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
