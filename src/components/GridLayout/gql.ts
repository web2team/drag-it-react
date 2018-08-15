import gql from "graphql-tag";

export const GET_GRID_LAYOUT_ITEMS = gql`
  query getGridLayoutItems($gridLayoutId: ID!) {
    getGridLayoutItems(gridLayoutId: $gridLayoutId) {
      id
      gridLayoutItemType
      gridLayoutItemProps {
        chatThreadId
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

export const UPDATE_GRID_LAYOUT = gql`
  mutation updateGridLayout(
    $gridLayoutId: ID!
    $gridLayoutItemId: ID!
    $gridLayoutItemPosition: GridLayoutItemPositionInput!
  ) {
    updateGridLayout(
      gridLayoutId: $gridLayoutId
      gridLayoutItemId: $gridLayoutItemId
      gridLayoutItemPosition: $gridLayoutItemPosition
    ) {
      x
      y
      w
      h
    }
  }
`;
