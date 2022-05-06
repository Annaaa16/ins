import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { PostMutationResponse } from '~/db/types/responses/post';
import { CreatePostInput } from '~/db/types/inputs';

// models
import { Post } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import { uploadPhoto } from '~/helpers/cloudinary';
import { isEmptyInput } from '~/helpers/string';
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
      if (isEmptyInput(caption) || !base64Photo)
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Field is missing',
        });

      return respond(async () => {
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
      });
    }
  }

  return CreatePost;
};

export default createPost;
