import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/types/context';
import { PostMutationResponse } from '~/types/responses';
import { CreatePostInput } from '~/types/inputs';

import { VerifyAuth } from '~/db/middlewares';
import { Post } from '~/db/models';
import { uploadPhoto } from '~/helpers/cloudinary';
import respond from '~/helpers/respond';

const createPost = (Base: ClassType) => {
  @Resolver()
  class CreatePost extends Base {
    @Mutation((_returns) => PostMutationResponse)
    @UseMiddleware(VerifyAuth)
    createPost(
      @Arg('createPostInput') { caption, base64Photo }: CreatePostInput,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PostMutationResponse> {
      if (!caption.trim() || !base64Photo)
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Field is missing',
        });

      const handler = async () => {
        const { photo, photoId } = await uploadPhoto(base64Photo);

        const newPost = await Post.create({
          caption,
          photo,
          photoId,
          user: userId,
        });

        return {
          code: 200,
          success: true,
          message: 'The post has been created successfully',
          post: (await newPost.populate('user')).toObject(),
        };
      };

      return respond(handler);
    }
  }

  return CreatePost;
};

export default createPost;
