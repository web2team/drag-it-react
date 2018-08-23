import * as React from "react";
import { List, message, Avatar, Spin, Button } from "antd";

import InfiniteScroll from "react-infinite-scroller";
import styled from "theme";
import { GET_NOTIFICATIONS, LINK_NOTIFICATION } from "./gql";
import { executePromise, executePromiseSubscribe } from "helper/apolloConfig";
import { NotificationCenterProps, Notification } from "interface/Notification";
import Moment from "react-moment";

interface Props extends NotificationCenterProps {
  visible: boolean;
  onDismiss: () => void;
}
interface State {
  notifications: Notification[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}
class NotificationList extends React.Component<Props, State> {
  container: any;
  size = 10;

  state = {
    notifications: [],
    page: 0,
    loading: false,
    hasMore: true
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);

    this.fetchNotification();
    this.subscribeNotification();
  }

  handleClickOutside = (e) => {
    if (this.container !== e.target && !this.container.contains(e.target)) {
      this.props.onDismiss();
    }
  };

  fetchNotification = () => {
    this.setState({ loading: true });

    const operation = {
      query: GET_NOTIFICATIONS,
      variables: {
        userId: this.props.userId,
        page: this.state.page,
        size: this.size
      }
    };
    executePromise(operation).then(({ data: { getNotifications } }) =>
      this.setState({
        notifications: getNotifications,
        loading: false,
        page: this.state.page + 1
      })
    );
  };

  subscribeNotification = () => {
    const operation = {
      query: LINK_NOTIFICATION,
      variables: { userId: this.props.userId }
    };
    executePromiseSubscribe(operation, {
      next: ({ data: { linkNotification } }) =>
        this.setState({
          notifications: [...this.state.notifications, linkNotification]
        })
    });
  };

  handleInfiniteOnLoad = () => {
    this.fetchNotification();

    // if (data.length > 14) {
    //   message.warning("Infinite List loaded all");
    //   this.setState({
    //     hasMore: false,
    //     loading: false
    //   });
    //   return;
    // }
  };

  handleAcceptInvitation = (notification: Notification) => {

    
    return;
  };

  render() {
    console.log(this.state.notifications);
    return (
      <div
        className={this.props.className}
        ref={(ref) => (this.container = ref)}
      >
        <Spin spinning={this.state.loading}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.notifications}
              renderItem={(noti: Notification) => (
                <List.Item key={noti.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{noti.title}</a>}
                    description={
                      <div>
                        {noti.message} /{" "}
                        <Moment
                          date={noti.createdAt}
                          fromNow={true}
                          ago={true}
                        />{" "}
                        전
                      </div>
                    }
                  />
                  <div>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => this.handleAcceptInvitation(noti)}
                    >
                      수락
                    </Button>{" "}
                    <Button type="danger" size="small">
                      취소
                    </Button>
                  </div>
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
        </Spin>
      </div>
    );
  }
}

const styledNotificationList = styled(NotificationList)`
  overflow: auto;
  height: 50vh;
  width: 50vw;

  .demo-loading-container {
    text-align: center;

    margin: 1rem;
  }
`;

export { styledNotificationList as NotificationList };
