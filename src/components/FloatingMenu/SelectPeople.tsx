import * as React from "react";
import { Transfer, Spin } from "antd";
import { Styled } from "interface/global";
import { styled } from "theme";
import { GET_PROJECT } from "components/FloatingMenu/gql";
import { executePromise } from "helper/apolloConfig";
import { User } from "interface/User";
import { ProjectState } from "state/projectState";
import { inject } from "mobx-react";

interface Props extends Styled {
  onChange?: (updatedValue: any) => void;
  projectState?: ProjectState;
}
interface State {
  loading: boolean;
  data: { key: number; userId: number; title: string; chosen: boolean }[];
  targetKeys: string[];
}
@inject("projectState")
class SelectPeople extends React.Component<Props, State> {
  state = {
    loading: false,
    data: [],
    targetKeys: []
  };

  componentDidMount() {
    this.getPeopleInProject(this.props.projectState.currentProjectId);
  }

  getPeopleInProject = (projectId: number) => {
    const operation = {
      query: GET_PROJECT,
      variables: {
        projectId
      }
    };
    this.setState({ loading: true });
    executePromise(operation).then(({ data: { getProject } }) => {
      const { gridLayouts } = getProject;
      const data = gridLayouts.map(layout => layout.user).map((user: User, index) => ({
        key: index,
        userId: user.id,
        title: `${user.name} (${user.email})`,
        chosen: false
      }));
      this.setState({ data, loading: false });
    });
  };

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys });

    const { data } = this.state;
    const resultData = targetKeys.map((key) => data[key]);
    this.props.onChange(resultData);
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Transfer
          className={this.props.className}
          dataSource={this.state.data}
          // showSearch={true}
          filterOption={this.filterOption}
          operations={["to Add", "to Remove"]}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={(item) => item.title}
          notFoundContent="비었습니다."
        />
      </Spin>
    );
  }
}

const styledSelectPeople = styled(SelectPeople)`
  .ant-transfer-operation .ant-btn.ant-btn-primary.ant-btn-sm {
    width: 100%;
    text-align: left;
  }
`;

export { styledSelectPeople as SelectPeople };
