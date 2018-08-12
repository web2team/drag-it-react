import * as React from "react";
import { Styled } from "interface/global";
import { Tabs } from "antd";
import { styled } from "theme";
import { EditableForm } from "components/GridTab/EditableForm";
import { UPDATE_GRID_NAME, GET_GRIDS } from "components/GridTab/gql";
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
  newTabIndex: number;

  constructor(props: Props) {
    super(props);
    this.newTabIndex = 0;

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
      this.newTabIndex = panes.length;
    });
  }

  onChange = (activeId) => {
    this.setState({ activeId });
  };

  onEdit = (targetId, action) => {
    this[action](targetId);
  };

  add = () => {
    const panes = this.state.panes;
    const activeId = this.newTabIndex++;

    panes.push({ name: "New Tab", id: activeId });
    this.setState({ panes, activeId });
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

const styledGridTab = styled(GridTab)``;

export { styledGridTab as GridTab };
