import { Arg, ClassType, Mutation, Resolver } from 'type-graphql';
import { nanoid } from 'nanoid';

// types
import { ForgotPasswordMutationResponse } from '~/types/responses';

// models
import User from '~/db/models/User';
import Token from '~/db/models/Token';

import respond from '~/helpers/respond';
import hashData from '~/helpers/hashData';
import sendEmail from '~/helpers/sendEmail';

const forgotPassword = (Base: ClassType) => {
  @Resolver()
  class ForgotPassword extends Base {
    @Mutation((_returns) => ForgotPasswordMutationResponse)
    forgotPassword(
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
  }

  return ForgotPassword;
};

export default forgotPassword;