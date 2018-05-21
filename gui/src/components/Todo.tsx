import * as React from "react";
import { List, Card } from "antd";

const data = [
  {
    title: "To do"
  },
  {
    title: "Doing"
  },
  {
    title: "Done"
  }
];

export default class Todo extends React.Component {
  render() {
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    );
  }
}
