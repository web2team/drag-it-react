import * as React from "react";
import { Styled } from "interface/global";
import { Tabs } from "antd";
import { styled } from "theme";
import { EditableForm } from "components/GridTab/EditableForm";
import { UPDATE_GRID_NAME } from "components/GridTab/gql";
const TabPane = Tabs.TabPane;

interface Props extends Styled {}
interface State {
  panes: any;
  activeKey: any;
}
class GridTab extends React.Component<Props, State> {
  newTabIndex: number;

  constructor(props: Props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {
        title: "Tab 1",
        content: "Content of Tab 1",
        key: "1",
        closable: false
      },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    console.log(targetKey, action);
    this[action](targetKey);
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }

    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <Tabs
        onChange={this.onChange}
        onEdit={this.onEdit}
        activeKey={this.state.activeKey}
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
                    grid_id: 1
                  }
                }}
                editable={true}
                data={"123"}
                dataFieldName="name"
              />
            }
            key={pane.key}
            closable={pane.closable}
          >
            {pane.content}
            <EditableForm editable={true} data={"12345"} />
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

const styledGridTab = styled(GridTab)``;

export { styledGridTab as GridTab };
