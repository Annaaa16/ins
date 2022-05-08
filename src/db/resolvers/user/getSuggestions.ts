import { Arg, ClassType, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { GetSuggestionsResponse } from '~/db/types/responses/user';
import { FilterQuery } from '~/db/types/utils';

// models
import { User } from '~/db/models';

// entities
import { User as UserEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getSuggestions = (Base: ClassType) => {
  @Resolver()
  class GetSuggestions extends Base {
    @Query((_returns) => GetSuggestionsResponse)
    @UseMiddleware(verifyAuth)
    getSuggestions(
      @Arg('limit', (_type) => Int) limit: number,
      @Arg('cursor', (_type) => String, { nullable: true }) cursor: string | null,
      @Ctx() { req: { userId } }: Context,
    ): Promise<GetSuggestionsResponse> {
      return respond(async () => {
        const { filterQuery, sort, getNextCursor } = paginate(User, ['followers', -1], cursor, {
          _id: { $not: { $eq: userId } },
          followers: { $nin: userId },
        } as FilterQuery<UserEntity>);

        const users = await User.find(filterQuery)
          .sort([sort])
          .limit(limit)
          .populate(['followers', 'following'])
          .lean();

        const { cursor: nextCursor, hasMore } = await getNextCursor(users);

        return {
          code: 200,
          success: true,
          users,
          cursor: nextCursor,
          hasMore,
        };
      });
    }
  }

  return GetSuggestions;
};

export default getSuggestions;
