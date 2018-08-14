import * as React from "react";
import { Transfer } from "antd";
import { Styled } from "interface/global";
import { styled } from "theme";

interface Props extends Styled {
  onChange?: (updatedValue: any) => void;
}
class SelectPeople extends React.Component<Props, any> {
  state = {
    mockData: [],
    targetKeys: []
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `abc${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: false
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys });

    const data = this.state.mockData;
    const resultData = targetKeys.map((key) => data[key]);
    this.props.onChange(resultData);
  };

  render() {
    return (
      <Transfer
        className={this.props.className}
        dataSource={this.state.mockData}
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
