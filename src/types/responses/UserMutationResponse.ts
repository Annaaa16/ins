import { Field, ObjectType } from 'type-graphql';

// types
import MutationResponse from '../shared/MutationResponse';

import User from '~/db/entities/User';

@ObjectType()
export default class UserMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  user?: User;
}
