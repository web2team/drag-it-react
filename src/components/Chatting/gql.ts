import gql from "graphql-tag";

export const NEW_CHAT_MESSAGE = gql`
  mutation newChatMessage(
    $chatThreadId: ID!
    $userId: ID!
    $contents: String!
  ) {
    newChatMessage(
      chatThreadId: $chatThreadId
      userId: $userId
      contents: $contents
    ) {
      id
      contents
      createdAt
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages($chatThreadId: ID!, $page: Int!, $size: Int!) {
    getChatMessages(chatThreadId: $chatThreadId, page: $page, size: $size) {
      user {
        id
        name
      }
      contents
      createdAt
    }
  }
`;

export const LINK_CHAT_MESSAGES = gql`
  subscription linkChatMessage($chatThreadId: ID!) {
    linkChatMessage(chatThreadId: $chatThreadId) {
      id
      user {
        id
        name
      }
      contents
      createdAt
    }
  }
`;

export const GET_CHAT_THREAD = gql`
  query getChatThread($chatThreadId: ID!) {
    getChatThread(chatThreadId: $chatThreadId) {
      id
      users
    }
  }
`;

export const GET_MAP_USER_CHAT_THREAD = gql`
  query getMapUserChatThread($userId: ID!, $chatThreadId: ID!) {
    getMapUserChatThread(userId: $userId, chatThreadId: $chatThreadId) {
      userId
      chatThreadId
      name
    }
  }
`;

export const UPDATE_USER_CHAT_THREAD_NAME = gql`
  mutation updateUserChatThreadName(
    $userId: ID!
    $chatThreadId: ID!
    $formData: String!
  ) {
    updateUserChatThreadName(
      userId: $userId
      chatThreadId: $chatThreadId
      name: $formData
    ) {
      userId
      chatThreadId
      name
    }
  }
`;
