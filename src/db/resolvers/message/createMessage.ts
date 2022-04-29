import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { MessageMutationResponse } from '~/db/types/responses/message';
import { CreateMessageInput } from '~/db/types/inputs';

// models
import { Conversation, Message } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const createMessage = (Base: ClassType) => {
  @Resolver()
  class CreateMessage extends Base {
    @Mutation((_returns) => MessageMutationResponse)
    @UseMiddleware(verifyAuth)
    createMessage(
      @Arg('createMessageInput') { conversationId, text }: CreateMessageInput,
      @Ctx() { req: { userId } }: Context,
    ): Promise<MessageMutationResponse> {
      return respond(async () => {
        const existingConversation = await Conversation.findById(conversationId);

        if (existingConversation == null)
          return {
            code: 404,
            success: false,
            message: 'Conversation not found',
          };

        const newMessage = await Message.create({
          user: userId,
          conversationId,
          text,
        })
          .then((res) => res.populate('user'))
          .then((res) => res.toObject());

        return {
          code: 201,
          success: true,
          newMessage,
        };
      });
    }
  }

  return CreateMessage;
};

export default createMessage;
