import {
  Arg,
  ClassType,
  Ctx,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

// types
import type { Context } from '~/types/context';
import { BaseResponse } from '~/types/shared';

// models
import { Post } from '~/db/models';

import { VerifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

enum Reaction {
  LIKE = 'LIKE',
  UNLIKE = 'UNLIKE',
}

registerEnumType(Reaction, {
  name: 'Reaction',
});

const reactPost = (Base: ClassType) => {
  @Resolver()
  class ReactPost extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(VerifyAuth)
    reactPost(
      @Arg('postId') postId: string,
      @Arg('reaction') reaction: Reaction,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      const handler = async () => {
        const reactionPost = await Post.findById(postId);

        if (!reactionPost)
          return {
            code: 404,
            success: false,
            message: 'Post not found',
          };

        const isLiked = reactionPost.reactions.includes(userId);

        if (reaction === Reaction.LIKE) {
          if (isLiked)
            return {
              code: 400,
              success: false,
              message: 'Post already liked',
            };

          await Post.updateOne({ _id: postId }, { $push: { reactions: userId } });

          return {
            code: 200,
            success: false,
            message: 'Post is liked',
          };
        }

        if (!isLiked)
          return {
            code: 400,
            success: false,
            message: 'Post already unliked',
          };

        await Post.updateOne({ _id: postId }, { $pull: { reactions: userId } });

        return {
          code: 200,
          success: false,
          message: 'Post is unliked',
        };
      };

      return respond(handler);
    }
  }

  return ReactPost;
};

export default reactPost;
