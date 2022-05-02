import { Arg, ClassType, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';

// types
import { GetConversationByIdResponse } from '~/db/types/responses/conversation';

// models
import { Conversation, Message } from '~/db/models';

// entities
import { Conversation as ConversationEntity, Message as MessageEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const getConversationById = (Base: ClassType) => {
  @Resolver((_of) => ConversationEntity)
  class GetConversationById extends Base {
    @FieldResolver((_returns) => MessageEntity, { nullable: true })
    async lastMessage(@Root() conversation: ConversationEntity): Promise<MessageEntity | null> {
      return await Message.findOne({ conversationId: conversation._id })
        .sort([['createdAt', -1]])
        .populate({ path: 'user' })
        .lean();
    }

    @Query((_returns) => GetConversationByIdResponse)
    @UseMiddleware(verifyAuth)
    getConversationById(
      @Arg('conversationId') conversationId: string,
    ): Promise<GetConversationByIdResponse> {
      return respond(async () => {
        const conversation = await Conversation.findById(conversationId)
          .populate([
            { path: 'creators', populate: ['followers', 'following'] },
            { path: 'members', populate: ['followers', 'following'] },
          ])
          .lean();

        if (conversation == null)
          return {
            code: 404,
            success: false,
            message: 'Conversation not found',
          };

        return {
          code: 200,
          success: true,
          conversation,
        };
      });
    }
  }

  return GetConversationById;
};

export default getConversationById;
