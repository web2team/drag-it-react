import * as React from "react";

import { Transfer } from "antd";

export class SelectPeople extends React.Component<any, any> {
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
        dataSource={this.state.mockData}
        // showSearch={true}
        
        filterOption={this.filterOption}
        operations={["to add", "to remove"]}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={(item) => item.title}
      />
    );
  }
}
