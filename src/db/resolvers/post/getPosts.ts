import { Arg, ClassType, Int, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { PaginatedPostsResponse } from '~/types/responses';

// models
import { Post } from '~/db/models';

import { VerifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getPosts = (Base: ClassType) => {
  @Resolver()
  class GetPosts extends Base {
    @Query((_returns) => PaginatedPostsResponse)
    @UseMiddleware(VerifyAuth)
    getPosts(
      @Arg('page', (_type) => Int) page: number,
      @Arg('cursor', { nullable: true }) cursor?: string,
    ): Promise<PaginatedPostsResponse> {
      const handler = async () => {
        const { filterQuery, sort, getNextCursor } = paginate(Post, ['createdAt', -1], cursor);

        const posts = await Post.find(filterQuery)
          .limit(page)
          .sort([sort])
          .populate('user')
          .populate('reactions')
          .lean();

        const nextCursor = await getNextCursor(posts);

        return {
          code: 200,
          success: true,
          message: 'Get posts successfully',
          posts,
          cursor: nextCursor,
        };
      };

      return respond(handler);
    }
  }

  return GetPosts;
};

export default getPosts;
