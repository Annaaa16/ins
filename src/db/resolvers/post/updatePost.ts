import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { UpdatePostInput } from '~/db/types/inputs';
import { PostMutationResponse } from '~/db/types/responses';

// models
import { Post } from '~/db/models';

import { Post as PostEntity } from '~/db/entities';
import { VerifyAuth } from '~/db/middlewares';
import { updatePhoto } from '~/helpers/cloudinary';
import respond from '~/helpers/respond';

const updatePost = (Base: ClassType) => {
  @Resolver()
  class UpdatePost extends Base {
    @Mutation((_returns) => PostMutationResponse)
    @UseMiddleware(VerifyAuth)
    updatePost(
      @Arg('updatePostInput') { postId, caption, newBase64Photo, oldPhotoUrl }: UpdatePostInput,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PostMutationResponse> {
      if (!caption?.trim() && !newBase64Photo)
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Field is missing',
        });

      const handler = async () => {
        const selectedPost = await Post.findOne({ _id: postId, user: userId });

        if (!selectedPost)
          return {
            code: 401,
            success: false,
            message: 'Post not found or user unauthorized',
          };

        const newPost: Partial<PostEntity> = {};

        if (caption) {
          newPost.caption = caption;
        }

        // Update photo
        if (newBase64Photo && oldPhotoUrl) {
          const { photoUrl } = await updatePhoto(newBase64Photo, oldPhotoUrl);

          newPost.photo = photoUrl;
        }

        // Add new photo
        if (newBase64Photo && !oldPhotoUrl) {
          const { photoUrl } = await updatePhoto(newBase64Photo);

          newPost.photo = photoUrl;
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, newPost, { new: true })
          .populate('user')
          .populate('reactions')
          .lean();

        if (!updatedPost)
          return {
            code: 404,
            success: false,
            message: 'Post not found',
          };

        return {
          code: 200,
          success: true,
          message: 'Post is updated',
          post: updatedPost,
        };
      };

      return respond(handler);
    }
  }

  return UpdatePost;
};

export default updatePost;
