// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Customer, ChatRoom, Message, Like, Match } = initSchema(schema);

export {
  Customer,
  ChatRoom,
  Message,
  Like,
  Match
};