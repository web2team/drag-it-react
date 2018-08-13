import gql from "graphql-tag";

export const GET_GRID_DRAGGABLE_LAYOUT = gql`
  query getGridDraggableLayout($gridId: ID!) {
    getGridDraggableLayout(gridId: $gridId) {
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
        chatThreadId
      }
    }
  }
`;

export const CHANGE_LAYOUT = gql`
  mutation updateGridLayout(
    $gridId: ID!
    $gridDraggablePropsId: ID!
    $newGridData: GridDataInput!
  ) {
    updateGridLayout(
      gridId: $gridId
      gridDraggablePropsId: $gridDraggablePropsId
      newGridData: $newGridData
    ) {
      x
      y
      w
      h
    }
  }
`;
