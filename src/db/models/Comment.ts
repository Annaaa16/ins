import { getModelForClass } from '@typegoose/typegoose';

import { Comment as CommentEntity } from '../entities';

export const Comment = getModelForClass(CommentEntity);
