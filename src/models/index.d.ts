import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Like {
  readonly id: string;
  readonly like?: boolean;
  constructor(init: ModelInit<Like>);
}

export declare class Match {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<Match>);
}

export declare class Customer {
  readonly id: string;
  readonly gender?: string;
  readonly interests?: (string | null)[];
  readonly likes?: (Like | null)[];
  readonly location?: string;
  readonly matches?: (Match | null)[];
  readonly name: string;
  readonly photo?: string;
  readonly profileText?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Customer>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}

export declare class ChatRoom {
  readonly id: string;
  readonly users?: (string | null)[];
  readonly messages?: (Message | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

export declare class Message {
  readonly id: string;
  readonly chatRoomId: string;
  readonly content: string;
  readonly createdAt?: string;
  readonly sender_id: string;
  readonly receiver_id: string;
  readonly sender?: Customer;
  readonly receiver?: Customer;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}