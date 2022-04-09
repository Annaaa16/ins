import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

// types
import type { Context } from '~/types/context';
import { RegisterInput, LoginInput } from '~/types/inputs';
import { UserMutationResponse, ForgotPasswordMutationResponse } from '~/types/responses';

// models
import User from '../models/User';
import Token from '../models/Token';

import { setTokens } from '~/helpers/token';
import { clearAllCookies } from '~/helpers/cookie';
import hashData from '~/helpers/hashData';
import respond from '~/helpers/respond';
import sendEmail from '~/helpers/sendEmail';

@Resolver()
export default class UserResolver {
  @Query((_returns) => UserMutationResponse)
  @Mutation((_returns) => UserMutationResponse)
  register(@Arg('registerInput') registerInput: RegisterInput): Promise<UserMutationResponse> {
    const handler = async () => {
      const { email, username, password } = registerInput;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

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

  @Mutation((_returns) => Boolean)
  logout(@Ctx() { res }: Context): Promise<boolean> {
    clearAllCookies(res);

    return Promise.resolve(true);
  }

  @Mutation((_returns) => ForgotPasswordMutationResponse)
  async forgotPassword(
    @Arg('usernameOrEmail') usernameOrEmail: string,
  ): Promise<ForgotPasswordMutationResponse> {
    const handler = async () => {
      const existingUser = await User.findOne({
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      });

      if (!existingUser)
        return {
          code: 404,
          success: false,
          message: 'User not found',
          errors: [{ field: 'usernameOrEmail', message: 'No users found' }],
        };

      await Token.deleteMany({ userId: existingUser._id });

      const resetToken = nanoid();
      const hashedResetToken = hashData(resetToken);

      await Token.create({
        userId: existingUser._id,
        token: hashedResetToken,
      });

      const linkReset = await sendEmail(existingUser.email, resetToken, existingUser._id);

      if (typeof linkReset !== 'string') throw new Error('Nodemailer got an error');

      return {
        code: 200,
        success: true,
        linkReset,
      };
    };

    return respond(handler);
  }

  @Mutation((_returns) => UserMutationResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('userId') userId: string,
    @Arg('newPassword') newPassword: string,
  ): Promise<UserMutationResponse> {
    const handler = async () => {
      const tokenRecord = await Token.findOne({ userId });

      if (!tokenRecord)
        return {
          code: 400,
          success: false,
          message: 'Invalid or expired reset token',
          errors: [
            {
              field: 'token',
              message: 'Invalid or expired reset token',
            },
          ],
        };

      const tokenCorrect = bcrypt.compare(token, tokenRecord.token);

      if (!tokenCorrect)
        return {
          code: 400,
          success: false,
          message: 'Invalid token',
          errors: [
            {
              field: 'token',
              message: 'Invalid token',
            },
          ],
        };

      const existingUser = await User.findOne({ userId }).lean();

      if (!existingUser)
        return {
          code: 404,
          success: false,
          message: 'User no longer exists',
          errors: [{ field: 'token', message: 'User no longer exists' }],
        };

      await User.updateOne({ _id: userId }, { password: hashData(newPassword) });

      await tokenRecord.delete();

      return {
        code: 200,
        success: true,
        message: 'User password reset successfully',
        user: existingUser,
      };
    };

    return respond(handler);
  }
}
