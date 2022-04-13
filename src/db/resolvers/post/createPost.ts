import { Arg, ClassType, Ctx, Mutation, Resolver } from 'type-graphql';

// types
import type { Context } from '~/types/context';
import { PostMutationResponse } from '~/types/responses';
import { CreatePostInput } from '~/types/inputs';

import { uploadPhoto } from '~/helpers/cloudinary';
import respond from '~/helpers/respond';
import { Post } from '~/db/models';

const createPost = (Base: ClassType) => {
  @Resolver()
  class CreatePost extends Base {
    @Mutation((_returns) => PostMutationResponse)
    createPost(
      @Arg('createPostInput') { caption, photoPath }: CreatePostInput,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PostMutationResponse> {
      if (!caption.trim() || !photoPath)
        return Promise.resolve({
          code: 200,
          success: false,
          message: 'Field is missing',
        });

      const handler = async () => {
        const { photo, photoId } = await uploadPhoto(photoPath);

        const newPost = await Post.create({
          caption,
          photo,
          photoId,
          user: userId,
        });

        return {
          code: 200,
          success: false,
          message: 'The post has been created successfully',
          post: newPost.toObject(),
        };
      };

      return respond(handler);
    }
  }

  return CreatePost;
};

export default createPost;
