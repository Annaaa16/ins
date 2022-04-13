import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '../shared';

import { Post } from '~/db/entities/Post';

@ObjectType()
export class PostMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  post?: Post;
}
