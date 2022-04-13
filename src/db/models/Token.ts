import { getModelForClass } from '@typegoose/typegoose';

import { Token as TokenEntity } from '../entities';

export const Token = getModelForClass(TokenEntity);
