import { Field, ObjectType } from 'type-graphql';

// types
import QueryResponse from '../shared/QueryResponse';

import { Comment } from '~/db/entities';

@ObjectType()
export class PaginatedCommentsResponse extends QueryResponse {
  @Field((_type) => [Comment], { nullable: true })
  comments?: Comment[];

  @Field((_type) => String, { nullable: true })
  cursor?: string | null;

  @Field((_type) => Boolean, { nullable: true })
  hasMore?: boolean;
}
