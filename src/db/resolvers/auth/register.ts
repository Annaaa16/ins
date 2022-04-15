import { Arg, Resolver, ClassType, Mutation } from 'type-graphql';

// types
import { RegisterInput } from '~/types/inputs';
import { UserMutationResponse } from '~/types/responses';

// models
import { User } from '~/db/models';

import respond from '~/helpers/respond';
import hashData from '~/helpers/hashData';

const register = (Base: ClassType) => {
  @Resolver()
  class Register extends Base {
    @Mutation((_returns) => UserMutationResponse)
    register(@Arg('registerInput') registerInput: RegisterInput): Promise<UserMutationResponse> {
      const handler = async () => {
        const { email, username, password } = registerInput;

        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
          account: 'default',
        });

        if (existingUser)
          return {
            code: 400,
            success: false,
            message: 'Duplicate username or email',
            errors: [
              {
                field: existingUser.username === username ? 'username' : 'email',
                message: `${
                  existingUser.username === username ? 'Username' : 'Email'
                } already taken`,
              },
            ],
          };

        const newUser = await User.create({
          username,
          email,
          password: hashData(password),
          account: 'default',
        });

        return {
          code: 200,
          success: true,
          message: 'User registration successful',
          user: newUser.toObject(),
        };
      };

      return respond(handler);
    }
  }

  return Register;
};

export default register;
