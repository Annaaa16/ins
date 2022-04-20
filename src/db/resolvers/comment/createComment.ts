import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';

import { VerifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import { CommentMutationResponse } from '~/db/types/responses';
import { Comment } from '~/db/models';

const createComment = (Base: ClassType) => {
  @Resolver()
  class CreateComment extends Base {
    @Mutation((_returns) => CommentMutationResponse)
    @UseMiddleware(VerifyAuth)
    createComment(
      @Arg('caption') caption: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<CommentMutationResponse> {
      if (!caption.trim())
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Caption is missing',
        });

      const handler = async () => {
        const newComment = await Comment.create({
          user: userId,
          caption,
        });

        return {
          code: 201,
          success: true,
          message: 'The comment has been created successfully',
          comment: (await newComment.populate('user')).toObject(),
        };
      };

      return respond(handler);
    }
  }

  return CreateComment;
};

export default createComment;
