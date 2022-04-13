import { getModelForClass } from '@typegoose/typegoose';

import { User as UserEntity } from '../entities';

export const User = getModelForClass(UserEntity);
