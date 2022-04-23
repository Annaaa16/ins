import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';

// models
import { Comment } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const deleteComment = (Base: ClassType) => {
  @Resolver()
  class DeleteComment extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    deleteComment(
      @Arg('commentId') commentId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      const handler = async () => {
        const deletedComment = await Comment.findOneAndDelete({ _id: commentId, user: userId });

        if (!deletedComment)
          return {
            code: 400,
            success: true,
            message: 'Comment not found',
          };

        return {
          code: 200,
          success: true,
          message: 'Comment deleted',
        };
      };

      return respond(handler);
    }
  }

  return DeleteComment;
};

export default deleteComment;