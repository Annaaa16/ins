import {
  Arg,
  ClassType,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { PaginatedConversationsResponse } from '~/db/types/responses/conversation';
import { FilterQuery } from '~/db/types/utils';

// models
import { Conversation, Message } from '~/db/models';

// entities
import { Conversation as ConversationEntity, Message as MessageEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getConversations = (Base: ClassType) => {
  @Resolver((_of) => ConversationEntity)
  class GetConversations extends Base {
    @FieldResolver((_returns) => MessageEntity, { nullable: true })
    async lastMessage(@Root() conversation: ConversationEntity): Promise<MessageEntity | null> {
      return await Message.findOne({ conversationId: conversation._id })
        .sort([['createdAt', -1]])
        .populate({ path: 'user' })
        .lean();
    }

    @Query((_returns) => PaginatedConversationsResponse)
    @UseMiddleware(verifyAuth)
    getConversations(
      @Arg('limit', (_type) => Int) limit: number,
      @Arg('cursor', { nullable: true }) cursor: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PaginatedConversationsResponse> {
      return respond(async () => {
        const { filterQuery, sort, getNextCursor } = paginate(
          Conversation,
          ['createdAt', -1],
          cursor,
          {
            creators: { $in: [userId] },
          } as FilterQuery<ConversationEntity>,
        );

        const conversations = await Conversation.find(filterQuery)
          .limit(limit)
          .sort([sort])
          .populate([
            { path: 'creators', populate: ['followers', 'following'] },
            { path: 'members', populate: ['followers', 'following'] },
          ])
          .lean();

        const { cursor: nextCursor, hasMore } = await getNextCursor(conversations);

        return {
          code: 200,
          success: true,
          conversations,
          cursor: nextCursor,
          hasMore,
        };
      });
    }
  }

  return GetConversations;
};

export default getConversations;
