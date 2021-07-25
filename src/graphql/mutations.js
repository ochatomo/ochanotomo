/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
      premiumUntil
      premium
      subscriptionID
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
      premiumUntil
      premium
      subscriptionID
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
      premiumUntil
      premium
      subscriptionID
      createdAt
      updatedAt
    }
  }
`;
export const createMatch = /* GraphQL */ `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
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
        premiumUntil
        premium
        subscriptionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    updateMatch(input: $input, condition: $condition) {
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
        premiumUntil
        premium
        subscriptionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMatch = /* GraphQL */ `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
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
        premiumUntil
        premium
        subscriptionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
        premiumUntil
        premium
        subscriptionID
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
        premiumUntil
        premium
        subscriptionID
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
        premiumUntil
        premium
        subscriptionID
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
        premiumUntil
        premium
        subscriptionID
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
        premiumUntil
        premium
        subscriptionID
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
        premiumUntil
        premium
        subscriptionID
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
