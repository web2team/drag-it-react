import * as React from "react";
import { List, message, Avatar, Spin, Button, notification } from "antd";

import InfiniteScroll from "react-infinite-scroller";
import styled from "theme";
import {
  GET_NOTIFICATIONS,
  LINK_NOTIFICATION,
  ACCEPT_NOTIFICATION
} from "./gql";
import { executePromise, executePromiseSubscribe } from "helper/apolloConfig";
import { NotificationCenterProps, Notification } from "interface/Notification";
import Moment from "react-moment";
import { inject } from "mobx-react";
import { GridState } from "state/gridState";

interface Props extends NotificationCenterProps {
  visible: boolean;
  onDismiss: () => void;
  gridState?: GridState;
}
interface State {
  notifications: Notification[];
  page: number;
  sending: boolean;
  loading: boolean;
  hasMore: boolean;
}

@inject("gridState")
class NotificationList extends React.Component<Props, State> {
  container: any;
  size = 10;

  state = {
    notifications: [],
    page: 0,
    sending: false,
    loading: false,
    hasMore: true
  };

  // 사용자 마우스 이벤트 영역 해제
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }
  // 사용자 마우스 이벤트 영역 등록
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

  handleAcceptInvitation = (noti: Notification): void => {
    const operation = {
      query: ACCEPT_NOTIFICATION,
      variables: {
        gridLayoutId: this.props.gridState.currentGridLayoutId,
        notificationId: noti.id
      }
    };

    this.setState({ sending: true });
    executePromise(operation).then(() => {
      notification.success({
        message: "SUCCESS",
        description: "추가되었습니다."
      });
      noti.isRead = true;
      this.setState({ sending: false });
    });
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
                  {!noti.isRead ? (
                    <div>
                      <Spin spinning={this.state.sending}>
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
                      </Spin>
                    </div>
                  ) : null}
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
