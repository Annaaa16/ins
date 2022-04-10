import { Mutation, Arg, Ctx, Resolver, ClassType } from 'type-graphql';
import bcrypt from 'bcrypt';

// types
import type { Context } from '~/types/context';
import { LoginInput } from '~/types/inputs';
import { UserMutationResponse } from '~/types/responses';

// models
import User from '~/db/models/User';

import { setTokens } from '~/helpers/token';
import respond from '~/helpers/respond';

const login = (Base: ClassType) => {
  @Resolver()
  class Login extends Base {
    @Mutation((_returns) => UserMutationResponse)
    login(
      @Arg('loginInput') loginInput: LoginInput,
      @Ctx() { res }: Context,
    ): Promise<UserMutationResponse> {
      const handler = async () => {
        const { username, password } = loginInput;

        const existingUser = await User.findOne({ username }).lean();

        if (!existingUser)
          return {
            code: 400,
            success: false,
            message: 'User not found',
            errors: [
              {
                field: 'usernameOrPassword',
                message: 'Invalid username or password',
              },
            ],
          };

        const passwordCorrect = bcrypt.compareSync(password, existingUser.password);

        if (!passwordCorrect)
          return {
            code: 400,
            success: false,
            message: 'Wrong password',
            errors: [
              {
                field: 'usernameOrPassword',
                message: 'Invalid username or password',
              },
            ],
          };

        setTokens(res, existingUser._id);

        return {
          code: 200,
          success: true,
          message: 'Logged in successfully',
          user: existingUser,
        };
      };

      return respond(handler);
    }
  }

  return Login;
};

export default login;
