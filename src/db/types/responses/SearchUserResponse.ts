import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '../shared';

import { User } from '~/db/entities';

@ObjectType()
export class SearchUserResponse extends MutationResponse {
  @Field((_type) => [User], { nullable: true })
  users?: User[];
}
