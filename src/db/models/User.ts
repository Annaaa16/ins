import { getModelForClass } from '@typegoose/typegoose';

import { default as UserEntity } from '../entities/User';

const User = getModelForClass(UserEntity);

export default User;
