import { getModelForClass } from '@typegoose/typegoose';

import { Post as PostEntity } from '../entities';

export const Post = getModelForClass(PostEntity);
