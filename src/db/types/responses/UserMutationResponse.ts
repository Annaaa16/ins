import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '../shared';

import { User } from '~/db/entities/User';

@ObjectType()
export class UserMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  user?: User;
}
