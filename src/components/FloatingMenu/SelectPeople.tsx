import * as React from "react";
import { Transfer } from "antd";
import { Styled } from "interface/global";
import { styled } from "theme";
import { GET_PROJECT } from "components/FloatingMenu/gql";
import { excute } from "helper/apolloConfig";
import { User } from "interface/User";
import { ProjectState } from "state/projectState";
import { inject } from "mobx-react";

interface Props extends Styled {
  onChange?: (updatedValue: any) => void;
  projectState?: ProjectState;
}
@inject("projectState")
class SelectPeople extends React.Component<Props, any> {
  state = {
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

    excute(operation).then(({ data: { getProject } }) => {
      const { users } = getProject;
      const data = users.map((user: User, index) => ({
        key: index,
        userId: user.id,
        title: `${user.name} (${user.email})`,
        chosen: false
      }));
      this.setState({ data });
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
