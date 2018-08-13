import gql from "graphql-tag";

export const UPDATE_GRID_NAME = gql`
  mutation updateGridName($grid_id: ID!, $formData: String!) {
    updateGridName(grid_id: $grid_id, name: $formData) {
      id
      name
    }
  }
`;

export const GET_GRIDS = gql`
  query getGrids($userId: ID!) {
    getGrids(userId: $userId) {
      id
      name
    }
  }
`;

export const NEW_GRID = gql`
  mutation newGrid($name: String!, $userId: ID!) {
    newGrid(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

export const DELETE_GRID = gql`
  mutation deleteGrid($gridId: ID!) {
    deleteGrid(gridId: $gridId)
  }
`;
