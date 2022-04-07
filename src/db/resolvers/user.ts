import { Resolver, Mutation, Query, Arg } from 'type-graphql';

// types
import RegisterInput from '~/types/inputs/RegisterInput';
import UserMutationResponse from '~/types/responses/UserMutationResponse';

import { UserModel } from '../models/User';
import hashPassword from '~/helpers/hashPassword';
import respond from '~/helpers/respond';

@Resolver()
export default class UserResolver {
  @Query((_returns) => UserMutationResponse)
  @Mutation((_returns) => UserMutationResponse)
  register(@Arg('registerInput') registerInput: RegisterInput): Promise<UserMutationResponse> {
    const handler = async () => {
      const { email, username, password } = registerInput;

      const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

      if (existingUser)
        return {
          code: 400,
          success: false,
          message: 'Duplicate username or email',
          errors: [
            {
              field: existingUser.username === username ? 'username' : 'email',
              message: `${existingUser.username === username ? 'Username' : 'Email'} already taken`,
            },
          ],
        };

      const newUser = await UserModel.create({
        username,
        email,
        password: hashPassword(password),
      });

      return {
        code: 200,
        success: true,
        message: 'User registration successful',
        user: newUser,
      };
    };

    return respond(handler);
  }
}
