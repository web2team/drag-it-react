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

export const NEW_GRID_LAYOUT_ITEM_AND_NOTIFY = gql`
  mutation newGridLayoutItemAndNotify(
    $gridLayoutId: ID!
    $gridLayoutItemPropsInput: GridLayoutItemPropsInput!
  ) {
    newGridLayoutItemAndNotify(
      gridLayoutId: $gridLayoutId
      gridLayoutItemPropsInput: $gridLayoutItemPropsInput
    ) {
      id
      gridLayoutItemProps {
        id
        type
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
