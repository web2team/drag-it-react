import gql from "graphql-tag";

export const GET_PROJECT = gql`
  query getProject($projectId: ID!) {
    getProject(projectId: $projectId) {
      id
      name
      users {
        id
        name
        email
      }
    }
  }
`;

export const NEW_CHAT_THREAD = gql`
  mutation newChatThread(
    $gridLayoutId: ID!
    $users: [UserInput]!
    $threadName: String
  ) {
    newChatThread(
      gridLayoutId: $gridLayoutId
      users: $users
      threadName: $threadName
    ) {
      id
      users {
        id
        name
      }
    }
  }
`;

export const NEW_GRID_LAYOUT_ITEM = gql`
  mutation newGridLayoutItem(
    $gridLayoutId: ID!
    $gridLayoutItemType: GridLayoutItemType!
    $gridLayoutItemPropsInput: GridLayoutItemPropsInput!
  ) {
    newGridLayoutItem(
      gridLayoutId: $gridLayoutId
      gridLayoutItemType: $gridLayoutItemType
      gridLayoutItemPropsInput: $gridLayoutItemPropsInput
    ) {
      id
      gridLayoutItemType
      gridLayoutItemProps {
        chatThread {
          id
          users {
            id
            name
          }
        }
      }
      gridLayoutItemPosition {
        key
        x
        y
        w
        h
        draggableHandle
      }
    }
  }
`;
