import { ClassType, Ctx, Mutation, Resolver } from 'type-graphql';

// types
import type { Context } from '~/types/context';

import { clearAllCookies } from '~/helpers/cookie';

const logout = (Base: ClassType) => {
  @Resolver()
  class Logout extends Base {
    @Mutation((_returns) => Boolean)
    logout(@Ctx() { res }: Context): Promise<boolean> {
      clearAllCookies(res);

      return Promise.resolve(true);
    }
  }

  return Logout;
};

export default logout;
