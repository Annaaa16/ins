import { Field, ObjectType } from 'type-graphql';

// types
import QueryResponse from './QueryResponse';

@ObjectType()
export class PaginatedResponse extends QueryResponse {
  @Field((_type) => String, { nullable: true })
  cursor?: string | null;

  @Field((_type) => Boolean, { nullable: true })
  hasMore?: boolean;
}
