import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
  query getNotifications($userId: ID!, $page: Int!, $size: Int!) {
    getNotifications(userId: $userId, page: $page, size: $size) {
      id
      title
      message
      isRead
      createdAt
      user {
        id
        name
      }
      gridLayoutItemProps {
        id
        type
        chatThread {
          id
        }
      }
    }
  }
`;

export const LINK_NOTIFICATION = gql`
  subscription linkNotification($userId: ID!) {
    linkNotification(userId: $userId) {
      id
      title
      message
      isRead
      createdAt

      user {
        id
        name
      }

      gridLayoutItemProps {
        id
        type
        chatThread {
          id
        }
      }
    }
  }
`;

export const ACCEPT_NOTIFICATION = gql`
  mutation acceptNotification($gridLayoutId: ID!, $notificationId: ID!) {
    acceptNotification(
      gridLayoutId: $gridLayoutId
      notificationId: $notificationId
    )
  }
`;
