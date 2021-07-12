/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      gender
      id
      interests {
        category
        hobby
      }
      likes {
        id
        like
      }
      location
      matches {
        items {
          id
          owner_id
          customer_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
        interests {
          category
          hobby
        }
        likes {
          id
          like
        }
        location
        matches {
          nextToken
        }
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
export const getMatch = /* GraphQL */ `
  query GetMatch($id: ID!) {
    getMatch(id: $id) {
      id
      owner_id
      customer_id
      customer {
        gender
        id
        interests {
          category
          hobby
        }
        likes {
          id
          like
        }
        location
        matches {
          nextToken
        }
        name
        photo
        profileText
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMatches = /* GraphQL */ `
  query ListMatches(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner_id
        customer_id
        customer {
          gender
          id
          location
          name
          photo
          profileText
          createdAt
          updatedAt
        }
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
          sender_id
          receiver_id
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
      sender_id
      receiver_id
      sender {
        gender
        id
        interests {
          category
          hobby
        }
        likes {
          id
          like
        }
        location
        matches {
          nextToken
        }
        name
        photo
        profileText
        createdAt
        updatedAt
      }
      receiver {
        gender
        id
        interests {
          category
          hobby
        }
        likes {
          id
          like
        }
        location
        matches {
          nextToken
        }
        name
        photo
        profileText
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomId
        content
        createdAt
        sender_id
        receiver_id
        sender {
          gender
          id
          location
          name
          photo
          profileText
          createdAt
          updatedAt
        }
        receiver {
          gender
          id
          location
          name
          photo
          profileText
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
