import { Query, Resolver } from 'type-graphql';

// entities
import { Conversation } from '~/db/entities';

import extender from '~/helpers/extender';

// sub resolvers
import createConversation from './createConversation';
import deleteChat from './deleteChat';
import getConversations from './getConversations';

@Resolver((_of) => Conversation)
export default class ConversationResolver extends extender(
  createConversation,
  getConversations,
  deleteChat,
) {
  @Query((_returns) => String)
  hello() {
    return 'Hello World';
  }
}
