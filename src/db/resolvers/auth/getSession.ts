import { Resolver, ClassType, Query, UseMiddleware, Ctx } from 'type-graphql';

// types
import type { Context } from '~/db/types/context';
import { GetSessionResponse } from '~/db/types/responses';

import { verifyAuth } from '~/db/middlewares';
import { User } from '~/db/models';
import respond from '~/helpers/respond';

const getSession = (Base: ClassType) => {
  @Resolver()
  class GetSession extends Base {
    @Query((_returns) => GetSessionResponse)
    @UseMiddleware(verifyAuth)
    getSession(@Ctx() { req: { userId, accessToken } }: Context): Promise<GetSessionResponse> {
      const handler = async () => {
        const user = await User.findById(userId).lean();

        return {
          code: 200,
          success: true,
          user,
          accessToken,
        };
      };

      return respond(handler);
    }
  }

  return GetSession;
};

export default getSession;
