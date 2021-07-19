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
            photo
          }
          receiver {
            name
            photo
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
    }
  }
`;

export const getCustomerWithMatches = /* GraphQL */ `
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
          customer {
            id
            name
            photo
          }
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

export const onUpdateCustomerWithMatches = `
subscription OnUpdateCustomer {
  onUpdateCustomer {
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
        customer {
          id
          name
          photo
        }
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
