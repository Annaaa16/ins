import { Field, ObjectType } from 'type-graphql';

// types
import QueryResponse from '../shared/QueryResponse';

import { Post } from '~/db/entities';

@ObjectType()
export class PaginatedPostsResponse extends QueryResponse {
  @Field((_type) => [Post], { nullable: true })
  posts?: Post[];

  @Field((_type) => String, { nullable: true })
  cursor?: string | null;

  @Field((_type) => Boolean, { nullable: true })
  hasMore?: boolean;
}
