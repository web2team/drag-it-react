import * as React from "react";
import { List, message, Avatar, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";
import styled from "theme";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

class NotificationList extends React.Component<any, any> {
  container: any;
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
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
      },
      {
        gender: "male",
        name: { title: "mr", first: "theo", last: "jones" },
        email: "theo.jones@example.com",
        nat: "NZ"
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

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    if (this.container !== e.target && !this.container.contains(e.target)) {
      this.props.onDismiss();
    }
  };

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

    // const operation = {
    //   query: 
    // }
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
      <div
        className={this.props.className}
        ref={(ref) => (this.container = ref)}
      >
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

const styledNotificationList = styled(NotificationList)`
  overflow: auto;
  height: 50vh;
  
  .demo-loading-container {
    text-align: center;
    
    margin: 1rem;
  }
`;

export { styledNotificationList as NotificationList };
