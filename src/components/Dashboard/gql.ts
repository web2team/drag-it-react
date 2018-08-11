import gql from "graphql-tag";

export const GET_GRID_DRAGGABLE_PROPS = gql`
  query getGridDraggableProps($grid_id: ID!) {
    getGridDraggableProps(grid_id: $grid_id) {
      id
      gridData {
        key
        x
        y
        w
        h
        draggableHandle
      }
      gridComponentType
      gridComponentProps {
        chat_thread_id
      }
    }
  }
`;

export const CHANGE_LAYOUT = gql`
  mutation changeGridLayout(
    $grid_id: ID!
    $gridDraggableProps_id: ID!
    $newGridData: GridDataInput!
  ) {
    changeGridLayout(
      grid_id: $grid_id
      gridDraggableProps_id: $gridDraggableProps_id
      newGridData: $newGridData
    ) {
      x
      y
      w
      h
    }
  }
`;
