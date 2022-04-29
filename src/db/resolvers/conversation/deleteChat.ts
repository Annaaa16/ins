import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';

// models
import { Conversation } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const deleteChat = (Base: ClassType) => {
  @Resolver()
  class DeleteChat extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    deleteChat(
      @Arg('conversationId') conversationId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      const handler = async () => {
        const conversation = await Conversation.findById(conversationId);

        if (conversation == null) {
          return {
            code: 400,
            success: false,
            message: 'Conversation not found',
          };
        }

        if (!conversation.creators.includes(userId))
          return {
            code: 400,
            success: false,
            message: 'Chat already deleted',
          };

        if (conversation.creators.length === 1)
          await Conversation.findByIdAndDelete(conversationId);

        await Conversation.updateOne({ _id: conversationId }, { $pull: { creators: userId } });

        return {
          code: 200,
          success: true,
          message: 'Chat deleted',
        };
      };

      return respond(handler);
    }
  }

  return DeleteChat;
};

export default deleteChat;
