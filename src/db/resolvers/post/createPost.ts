import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { PostMutationResponse } from '~/db/types/responses';
import { CreatePostInput } from '~/db/types/inputs';

import { verifyAuth } from '~/db/middlewares';
import { Post } from '~/db/models';
import { uploadPhoto } from '~/helpers/cloudinary';
import respond from '~/helpers/respond';

const createPost = (Base: ClassType) => {
  @Resolver()
  class CreatePost extends Base {
    @Mutation((_returns) => PostMutationResponse)
    @UseMiddleware(verifyAuth)
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
        const { photo } = await uploadPhoto(base64Photo);

        const newPost = await Post.create({
          caption,
          photo,
          user: userId,
        });

        return {
          code: 201,
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
