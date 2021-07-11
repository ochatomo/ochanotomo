/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      gender
      id
      interests
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      gender
      id
      interests
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      gender
      id
      interests
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
export const onCreateMatch = /* GraphQL */ `
  subscription OnCreateMatch {
    onCreateMatch {
      id
      owner_id
      customer_id
      customer {
        gender
        id
        interests
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
export const onUpdateMatch = /* GraphQL */ `
  subscription OnUpdateMatch {
    onUpdateMatch {
      id
      owner_id
      customer_id
      customer {
        gender
        id
        interests
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
export const onDeleteMatch = /* GraphQL */ `
  subscription OnDeleteMatch {
    onDeleteMatch {
      id
      owner_id
      customer_id
      customer {
        gender
        id
        interests
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      chatRoomId
      content
      createdAt
      sender_id
      receiver_id
      sender {
        gender
        id
        interests
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
        interests
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      chatRoomId
      content
      createdAt
      sender_id
      receiver_id
      sender {
        gender
        id
        interests
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
        interests
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      chatRoomId
      content
      createdAt
      sender_id
      receiver_id
      sender {
        gender
        id
        interests
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
        interests
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
