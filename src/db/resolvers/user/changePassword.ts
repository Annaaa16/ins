import { Arg, ClassType, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';

// types
import { UserMutationResponse } from '~/types/responses';

// models
import { User, Token } from '~/db/models';

import respond from '~/helpers/respond';
import hashData from '~/helpers/hashData';

const changePassword = (Base: ClassType) => {
  @Resolver()
  class ChangePassword extends Base {
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

  return ChangePassword;
};

export default changePassword;
