export const getFullChatRoomInfo = /* GraphQL */ `
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
          sender {
            name
          }
          receiver {
            name
          }
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getLikesByCustomerID = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      likes {
        id
        like
      }
      matches
    }
  }
`;
