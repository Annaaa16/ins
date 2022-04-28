import { Arg, ClassType, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/db/models';

// types
import { SearchUserResponse } from '~/db/types/responses';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const searchUser = (Base: ClassType) => {
  @Resolver()
  class SearchUser extends Base {
    @Mutation((_returns) => SearchUserResponse)
    @UseMiddleware(verifyAuth)
    searchUser(
      @Arg('query') query: string,
      @Arg('limit', (_type) => Int) limit: number,
    ): Promise<SearchUserResponse> {
      const handler = async () => {
        const users = await User.find({
          $or: [{ username: { $regex: query } }, { email: { $regex: query } }],
        })
          .limit(limit)
          .lean();

        return {
          code: 200,
          success: true,
          users,
        };
      };

      return respond(handler);
    }
  }

  return SearchUser;
};

export default searchUser;
