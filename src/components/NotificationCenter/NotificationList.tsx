import * as React from "react";
import { List, message, Avatar, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

export class InfiniteListExample extends React.Component {
  state = {
    data: [
      {
        gender: "male",
        name: { title: "mr", first: "mehmet", last: "körmükçü" },
        email: "mehmet.körmükçü@example.com",
        nat: "TR"
      },
      {
        gender: "female",
        name: { title: "mrs", first: "melissa", last: "stevens" },
        email: "melissa.stevens@example.com",
        nat: "AU"
      },
      {
        gender: "male",
        name: { title: "mr", first: "carmelo", last: "fuentes" },
        email: "carmelo.fuentes@example.com",
        nat: "ES"
      },
      {
        gender: "male",
        name: { title: "mr", first: "niklas", last: "lakso" },
        email: "niklas.lakso@example.com",
        nat: "FI"
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
      }
    ],
    loading: false,
    hasMore: true
  };

  // componentDidMount() {
    
  // }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    // this.getData((res) => {
    //   data = data.concat(res.results);
    //   this.setState({
    //     data,
    //     loading: false
    //   });
    // });
  };

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          >
            {this.state.loading &&
              this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
