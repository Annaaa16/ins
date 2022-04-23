import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '../shared';

import { Comment } from '~/db/entities';

@ObjectType()
export class CommentMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  comment?: Comment;
}
