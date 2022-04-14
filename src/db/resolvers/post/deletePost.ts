import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/types/context';
import { BaseResponse } from '~/types/shared';

// models
import { Post } from '~/db/models';

import { VerifyAuth } from '~/db/middlewares';
import { deletePhoto } from '~/helpers/cloudinary';
import respond from '~/helpers/respond';

const deletePost = (Base: ClassType) => {
  @Resolver()
  class DeletePost extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(VerifyAuth)
    deletePost(
      @Arg('postId') postId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      const handler = async () => {
        const deletedPost = await Post.findOneAndDelete({ _id: postId, user: userId });

        if (!deletedPost)
          return {
            code: 404,
            success: false,
            message: 'Post not found',
          };

        await deletePhoto(deletedPost.photoId);

        return {
          code: 200,
          success: true,
          message: 'Post deleted',
        };
      };

      return respond(handler);
    }
  }

  return DeletePost;
};

export default deletePost;
