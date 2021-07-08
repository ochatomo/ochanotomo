/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      gender
      id
      interests
      likes {
        id
        like
      }
      location
      matches
      name
      photo
      profileText
      createdAt
      updatedAt
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        gender
        id
        interests
        likes {
          id
          like
        }
        location
        matches
        name
        photo
        profileText
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      users
      messages {
        items {
          id
          chatRoomId
          content
          createdAt
          sender
          receiver
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        users
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      chatRoomId
      content
      createdAt
      sender
      receiver
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomId
        content
        createdAt
        sender
        receiver
        updatedAt
      }
      nextToken
    }
  }
`;

export const getChatRoomData = /* GraphQL */ `
  query MyQuery {
    getChatRoom(id: $id) {
      messages {
        items {
          content
          createdAt
          id
          receiver
          sender
          updatedAt
        }
      }
      createdAt
      id
      updatedAt
      users
    }
  }
`;
