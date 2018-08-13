import * as React from "react";
import { Styled } from "interface/global";
import { Tabs } from "antd";
import { styled } from "theme";
import { EditableForm } from "components/GridTab/EditableForm";
import {
  UPDATE_GRID_NAME,
  GET_GRIDS,
  NEW_GRID,
  DELETE_GRID
} from "components/GridTab/gql";
import { excute } from "helper/apolloConfig";
const TabPane = Tabs.TabPane;

interface Pane {
  id: number;
  name: string;
}

interface Props extends Styled {}
interface State {
  panes: Pane[];
  activeId: number;
}
class GridTab extends React.Component<Props, State> {
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
        userId: 17
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
    this[action](targetId);
  };

  add = () => {
    const operation = {
      query: NEW_GRID,
      variables: {
        name: "newTab",
        userId: 17
      }
    };

    excute(operation).then(({ data: { newGrid } }) =>
      this.setState({ panes: [...this.state.panes, ...newGrid] })
    );
  };

  remove = (targetId) => {
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
                    grid_id: pane.id
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
            {"contenxt"}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

const styledGridTab = styled(GridTab)`
  .ant-tabs-tab {
    padding: 1px 16px !important;
  }
`;

export { styledGridTab as GridTab };
