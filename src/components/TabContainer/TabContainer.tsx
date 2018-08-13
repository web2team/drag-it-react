import * as React from "react";
import { Styled } from "interface/global";
import { Tabs, Modal, Button, Icon } from "antd";
import { styled } from "theme";
import { EditableForm } from "./EditableForm";
import { UPDATE_GRID_NAME, GET_GRIDS, NEW_GRID, DELETE_GRID } from "./gql";
import { excute } from "helper/apolloConfig";
import { GridLayout } from "components/GridLayout";
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

interface Pane {
  id: number;
  name: string;
}

interface Props extends Styled {
  userId: number;
}
interface State {
  panes: Pane[];
  activeId: number;
}
class TabContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeId: 0,
      panes: []
    };
  }
  componentDidMount() {
    const operation = {
      query: GET_GRIDS,
      variables: {
        userId: this.props.userId
      }
    };
    excute(operation).then(({ data: { getGrids } }) => {
      const panes = getGrids.map((pane) => ({ ...pane }));
      this.setState({ panes, activeId: panes[0].id });
    });
  }

  onChange = (activeId) => {
    this.setState({ activeId });
  };

  onEdit = (targetId, action) => {
    console.log(targetId);
    this[action](targetId);
  };

  add = () => {
    const operation = {
      query: NEW_GRID,
      variables: {
        name: "newTab",
        userId: this.props.userId
      }
    };

    excute(operation).then(({ data: { newGrid } }) =>
      this.setState({ panes: [...this.state.panes, ...newGrid] })
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
        query: DELETE_GRID,
        variables: {
          gridId: targetId
        }
      };
      excute(operation);
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

  render() {
    return (
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
              <EditableForm
                request={{
                  query: UPDATE_GRID_NAME,
                  variables: {
                    gridId: pane.id
                  }
                }}
                editable={true}
                data={pane.name}
                dataFieldName="name"
              />
            }
            key={pane.id}
            closable={true}
          >
            <GridLayout gridId={pane.id} userId={this.props.userId} />
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

const styledTabContainer = styled(TabContainer)`
  .ant-tabs-tab {
    padding: 1px 16px !important;
  }
`;

export { styledTabContainer as TabContainer };
