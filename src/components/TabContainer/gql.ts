import gql from "graphql-tag";

export const UPDATE_GRID_LAYOUT_NAME = gql`
  mutation updateGridLayoutName($gridLayoutId: ID!, $formData: String!) {
    updateGridLayoutName(gridLayoutId: $gridLayoutId, name: $formData) {
      id
      name
    }
  }
`;

export const GET_GRID_LAYOUTS = gql`
  query getGridLayouts($userId: ID!) {
    getGridLayouts(userId: $userId) {
      id
      name
    }
  }
`;

export const NEW_GRID_LAYOUT = gql`
  mutation newGridLayout($name: String!, $userId: ID!) {
    newGridLayout(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

export const DELETE_GRID_LAYOUT = gql`
  mutation deleteGridLayout($gridLayoutId: ID!) {
    deleteGridLayout(gridLayoutId: $gridLayoutId)
  }
`;
