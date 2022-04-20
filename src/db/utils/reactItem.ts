import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';

// types
import { ReactionType } from '../types/utils';

interface ReactItemParams<T extends AnyParamConstructor<any>> {
  model: ReturnModelType<T, BeAnObject>;
  reaction: ReactionType;
  itemId: string;
  userId: string;
  modelName: string;
}

export const reactItem = async <T extends AnyParamConstructor<any>>({
  model: Model,
  reaction,
  itemId,
  userId,
  modelName,
}: ReactItemParams<T>) => {
  const reactionItem = await Model.findById(itemId);

  if (!reactionItem)
    return {
      code: 404,
      success: false,
      message: `${modelName} not found`,
    };

  const isLiked = reactionItem.reactions.includes(userId);

  if (reaction === ReactionType.LIKE) {
    if (isLiked)
      return {
        code: 400,
        success: false,
        message: `${modelName} already liked`,
      };

    await Model.updateOne({ _id: itemId }, { $push: { reactions: userId } });

    return {
      code: 200,
      success: true,
      message: `${modelName} is liked`,
    };
  }

  if (!isLiked)
    return {
      code: 400,
      success: false,
      message: `${modelName} already unliked`,
    };

  await Model.updateOne({ _id: itemId }, { $pull: { reactions: userId } });

  return {
    code: 200,
    success: true,
    message: `${modelName} is unliked`,
  };
};
