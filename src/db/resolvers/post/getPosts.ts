import { Arg, ClassType, Query, Resolver } from 'type-graphql';

// types
import { PaginatedPostsResponse } from '~/types/responses';

// models
import { Post } from '~/db/models';

import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getPosts = (Base: ClassType) => {
  @Resolver()
  class GetPosts extends Base {
    @Query((_returns) => PaginatedPostsResponse)
    getPosts(@Arg('cursor', { nullable: true }) cursor?: string): Promise<PaginatedPostsResponse> {
      const handler = async () => {
        const { filterQuery, sort, getNextCursor } = paginate(Post, ['createdAt', -1], cursor);

        const posts = await Post.find(filterQuery).limit(3).sort([sort]).lean();

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
